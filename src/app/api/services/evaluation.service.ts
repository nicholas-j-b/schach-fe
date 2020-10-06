/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BoardEvaluationDto } from '../models/board-evaluation-dto';
import { BoardStateDto } from '../models/board-state-dto';


/**
 * value of board state
 */
@Injectable({
  providedIn: 'root',
})
export class EvaluationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getBoardEvaluation
   */
  static readonly GetBoardEvaluationPath = '/evaluate';

  /**
   * get an evaluation of the board.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBoardEvaluation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getBoardEvaluation$Response(params: {
  
    /**
     * list of pieces and positions / castling information
     */
    body: BoardStateDto
  }): Observable<StrictHttpResponse<BoardEvaluationDto>> {

    const rb = new RequestBuilder(this.rootUrl, EvaluationService.GetBoardEvaluationPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BoardEvaluationDto>;
      })
    );
  }

  /**
   * get an evaluation of the board.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBoardEvaluation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getBoardEvaluation(params: {
  
    /**
     * list of pieces and positions / castling information
     */
    body: BoardStateDto
  }): Observable<BoardEvaluationDto> {

    return this.getBoardEvaluation$Response(params).pipe(
      map((r: StrictHttpResponse<BoardEvaluationDto>) => r.body as BoardEvaluationDto)
    );
  }

}
