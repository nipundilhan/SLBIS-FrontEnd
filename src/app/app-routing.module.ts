import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './global_comman/home/home.component';
import { LoginComponent } from './global_comman/login/login.component';
import { TestComponent } from './global_comman/test/test.component';
import { SignupComponent } from './global_comman/signup/signup.component';
import { SelectavatarComponent } from './global_comman/selectavatar/selectavatar.component';
import { TutorialSubmissionComponent } from './module1_exam_prep/game1_tutorials/tutorial-submission/tutorial-submission.component';
import { ViewTutorialsComponent } from './module1_exam_prep/game1_tutorials/view-tutorials/view-tutorials.component';
import { AboutComponent } from './global_comman/about/about.component';
import { InquiryCreateComponent } from './sLBis/comman/inquiry-create/inquiry-create.component';
import { InquiriesViewComponent } from './sLBis/comman/inquiries-view/inquiries-view.component';
import { ViewInquiryComponent } from './sLBis/comman/view-inquiry/view-inquiry.component';
import { CustomerInquiryComponent } from './sLBis/customer/customer-inquiry/customer-inquiry.component';
import { CompanyComponent } from './sLBis/admin/company/company.component';
import { CompanyUsersComponent } from './sLBis/admin/company-users/company-users.component';
import { ManageInquiryComponent } from './sLBis/comman/manage-inquiry/manage-inquiry.component';
import { ProductsViewComponent } from './sLBis/comman/products-view/products-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'select-avatar', component: SelectavatarComponent },
  { path: 'tutorial-submission', component: TutorialSubmissionComponent },
  { path: 'view-tutorials', component: ViewTutorialsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view-inquiry/:id', component: ViewInquiryComponent },
  { path: 'view-inquiries', component: InquiriesViewComponent },
  { path: 'customer-inquiry', component: CustomerInquiryComponent },
  { path: 'create-inquiry', component: InquiryCreateComponent },
  { path: 'manage-inquiry/:id', component: ManageInquiryComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'products', component: ProductsViewComponent },
  { path: 'users', component: CompanyUsersComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
