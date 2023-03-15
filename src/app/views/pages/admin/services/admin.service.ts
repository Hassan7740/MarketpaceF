import { Injectable } from '@angular/core';
import {TokenService} from "../../../../services/token.service";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './../../../../models/Product';

@Injectable({
    providedIn: 'root'
  })
export class AdminService {
    
    constructor(private http:HttpClient, private tokenService:TokenService) { }

        addProduct(product:Product): Observable<any> {
          console.log("in function get all " , product);
            return this.http.post<any>("http://localhost:8090/product" ,product);
          }
    }
