import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squareIndicies = new Array(64);

  constructor() { }

  ngOnInit(): void {

  }

  public isBlackSquare(n: number): boolean {
    return (n + 1) % 2 === Math.floor(n / 8) % 2;
  }

}
