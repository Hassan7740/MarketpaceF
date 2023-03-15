import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }

  getProduct(offset: number, limit: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}homepage?offset=${offset}&limit=${limit}`)
  }

  getSingleProduct(id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}productpage/product/${id}`)
  }

  getProductByName(productName: string): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}/product/${productName}`)
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}productpage/category/${categoryId}`)
  }

}
