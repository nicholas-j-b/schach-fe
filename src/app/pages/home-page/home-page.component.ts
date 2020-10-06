import { BoardService } from './../../api/services/board.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private readonly boardService: BoardService
  ) { }

  ngOnInit(): void {
    const response = this.boardService.getAllBoardIds();
    response.subscribe(msg => {
      console.log(msg);
    });
  }

}
