import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-inquiries-view',
  templateUrl: './inquiries-view.component.html',
  styleUrls: ['./inquiries-view.component.css']
})
export class InquiriesViewComponent implements OnInit {
  inquiries: any[] = [];
  paginatedInquiries: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 4;
  totalPages: number = 0;
  paginationArray: number[] = [];

  // Search parameters
  searchParams = {
    companyCode: '',
    status: ''
  };

  constructor(private http: HttpClient, private router: Router, public apiCallService: ApiCallService ,  private userAuthService: UserAuthService ) { }

  ngOnInit(): void {
    this.fetchInquiries();
  }

  fetchInquiries(): void {


    let url = API_ENDPOINTS.INQUIRY.BASE;

    if(this.getRole() === "COMPANYADMIN"){

      this.searchParams.status = "VERIFIED";
      this.searchParams.companyCode = this.getCompanyCode();
      url = API_ENDPOINTS.INQUIRY.BASE + "/findByCompanyAndStatus/"+this.getCompanyCode()+"/"+this.searchParams.status;
    }else{
      url = API_ENDPOINTS.INQUIRY.BASE;
    }

    



    this.apiCallService.executeGetNoAuth(url).subscribe(
      (response: any) => {

        this.inquiries = response;
        this.totalPages = Math.ceil(this.inquiries.length / this.recordsPerPage);
        this.generatePaginationArray();
        this.updatePaginatedInquiries();


      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during creating inquiry")

      }
    );
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

  // Search function to filter the inquiries
  search(): void {
    this.currentPage = 1;  // Reset to the first page when performing a search

    const { companyCode, status } = this.searchParams;

    // Correct string interpolation for URL construction


    let url = API_ENDPOINTS.INQUIRY.BASE + `/findByCompanyAndStatus/${companyCode || ''}/${status || ''}`;



    this.apiCallService.executeGetNoAuth(url).subscribe(
      (response: any) => {

        this.inquiries = response;
        this.totalPages = Math.ceil(this.inquiries.length / this.recordsPerPage);
        this.generatePaginationArray();
        this.updatePaginatedInquiries();


      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during creating inquiry")

      }
    );

  }

  // Reset function to fetch all inquiries without filters
  reset(): void {
    this.searchParams = { companyCode: '', status: '' }; // Reset search parameters
    this.fetchInquiries();
  }


  viewInquiry(id: string): void {
    this.router.navigate(['/view-inquiry', id]);
    // You can implement the logic to show detailed inquiry data, e.g., navigate to a details page or open a modal
  }

  mangeInquiry(id: string): void {
    this.router.navigate(['/manage-inquiry', id]);
    // You can implement the logic to show detailed inquiry data, e.g., navigate to a details page or open a modal
  }

  // Delete inquiry method
  deleteInquiry(id: string): void {
    this.apiCallService.executeDeleteNoAuth(API_ENDPOINTS.INQUIRY.BASE + "/"+id).subscribe(
      (response: any) => {

          alert("successfully deleted inquiry");
          this.fetchInquiries();


      },
      (httpError: any) => {
        console.log(httpError);
        alert("error occured during creating inquiry")

      }
    );
  }


  getRole(){
    return this.userAuthService.getRole();
  }

  getCompanyCode(){
    return this.userAuthService.getCompanyCode();
  }






}
