import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';
import { Product } from './../../../models/Product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private _adminService: AdminService,
    private _formBuilder: FormBuilder
  ) {}
  product: Product = new Product();
  adminFormGroup!: FormGroup;

  initAdminForm() {
    this.adminFormGroup = this._formBuilder.group({
      productName: [''],
      productAmount: [''],
      productDescription: [''],
      price: [''],
      categoryId: [''],
      categoryName: [''],
    });
  }
  

  OnSubmit(){
    this.product.productName = this.adminForm.productName.value  ;
    this.product.category.categoryId = this.adminForm.categoryId.value  ;
    this.product.category.categoryName = this.adminForm.categoryName.value ;
    this.product.price = this.adminForm.price.value;
    this.product.productAmount = this.adminForm.productAmount.value;
    this.product.productDescription = this.adminForm.productDescription.value;
    console.log(this.product)
    this._adminService.addProduct(this.product);
  }

  
  ngOnInit():void{
    this.initAdminForm();
  }
  
  
 get adminForm(){
    return this.adminFormGroup.controls;
  }
 
}
