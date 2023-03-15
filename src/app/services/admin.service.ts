import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class AdminService {
    
    constructor(private http:HttpClient, private tokenService:TokenService) { }

    getHeaders():HttpHeaders{
        return new HttpHeaders({
          Authorization : "Bearer "+this.tokenService.getToken()
        });
      }
        getAllUser(): Observable<any> {
            console.log("in function get all ");
            return this.http.get<User[]>(`http://localhost:8090/user/all` , {headers: this.getHeaders()});
          }
    }
