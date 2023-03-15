import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import jwt_decode from 'jwt-decode';
import { LocalstorageService } from '../../auth/services/localstorage.service';
import { AuthService } from '../../auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  cartList!: CartItem[];
  totalPrice!: number;
  isCartEmpty: boolean = false;
  productId: number[] = [];
  proudctAmount: any[] = [];

  constructor(
    private router: Router,
    private _cartService: CartService,
    private formBuilder: FormBuilder,
    private _localstorageService: LocalstorageService,
    private _auth: AuthService,


  ) { }

  getCartList() {
    this._cartService.cart$.subscribe((cart) => {
      this.cartList = cart.items!;
      if (this.cartList.length == 0) this.isCartEmpty = true;
      else this.isCartEmpty = false;
    });
  }

  getTotalPrice() {
    this._cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.totalPrice += item.product.price! * item.quantity!;
        });
      }
    });
  }


  initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      // city: ['', Validators.required],
      // country: ['', Validators.required],
      postalcode: ['', Validators.required],
      message: [''],
      zip: ['', Validators.required],
      house: ['', Validators.required],
      address: ['', Validators.required]
    });
  }


  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    const token = this._localstorageService.getToken();
    const tokenInfo = this.getDecodedAccessToken(token);
    console.log(tokenInfo.sub)

    for (let i = 0; i < this.cartList.length; i++) {
      this.productId[i] = this.cartList[i].product.id;
      this.proudctAmount[i] = this.cartList[i].quantity;
    }
    console.log(this.proudctAmount)

    this._auth.setProductInApi(tokenInfo.sub, this.productId, "orderd",this.proudctAmount).subscribe(
      (user) => {
        this.router.navigate(['/checkout/succuss'])
      },
      (error: HttpErrorResponse) => {
        if (error.status !== 400) {
          alert(error.message)
        }
      }
    );

  }

  ngOnInit(): void {
    this.getCartList();
    this.getTotalPrice();
    this.initCheckoutForm();
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
