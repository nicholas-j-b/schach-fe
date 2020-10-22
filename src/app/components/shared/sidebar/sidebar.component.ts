import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  navItems = [{
    text: 'home',
    page: 'home'
  },
  {
    text: 'lobby',
    page: 'lobby'
  },
  {
    text: 'play',
    page: 'play'
  },
  {
    text: 'profile',
    page: 'profile'
  }];

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public navigate(page: string) {
    console.log(page);
    this.router.navigate([`/${page}`]);
  }

}
