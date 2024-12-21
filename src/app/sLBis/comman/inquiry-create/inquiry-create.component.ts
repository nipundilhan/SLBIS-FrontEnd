import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-inquiry-create',
  templateUrl: './inquiry-create.component.html',
  styleUrls: ['./inquiry-create.component.css']
})
export class InquiryCreateComponent implements OnInit {
  inquiryForm: FormGroup;
  uploadedFiles: File[] = [];
  filePreviews: SafeUrl[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private userAuthService: UserAuthService,
    public apiCallService: ApiCallService,
    private router: Router
  ) {
    this.inquiryForm = this.fb.group({
      title: ['', Validators.required],
      companyCode: ['', Validators.required],
      description: ['', Validators.required],
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void { }

  onFileChange(event: any): void {
    const files = event.target.files;
    const maxFileSize = 1 * 1024 * 1024; // 2 MB
    const allowedFileTypes = ['image/jpeg', 'application/pdf'];
    const maxFilesAllowed = 4; // Maximum allowed files

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > maxFileSize) {
        alert(`File ${file.name} exceeds the maximum size of 2 MB.`);
        continue;
      }

      if (this.uploadedFiles.length >= maxFilesAllowed) {
        alert(`You can only upload a maximum of ${maxFilesAllowed} files.`);
        break; // Stop processing further files
      }

      if (!allowedFileTypes.includes(file.type)) {
        alert(`File type of ${file.name} is not allowed. Only JPG and PDF are allowed.`);
        continue;
      }

      this.uploadedFiles.push(file);
      this.filePreviews.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)));
    }

    this.cdr.detectChanges();
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  removeFile(file: File): void {
    const index = this.uploadedFiles.indexOf(file);
    if (index >= 0) {
      this.uploadedFiles.splice(index, 1);
      this.filePreviews.splice(index, 1);
      this.cdr.detectChanges();
    }
  }

  submit(): void {
    if (this.inquiryForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.inquiryForm.get('title')!.value);
    formData.append('companyCode', this.inquiryForm.get('companyCode')!.value);
    formData.append('description', this.inquiryForm.get('description')!.value);
    formData.append('customerName', this.inquiryForm.get('customerName')!.value);
    formData.append('email', this.inquiryForm.get('email')!.value);
    formData.append('contactNo', this.inquiryForm.get('contactNo')!.value);

    this.uploadedFiles.forEach(file => {
      formData.append('attachments', file);
    });



    this.apiCallService.executePostNoAuth(API_ENDPOINTS.INQUIRY.BASE, formData).subscribe(
      (response: any) => {

        this.inquiryForm.reset();
        this.uploadedFiles = [];
        this.filePreviews = [];
        this.cdr.detectChanges();

        alert("successfully added inquiry");
        this.router.navigate(['/customer-inquiry']);


      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during creating inquiry")

      }
    );
  }

}
