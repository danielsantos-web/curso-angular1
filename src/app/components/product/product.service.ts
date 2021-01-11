import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor( private _snackBar: MatSnackBar, private _http: HttpClient) { }

  showMessage(msg: string): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(_product: Product): Observable<Product> {
    return this._http.post<Product>(this.baseUrl, _product)
  }

  read(): Observable<Product[]>{
    return this._http.get<Product[]>(this.baseUrl)
  }

}

