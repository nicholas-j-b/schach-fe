import { ConnectionService } from './../../service/api/connection.service';
import { NavigationService } from './../../service/navigation/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public dont = true;

  constructor(
    public readonly navigationService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  onClickDont(): void {
    this.dont = !this.dont;
  }


}
