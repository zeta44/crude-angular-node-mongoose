import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../interfaces';
import { ProductService } from '../sevices';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  proName: string = '';

  products: Product[] = [];

  proEdit: Product = null;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private productService: ProductService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deps) => this.products = deps)
  }

  save() {
    if ( this.proEdit && this.proName.length !== 0) {
      this.productService.update(
        {name: this.proName, _id: this.proEdit._id})
        .subscribe(
          (prod) => {
            this.notify('Updated!');
          },
          (err) => {
            this.notify('Error');
            console.error(err);
          }
        )
    }
    else {
      if (this.proName.length == 0) {
        this.cancel();
        this.notify('NOTHING INSERTED/EDITED!');
      }
      else{
      this.productService.add({name: this.proName})
      .subscribe(
        (prod) => {
          console.log(prod);
          
          this.notify('Inserted!');
        },
        (err) => console.error(err))
      }
    this.clearFields();
    }
  }


  edit(prod: Product) {
    this.proName = prod.name;
    this.proEdit = prod;
  }

  delete(prod: Product) {
    this.productService.del(prod)
      .subscribe(
        () => this.notify('REMOVED!'),
        (err) => this.notify(err.error.msg)
      )
  }



  clearFields() {
    this.proName = '';
    this.proEdit = null;
  }

  cancel() {
    this.clearFields();
  }

  notify(msg: string) {
    this.snackbar.open(msg, "OK", { duration: 3000 })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

}
