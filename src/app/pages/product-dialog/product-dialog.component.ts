import { CategoryService } from './../../service/category.service';
import { ProductService } from './../../service/product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementProductComponent } from '../management-product/management-product.component';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  form: FormGroup;
  product: Product;
  text: string;

  categories: Category[] = [];

  productRegister: string = "Create New Product";
  productUpdate: string = "Edit Product";

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    public _dialogRef: MatDialogRef<ManagementProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.getAllCategories();
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      category: [null, [Validators.required]]
    });
  }

  initForm() {
    this.emptyForm();

    this.product = { ...this.data }
    this.text = this.productRegister;

    if (this.data != null) {
      this.editForm();
      return;
    }
    this.product.id = 0;
  }

  getAllCategories(){
    this._categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  editForm() {
    this.text = this.productUpdate;
    this.id.setValue(this.product.id);
    this.name.setValue(this.product.name);
    this.category.setValue(this.product.category.id);
  }


  operate(){

    let productEntity = new Product();
    productEntity.id = this.id.value;
    productEntity.name = this.name.value;

    let categoty = new Category();
    categoty.id = this.category.value;

    productEntity.category = categoty;

    this._productService.register(productEntity).subscribe(() => {
      console.log("guardado");
      this._dialogRef.close(true);
    });
  }

  // ------------------------------ get form ------------------------------

  get id() {
    return this.form.get("id")!
  }

  get name() {
    return this.form.get("name")!
  }

  get category() {
    return this.form.get("category")!
  }
}
