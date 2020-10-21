/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { MessageDto } from '../models/message-dto';


/**
 * basic health status info
 */
@Injectable({
  providedIn: 'root',
})
export class HealthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation amIAlive
   */
  static readonly AmIAlivePath = '/health/up';

  /**
   * is this application live.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `amIAlive()` instead.
   *
   * This method doesn't expect any request body.
   */
  amIAlive$Response(params?: {

  }): Observable<StrictHttpResponse<MessageDto>> {

    const rb = new RequestBuilder(this.rootUrl, HealthService.AmIAlivePath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MessageDto>;
      })
    );
  }

  /**
   * is this application live.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `amIAlive$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  amIAlive(params?: {

  }): Observable<MessageDto> {

    return this.amIAlive$Response(params).pipe(
      map((r: StrictHttpResponse<MessageDto>) => r.body as MessageDto)
    );
  }

}
