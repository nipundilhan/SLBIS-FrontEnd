import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.css']
})
export class CompanyUsersComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 5;
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
    this.updatePaginatedUsers();
    this.generatePaginationArray();
  }

  // Load dummy data
  loadDummyData(): void {
    this.users = [
      { name: 'Alice', company: 'Company A', mobile: '123-456-7890', email: 'alice@example.com' },
      { name: 'Bob', company: 'Company B', mobile: '234-567-8901', email: 'bob@example.com' },
      { name: 'Charlie', company: 'Company C', mobile: '345-678-9012', email: 'charlie@example.com' },
      { name: 'David', company: 'Company D', mobile: '456-789-0123', email: 'david@example.com' },
      { name: 'Eve', company: 'Company E', mobile: '567-890-1234', email: 'eve@example.com' },
      { name: 'Frank', company: 'Company F', mobile: '678-901-2345', email: 'frank@example.com' },
      { name: 'Grace', company: 'Company G', mobile: '789-012-3456', email: 'grace@example.com' },
      { name: 'Hank', company: 'Company H', mobile: '890-123-4567', email: 'hank@example.com' },
      { name: 'Ivy', company: 'Company I', mobile: '901-234-5678', email: 'ivy@example.com' },
      { name: 'Jack', company: 'Company J', mobile: '012-345-6789', email: 'jack@example.com' },
      { name: 'Karen', company: 'Company K', mobile: '123-456-7899', email: 'karen@example.com' },
      { name: 'Liam', company: 'Company L', mobile: '234-567-8900', email: 'liam@example.com' },
    ];

    this.totalPages = Math.ceil(this.users.length / this.recordsPerPage);
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  generatePaginationArray(): void {
    this.paginationArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  search(): void {
    const { name, email } = this.searchParams;

    this.users = this.users.filter(
      (user) =>
        (name ? user.name.toLowerCase().includes(name.toLowerCase()) : true) &&
        (email ? user.email.toLowerCase().includes(email.toLowerCase()) : true)
    );

    this.totalPages = Math.ceil(this.users.length / this.recordsPerPage);
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedUsers();
    this.generatePaginationArray();
  }

  reset(): void {
    this.searchParams = { name: '', email: '' };
    this.loadDummyData();
    this.updatePaginatedUsers();
    this.generatePaginationArray();
  }

  addUser(): void {
    alert('Add User Clicked');
  }

  viewUser(user: any): void {
    alert(`Viewing user: ${user.name}`);
  }

  editUser(user: any): void {
    alert(`Editing user: ${user.name}`);
  }
}
