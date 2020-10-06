/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BoardId } from '../models/board-id';
import { BoardStateDto } from '../models/board-state-dto';
import { GameType } from '../models/game-type';


/**
 * state of boards in session
 */
@Injectable({
  providedIn: 'root',
})
export class BoardService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createBoardFromType
   */
  static readonly CreateBoardFromTypePath = '/board/create';

  /**
   * create a board.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBoardFromType()` instead.
   *
   * This method doesn't expect any request body.
   */
  createBoardFromType$Response(params: {
    gameType: GameType;

  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BoardService.CreateBoardFromTypePath, 'post');
    if (params) {

      rb.query('gameType', params.gameType, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * create a board.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createBoardFromType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createBoardFromType(params: {
    gameType: GameType;

  }): Observable<string> {

    return this.createBoardFromType$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getBoard
   */
  static readonly GetBoardPath = '/board/{boardId}';

  /**
   * get board state.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBoard()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBoard$Response(params: {

    /**
     * id of the board to get
     */
    boardId: number;

  }): Observable<StrictHttpResponse<BoardStateDto>> {

    const rb = new RequestBuilder(this.rootUrl, BoardService.GetBoardPath, 'get');
    if (params) {

      rb.path('boardId', params.boardId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BoardStateDto>;
      })
    );
  }

  /**
   * get board state.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBoard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBoard(params: {

    /**
     * id of the board to get
     */
    boardId: number;

  }): Observable<BoardStateDto> {

    return this.getBoard$Response(params).pipe(
      map((r: StrictHttpResponse<BoardStateDto>) => r.body as BoardStateDto)
    );
  }

  /**
   * Path part for operation deleteBoard
   */
  static readonly DeleteBoardPath = '/board/{boardId}';

  /**
   * delete a board.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBoard()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBoard$Response(params: {

    /**
     * id of the board to delete
     */
    boardId: number;

  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BoardService.DeleteBoardPath, 'delete');
    if (params) {

      rb.path('boardId', params.boardId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * delete a board.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteBoard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBoard(params: {

    /**
     * id of the board to delete
     */
    boardId: number;

  }): Observable<string> {

    return this.deleteBoard$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getAllBoardIds
   */
  static readonly GetAllBoardIdsPath = '/board/allIds';

  /**
   * get all board ids.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBoardIds()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBoardIds$Response(params?: {

  }): Observable<StrictHttpResponse<Array<BoardId>>> {

    const rb = new RequestBuilder(this.rootUrl, BoardService.GetAllBoardIdsPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BoardId>>;
      })
    );
  }

  /**
   * get all board ids.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllBoardIds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBoardIds(params?: {

  }): Observable<Array<BoardId>> {

    return this.getAllBoardIds$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BoardId>>) => r.body as Array<BoardId>)
    );
  }

}
