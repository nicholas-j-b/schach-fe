import { GameInfoDto } from './../../../api/models/game-info-dto';
import { GameService } from './../../../api/services/game.service';
import { LobbyService } from './../../../api/services/lobby.service';
import { GameType } from './../../../api/models/game-type';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby-info',
  templateUrl: './lobby-info.component.html',
  styleUrls: ['./lobby-info.component.scss']
})
export class LobbyInfoComponent implements OnInit {
  @Input() gameType: GameType;

  currentGames = 0;
  currentPlayers = 0;

  gameInfoDtos: GameInfoDto[];

  constructor(
    private readonly lobbyService: LobbyService
  ) {
    this.lobbyService = lobbyService;
  }

  ngOnInit(): void {
    this.lobbyService.getAllGamesInLobby({gameType: this.gameType}).subscribe(res => {
      this.gameInfoDtos = res as GameInfoDto[];
      this.countGames();
      this.countPlayers();
    });
  }

  public countGames() {
    this.currentGames = this.gameInfoDtos.length;
  }

  public countPlayers() {
    let count = 0;
    this.gameInfoDtos.forEach(gameInfoDto => {
      count += gameInfoDto.participants.length;
    });
    this.currentPlayers = count;
  }


}
