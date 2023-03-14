import { Injectable } from '@angular/core';
import { Address } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class _User {
    constructor( )
    {}
  public firstName:string ="";
  public lastName:string ="";
  public gender:string="";
  public phone:string="";
  public email:string="";
  public password:string="";
  public address = new Address;
}