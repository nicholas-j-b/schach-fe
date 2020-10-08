import { HealthService } from './../../api/services/health.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { UserService } from './../../api/services/user.service';
import { BoardService } from './../../api/services/board.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly healthService: HealthService
  ) { }

  ngOnInit(): void {
    this.authenticationService.login('user1', 'user1');
  }

}
