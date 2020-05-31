import { GameService } from './../../../service/game.service';
import { LobbyService } from './../../../service/api/lobby.service';
import { NavigationService } from './../../../service/navigation/navigation.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInfoDto } from 'src/app/model/api/game-info-dto';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss']
})
export class LobbyPageComponent implements OnInit {
  public games: Observable<GameInfoDto[]>;

  constructor(
    private readonly navigationService: NavigationService,
    public readonly lobbyService: LobbyService,
    private readonly gameService: GameService
  ) {
    this.games = lobbyService.$activeGames;
  }

  ngOnInit(): void {
    this.lobbyService.getActiveGames();
  }

  public createGame() {
    this.gameService.createGame().subscribe((gameId: string) => {
      this.navigationService.goToGame(gameId);
    });
  }

  public joinGame(gameId: string) {
    this.gameService.joinGame(gameId);
    this.navigationService.goToGame(gameId);
  }

}
