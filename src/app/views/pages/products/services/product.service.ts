import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }

  getProduct(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}/product`)
  }

  getSingleProduct(id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}/productpage/product/${id}`)
  }

  getProductByName(productName: string): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}/product/${productName}`)
  }

  getProductsByCategory(categoryName: string): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}/product/${categoryName}`)
  }

}
