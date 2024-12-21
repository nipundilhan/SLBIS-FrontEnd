import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-customer-inquiry',
  templateUrl: './customer-inquiry.component.html',
  styleUrls: ['./customer-inquiry.component.css']
})
export class CustomerInquiryComponent implements OnInit {

  inquiries: any[] = [];
  paginatedInquiries: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 2;
  totalPages: number = 0;
  paginationArray: number[] = [];

  constructor(private router: Router ,     public apiCallService: ApiCallService ,) { }

  ngOnInit(): void {
  }

  searchParams = {
    email: ''
  };

  // Method to handle the Add Inquiry button click
  addInquiry(): void {
    this.router.navigate(['/create-inquiry']);
  }

  // Method to handle the search action
  search(): void {
    if (this.searchParams.email) {
      console.log('Searching for inquiries with email:', this.searchParams.email);
            this.apiCallService.executeGetNoAuth(API_ENDPOINTS.INQUIRY.GET_BY_EMAIL+this.searchParams.email).subscribe(
              (response: any) => {
        
                this.inquiries = response;
                this.totalPages = Math.ceil(this.inquiries.length / this.recordsPerPage);
                this.generatePaginationArray();
                this.updatePaginatedInquiries();
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
    } else {
      alert('Please enter an email address to search.');
    }
  }

  // Method to reset the search form
  reset(): void {
    this.searchParams.email = ''; // Reset the email field
    console.log('Search reset');
  }


  viewInquiry(id: string): void {
    this.router.navigate(['/view-inquiry', id]);
    // You can implement the logic to show detailed inquiry data, e.g., navigate to a details page or open a modal
  }

  updatePaginatedInquiries(): void {
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    this.paginatedInquiries = this.inquiries.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedInquiries();
  }

  generatePaginationArray(): void {
    this.paginationArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

}
