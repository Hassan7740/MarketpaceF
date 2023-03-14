import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient, private tokenService:TokenService) { }

  getHeaders():HttpHeaders{
    return new HttpHeaders({
      Authorization : "Bearer "+this.tokenService.getToken(),
    });
  }

  get(url:string){
    return this.http.get(`${environment.baseURL}${url}`,{headers:this.getHeaders()});
  }

  post(url:string, body:any){
    return this.http.post(`${environment.baseURL}${url}`,body, {headers:this.getHeaders()});
  }

  update(url:string, body:any){
    return this.http.put(`${environment.baseURL}${url}`,body, {headers:this.getHeaders()});

  }

  delete(url:string,id:any){
    return this.http.delete(`${environment.baseURL}${url}${id}`, {headers:this.getHeaders()});
  }

}
