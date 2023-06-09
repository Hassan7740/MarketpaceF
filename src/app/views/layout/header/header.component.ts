import { Component, HostListener, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import {HttpClient} from '@angular/common/http'
import { ResponseViewModel } from 'src/app/models/ResponseViewModel';
import { AuthService } from '../../pages/auth/services/auth.service';
import { CartService } from '../../pages/services/cart.service';
import { WishlistService } from '../../pages/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  cartCount = 0;
  wishCount = 0;
  sticky: boolean = false;
  loggedIn: boolean = false;

  categories:Category []= [];


  // http: any;
  
  constructor
    (
      private _cartService: CartService,
      private _auth: AuthService,
      private _wishlistService: WishlistService,
      private http:HttpClient,
    ) { }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 300) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  ngOnInit(): void {
    this._cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });
    this._wishlistService.wishList$.subscribe((wishList) => {
      this.wishCount = wishList?.items?.length ?? 0;
    });
    this.loggedIn = this._auth.loggedIn();
    console.log(this.loggedIn)


    this.http.get<ResponseViewModel>('http://localhost:8090/homepage/categories').subscribe(
      response => {
       this.categories = response.data
       console.log(response);
       alert(this.categories[0].categoryId)
      }
    )
    // // alert("id of first category is " + this.categories[0].id)
    // alert("the message is " + this.message)
    
    
  }


  getCategory(){
   
  }

}
