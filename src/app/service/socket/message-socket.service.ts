import { PieceMessage } from '../../model/message/piece-message';
import { Colour } from './../../model/colour.enum';
import { InitialMessage } from './../../model/message/initial-message';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {
  ws;
  connectionId: string;
  connected = false;
  colour: string;

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
      that.ws.subscribe(`/down/${that.connectionId}`, (msg) => {
        console.log(msg);
      });
      that.ws.subscribe(`/down/${that.connectionId}/initial`, (msg) => {
        const pieceMessages = JSON.parse(msg.body) as PieceMessage;
        console.log(pieceMessages);
      });
      that.sendMessage('request initial', 'initial');
    }, (error) => {
      console.log(error);
    });
  }

  public disconnect() {
    if (this.ws) {
      this.ws.disconnect();
    }
  }

  public sendMessage(msg: string, address?: string) {
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
