import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
//import '@popperjs/core';
//import 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthService: UserAuthService ,
    private router: Router) { }

    ngOnInit(): void {

      

    }


    selectedLanguage: string = this.getLanguage(); // Default language

    // Method to change the language
    switchLanguage(language: string): void {
      this.selectedLanguage = language;
      this.setLanguage(language);
    }

  public logout() {
    //this.usrNm = "";
    this.userAuthService.clear();
    this.userAuthService.setLanguage('en');
    this.selectedLanguage = 'en';
    this.router.navigate(['/home']);
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public getUserName() {
    return this.userAuthService.getUserName();
  }


  public getLanguage(){
    if(this.userAuthService.getLanguage()){
      return this.userAuthService.getLanguage();
    }else{
      return this.selectedLanguage = 'ja'
    }
  }

  public setLanguage(language: string){
     this.userAuthService.setLanguage(language);
  }

  getRole(){
    return this.userAuthService.getRole();
  }



}
