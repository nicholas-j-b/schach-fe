import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyInfoComponent } from './lobby-info.component';

describe('LobbyInfoComponent', () => {
  let component: LobbyInfoComponent;
  let fixture: ComponentFixture<LobbyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
