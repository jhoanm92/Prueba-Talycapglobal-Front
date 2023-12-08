import { CategoryService } from './../../service/category.service';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/model/category';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { LoginService } from 'src/app/service/login.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-management-product',
  templateUrl: './management-product.component.html',
  styleUrls: ['./management-product.component.css']
})
export class ManagementProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'action'];

  products: Product[] = [];
  categories: Category[] = [];

  clientRegister: string = "Product Register";
  clientUpdate: string = "Product Update";

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>(this.products)

  constructor(
    private _productService: ProductService,
    protected _categoryService: CategoryService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _LoginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllProducts(){
    this._productService.getAll().subscribe(data => {
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products)
    });
  }

  getAllCategories(){
    this._categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  openDialog(product: Product | null){

    let text = "";
    product == null ? text = this.clientRegister : text = this.clientUpdate;

    let dialogRef = this._dialog.open(ProductDialogComponent, {
      height: '400px',
      width: '300px',
      data: product
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._snackBar.open(text, "✔️", {
          duration: 2000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });
        this.getAllProducts();
      }
    });

  }

  delete(id: number){

    let dialogRef = this._dialog.open(DialogConfirmationComponent, {
      data: "You want to delete this Product?"
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._productService.delete(id).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }

  closeSession() {
    let dialogRef = this._dialog.open(DialogConfirmationComponent, {
      data: "You want to log out"
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._LoginService.closeSession();
      }
    });

  }

}
