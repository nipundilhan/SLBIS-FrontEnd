import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {

  inquiries: any[] = []; // Using any[] for the inquiries array
  pagedInquiries: any[] = []; // The current page inquiries to display
  currentPage: number = 1;
  pageSize: number = 6; // 6 items per page (3 cards per row, 2 rows)

  totalPages: number = 0;

  constructor( public apiCallService: ApiCallService  ) { }

  ngOnInit(): void {
    // Simulating fetching inquiries from an API
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.INQUIRY.PRODUCTS).subscribe(
      (response: any) => {

        this.inquiries = response;
        
    // Calculate total pages based on inquiries length and page size
        this.totalPages = Math.ceil(this.inquiries.length / this.pageSize);
        this.updatePagedInquiries(); 


      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during creating inquiry")

      }
    );

// Update paged inquiries when data is loaded
  }

  updatePagedInquiries(): void {
    // Calculate the slice of inquiries to display based on the current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedInquiries = this.inquiries.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    // Ensure the page number is within valid bounds
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updatePagedInquiries();
  }
}


