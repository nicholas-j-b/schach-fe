/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { NewUserDto } from '../models/new-user-dto';
import { UserDto } from '../models/user-dto';
import { UserRole } from '../models/user-role';


/**
 * user management
 */
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation registerNewUser
   */
  static readonly RegisterNewUserPath = '/user/new/register';

  /**
   * register a new user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerNewUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerNewUser$Response(params?: {
  
    /**
     * new user information
     */
    body?: NewUserDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.RegisterNewUserPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * register a new user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registerNewUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerNewUser(params?: {
  
    /**
     * new user information
     */
    body?: NewUserDto
  }): Observable<boolean> {

    return this.registerNewUser$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation getUserExists
   */
  static readonly GetUserExistsPath = '/user/exists/{username}';

  /**
   * check if a user exists by username.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserExists()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserExists$Response(params: {

    /**
     * username to check
     */
    username: string;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetUserExistsPath, 'get');
    if (params) {

      rb.path('username', params.username, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * check if a user exists by username.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserExists$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserExists(params: {

    /**
     * username to check
     */
    username: string;

  }): Observable<boolean> {

    return this.getUserExists$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation getAllUsers
   */
  static readonly GetAllUsersPath = '/user/admin/getAllUsers';

  /**
   * get all users.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: {

  }): Observable<StrictHttpResponse<Array<UserDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.GetAllUsersPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserDto>>;
      })
    );
  }

  /**
   * get all users.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: {

  }): Observable<Array<UserDto>> {

    return this.getAllUsers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>) => r.body as Array<UserDto>)
    );
  }

  /**
   * Path part for operation updateUserRoles
   */
  static readonly UpdateUserRolesPath = '/user/admin/updateUserRoles/{username}';

  /**
   * update the roles of a user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserRoles()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserRoles$Response(params: {

    /**
     * username of user to be updated
     */
    username: string;

    /**
     * whether to append the roles
     */
    append: boolean;
  
    /**
     * list of user roles
     */
    body?: Array<UserRole>
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UpdateUserRolesPath, 'post');
    if (params) {

      rb.path('username', params.username, {});
      rb.query('append', params.append, {});

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
   * update the roles of a user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUserRoles$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserRoles(params: {

    /**
     * username of user to be updated
     */
    username: string;

    /**
     * whether to append the roles
     */
    append: boolean;
  
    /**
     * list of user roles
     */
    body?: Array<UserRole>
  }): Observable<string> {

    return this.updateUserRoles$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
