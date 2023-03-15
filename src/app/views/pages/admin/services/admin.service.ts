import { Injectable } from '@angular/core';
import {TokenService} from "../../../../services/token.service";
import { Observable } from 'rxjs';
import { User } from '../../../../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class AdminService {
    
    constructor(private http:HttpClient, private tokenService:TokenService) { }

    
        getAllUser(): Observable<any> {
            console.log("in function get all ");
            return this.http.get<any>(`http://localhost:8090/auth/user/all`);
          }
    }
