/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { MoveCollectionDto } from '../models/move-collection-dto';
import { MoveDto } from '../models/move-dto';


/**
 * legal moves
 */
@Injectable({
  providedIn: 'root',
})
export class MoveService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getLegalMovesFromBoardId
   */
  static readonly GetLegalMovesFromBoardIdPath = '/moves/{boardId}';

  /**
   * get list of legal moves from boardId.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLegalMovesFromBoardId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLegalMovesFromBoardId$Response(params: {

    /**
     * id of board to get
     */
    boardId: number;

  }): Observable<StrictHttpResponse<MoveCollectionDto>> {

    const rb = new RequestBuilder(this.rootUrl, MoveService.GetLegalMovesFromBoardIdPath, 'get');
    if (params) {

      rb.path('boardId', params.boardId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MoveCollectionDto>;
      })
    );
  }

  /**
   * get list of legal moves from boardId.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLegalMovesFromBoardId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLegalMovesFromBoardId(params: {

    /**
     * id of board to get
     */
    boardId: number;

  }): Observable<MoveCollectionDto> {

    return this.getLegalMovesFromBoardId$Response(params).pipe(
      map((r: StrictHttpResponse<MoveCollectionDto>) => r.body as MoveCollectionDto)
    );
  }

  /**
   * Path part for operation makeMove
   */
  static readonly MakeMovePath = '/moves/{boardId}';

  /**
   * makes move on board.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `makeMove()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  makeMove$Response(params: {

    /**
     * id of the board
     */
    boardId: number;
  
    /**
     * list of pieces and positions / castling information
     */
    body: MoveDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, MoveService.MakeMovePath, 'post');
    if (params) {

      rb.path('boardId', params.boardId, {});

      rb.body(params.body, 'application/json');
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
   * makes move on board.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `makeMove$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  makeMove(params: {

    /**
     * id of the board
     */
    boardId: number;
  
    /**
     * list of pieces and positions / castling information
     */
    body: MoveDto
  }): Observable<string> {

    return this.makeMove$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
