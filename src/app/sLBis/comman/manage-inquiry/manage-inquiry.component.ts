
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-manage-inquiry',
  templateUrl: './manage-inquiry.component.html',
  styleUrls: ['./manage-inquiry.component.css']
})
export class ManageInquiryComponent implements OnInit {

  inquiryDetails: any;
  inquiryId: any;
  filePreviews: SafeUrl[] = [];

  comment: string = ''; // Two-way binding for the form input
  
  editorContent: string = '';
  htmlContent: string = '';
  
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '100px',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['italic'],  // Hide italic button
      ['underline'] ,// Hide underline button
      ['insertImage', 'insertVideo']
    ]
  };

  constructor(
    private route: ActivatedRoute,
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService ,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) { }

  ngOnInit(): void {

    if (this.userAuthService.getRole() !== "ROOTADMIN" && this.userAuthService.getRole() !== "COMPANYADMIN") {
      alert("Access denied");
      this.router.navigate(['/home']);
    }

    // Get the 'id' parameter from the route
    this.inquiryId = this.route.snapshot.paramMap.get('id');
    this.getInquiry();


  }

  getInquiry(){
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.INQUIRY.GET_BY_ID + this.inquiryId).subscribe(
      (response: any) => {

        this.inquiryDetails = response;
        if (this.inquiryDetails.messages && this.inquiryDetails.messages.length > 0) {
          this.htmlContent = this.inquiryDetails.messages[0].message;
        }


      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during creating inquiry")

      }
    );
  }

  viewFile(attachment: any) {

    const byteString = atob(attachment.data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: attachment.contentType });
    const file = new File([blob], attachment.filename, { type: attachment.contentType });


    const fileUrl = URL.createObjectURL(file); // Create a blob URL for the file
    window.open(fileUrl, '_blank');  // Open the file in a new tab

  }


  submitComment() {
    //console.log(this.comment);

    let req = {
      inquiryId: this.inquiryId,
      comment: this.comment
    };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.INQUIRY.ADD_COMMENT ,req).subscribe(
      (response: any) => {
        this.getInquiry();
        alert("comment added successfully -  maximum 4 comments");
        

      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during adding comment");

      }
    );
  }


  submitMessage() {

    let req = {
      inquiryId: this.inquiryId,
      message: this.editorContent
    };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.INQUIRY.ADD_MESSAGE ,req).subscribe(
      (response: any) => {
        this.getInquiry();
        alert("message added successfully");
        

      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during adding message");

      }
    );
    
  }


  verify() {
    let req = {
      inquiryId: this.inquiryId,
      status: "VERIFIED"
    };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.INQUIRY.CHANGE_STATUS ,req).subscribe(
      (response: any) => {
        this.getInquiry();
        alert("verified successfully");
        this.router.navigate(['/view-inquiries']);
        

      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during verifying");

      }
    );
  }

  reject() {
    let req = {
      inquiryId: this.inquiryId,
      status: "REJECTED"
    };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.INQUIRY.CHANGE_STATUS ,req).subscribe(
      (response: any) => {
        this.getInquiry();
        alert("rejected successfully");
        this.router.navigate(['/view-inquiries']);
        

      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during verifying");

      }
    );
  }

  
  complete() {
    let req = {
      inquiryId: this.inquiryId,
      status: "COMPLETED"
    };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.INQUIRY.CHANGE_STATUS ,req).subscribe(
      (response: any) => {
        this.getInquiry();
        alert("completed successfully");
        this.router.navigate(['/view-inquiries']);
        

      },
      (httpError: any) => {
        console.log(httpError);
        
        alert("error occured during completing");

      }
    );
  }

  getRole(){
    return this.userAuthService.getRole();
  }

}
