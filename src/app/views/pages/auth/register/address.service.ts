import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class Address {
     public country:string="";
     public area:string="";
     public street:string="";
     public buildNo:string="";
     public floorNo:string="";
  }