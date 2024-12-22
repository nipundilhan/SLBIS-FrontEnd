import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {


  companies: any[] = [];
  paginatedCompanies: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 4;
  totalPages: number = 0;
  paginationArray: number[] = [];

  // Search parameters
  searchParams = {
    name: '',
    email: '',
  };

  constructor(       private router: Router, private userAuthService: UserAuthService ) {}

  ngOnInit(): void {

    if (this.userAuthService.getRole() !== "ROOTADMIN" && this.userAuthService.getRole() !== "COMPANYADMIN") {
      alert("Access denied");
      this.router.navigate(['/home']);
    }

    this.loadDummyData();
    this.updatePaginatedCompanies();
    this.generatePaginationArray();
  }

  // Load dummy data
  loadDummyData(): void {
    this.companies = [
      { name: 'Company A', code: 'A001', address: '123 A St', email: 'companya@example.com' },
      { name: 'Company B', code: 'B002', address: '456 B St', email: 'companyb@example.com' },
      { name: 'Company C', code: 'C003', address: '789 C St', email: 'companyc@example.com' },
      { name: 'Company D', code: 'D004', address: '101 D St', email: 'companyd@example.com' },
      { name: 'Company E', code: 'E005', address: '202 E St', email: 'companye@example.com' },
      { name: 'Company F', code: 'F006', address: '303 F St', email: 'companyf@example.com' },
    ];

    this.totalPages = Math.ceil(this.companies.length / this.recordsPerPage);
  }

  updatePaginatedCompanies(): void {
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    this.paginatedCompanies = this.companies.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedCompanies();
  }

  generatePaginationArray(): void {
    this.paginationArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  search(): void {
    const { name, email } = this.searchParams;

    this.companies = this.companies.filter(
      (company) =>
        (name ? company.name.toLowerCase().includes(name.toLowerCase()) : true) &&
        (email ? company.email.toLowerCase().includes(email.toLowerCase()) : true)
    );

    this.totalPages = Math.ceil(this.companies.length / this.recordsPerPage);
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedCompanies();
    this.generatePaginationArray();
  }

  reset(): void {
    this.searchParams = { name: '', email: '' };
    this.loadDummyData();
    this.updatePaginatedCompanies();
    this.generatePaginationArray();
  }

  addCompany(): void {
    alert('Add Company Clicked');
  }

  viewCompany(company: any): void {
    alert(`Viewing company: ${company.name}`);
  }

  editCompany(company: any): void {
    alert(`Editing company: ${company.name}`);
  }




}

