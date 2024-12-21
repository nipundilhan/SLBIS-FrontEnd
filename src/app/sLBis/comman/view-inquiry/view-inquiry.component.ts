import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-view-inquiry',
  templateUrl: './view-inquiry.component.html',
  styleUrls: ['./view-inquiry.component.css']
})
export class ViewInquiryComponent implements OnInit {

  inquiryDetails: any;
  filePreviews: SafeUrl[] = [];
  htmlContent: string = '';

  constructor(
    private route: ActivatedRoute,
    public apiCallService: ApiCallService ,
    private userAuthService: UserAuthService ,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    const inquiryId = this.route.snapshot.paramMap.get('id');

    if (this.userAuthService.getRole() !== "ROOTADMIN" && this.userAuthService.getRole() !== "COMPANYADMIN") {
      alert("Access denied");
      this.router.navigate(['/home']);
    }

    
    // if (inquiryId) {
    //   this.getInquiryDetails(inquiryId).subscribe((data) => {
    //     this.inquiryDetails = data;
       
    //   });
    // }


            this.apiCallService.executeGetNoAuth(API_ENDPOINTS.INQUIRY.GET_BY_ID+inquiryId).subscribe(
              (response: any) => {
        
                this.inquiryDetails = response;
                if (this.inquiryDetails.messages && this.inquiryDetails.messages.length > 0) {
                  this.htmlContent = this.inquiryDetails.messages[0].message;
                }

                /*
                const attachments = this.inquiryDetails.attachments;

                attachments.forEach((attachment: any) => {
                  // Convert the base64 string back to a Blob and create a File object
                  const byteString = atob(attachment.data);
                  const arrayBuffer = new ArrayBuffer(byteString.length);
                  const uint8Array = new Uint8Array(arrayBuffer);
                  for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i);
                  }
                  
                  const blob = new Blob([uint8Array], { type: attachment.contentType });
                  const file = new File([blob], attachment.filename, { type: attachment.contentType });
        
                  // Push the file to uploadedFiles array
                  this.uploadedFiles.push(file);
        
                  // Create a preview URL for each file and store it in the filePreviews array
                  const filePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
                  this.filePreviews.push(filePreview);
                });
                
                // Trigger change detection after setting the files and previews
                this.cdr.detectChanges();
                */
        
              },
              (httpError: any) => {
                console.log(httpError);
                alert("error occured during creating inquiry")
                
              }   
            );
    alert(this.inquiryDetails.title);
    console.log('Inquiry details:', this.inquiryDetails);
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

}
