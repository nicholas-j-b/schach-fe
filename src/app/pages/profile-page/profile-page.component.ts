import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private readonly authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.authenticationService.logout();
  }

}
