import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.module';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id')
    this._productService.readById(id).subscribe(product => {
      this.product = product
    });
  }

  updateProduct(): void {
    this._productService.update(this.product).subscribe(() => {
      this._productService.showMessage("Produto Atualizado!");
      this._router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this._router.navigate(["/products"])
  }

}
