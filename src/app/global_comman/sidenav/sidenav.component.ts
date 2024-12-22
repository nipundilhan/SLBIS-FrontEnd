import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private userAuthService: UserAuthService,
        private router: Router ) { }

  ngOnInit(): void {



  }

  public getLanguage(){
    return this.userAuthService.getLanguage();
  }

  getRole(){
    return this.userAuthService.getRole();
  }

  public logout() {
    //this.usrNm = "";
    this.userAuthService.clear();
    this.userAuthService.setLanguage('en');
    this.router.navigate(['/home']);
  }


}
