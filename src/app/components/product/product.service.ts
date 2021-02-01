import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.module';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(
    private _snackBar: MatSnackBar,
    private _http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
      
    })
  }

  create(_product: Product): Observable<Product> {
    return this._http.post<Product>(this.baseUrl, _product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      )
  }

  read(): Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      )
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this._http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      )
  }

  update(_product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${_product.id}`
    return this._http.put<Product>(url, _product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      )
  }

  delete(id: number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this._http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
      )
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }

}

