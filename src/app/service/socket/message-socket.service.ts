import { Piece } from '../../model/game/piece';
import { PieceMessage } from '../../model/message/piece-message';
import { Colour } from './../../model/colour.enum';
import { InitialMessage } from './../../model/message/initial-message';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {
  ws;
  connectionId: string;
  connected = false;
  colour: string;

  private readonly _pieceMessage = new BehaviorSubject<Piece[]>([]);
  public $pieceMessage = this._pieceMessage.asObservable();

  initialise(initialMessage: InitialMessage) {
    this.setVals(initialMessage);
    this.connect(this);
  }

  private setVals(vals: InitialMessage) {
    this.connectionId = vals.connectionId;
    this.colour = Colour[vals.colour];
    const socket = new WebSocket('ws://localhost:9901/api/movement');
    this.ws = Stomp.over(socket);
  }

  private connect(that: this) {
    this.ws.connect({}, () => {
      that.connected = true;
      that.ws.subscribe(`/down/${that.connectionId}/pieces`, (msg) => {
        const pieceMessage = JSON.parse(msg.body) as PieceMessage;
        this._pieceMessage.next(pieceMessage.pieces);
        console.log('------pieceMessage-----');
        console.log(pieceMessage);
      });
      that.ws.subscribe(`/down/${that.connectionId}/legalMoves`, (msg) => {
        //const pieceMessage = JSON.parse(msg.body) as PieceMessage;
        //this._pieceMessage.next(pieceMessage);
        console.log('------legalMoves-----');
        console.log(msg);
      });
      that.sendMove('this is the init string');
    }, (error) => {
      console.log(error);
    });
  }

  public disconnect() {
    if (this.ws) {
      this.ws.disconnect();
    }
  }

  public sendMove(move) {
    const msg = JSON.stringify(move);
    this.sendMessage(msg, 'movement');
  }

  private sendMessage(msg: string, address?: string) {
    if (this.connected) {
      let path = `/up/${this.connectionId}`;
      if (address) {
        path += `/${address}`;
      }
      console.log(`path: ${path}`);
      this.ws.send(path, {}, msg);
    }
  }

  debug() {
    console.log(this.ws);
  }
}
