import { faBars, faHome, faList, faPlay, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() sidebarToggle: EventEmitter<boolean> = new EventEmitter();
  @Input() sidebarOpen: boolean;

  faBars = faBars;
  faHome = faHome;
  faPlay = faPlay;
  faLobby = faList;
  faProfile = faPortrait;

  navItems = [{
    text: 'home',
    page: 'home',
    icon: this.faHome
  },
  {
    text: 'lobby',
    page: 'lobby',
    icon: this.faLobby
  },
  {
    text: 'play',
    page: 'play',
    icon: this.faPlay
  },
  {
    text: 'profile',
    page: 'profile',
    icon: this.faProfile
  }];



  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public navigate(page: string) {
    this.router.navigate([`/${page}`]);
  }

  public toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarToggle.emit(this.sidebarOpen);
  }

}
