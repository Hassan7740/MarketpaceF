import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { User } from './../../../models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  users:User[] = [] ;
  
  ngOnInit(): void {
    this.adminService.getAllUser().subscribe((response)=>{
      this.users = response.data ;
    })
  }

}
