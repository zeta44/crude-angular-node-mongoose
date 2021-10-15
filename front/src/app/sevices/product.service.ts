import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { tap, delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products';

  private departmentsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);

  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Product[]>{
    if (!this.loaded) {
      this.http.get<Product[]>(this.url)
      .pipe(
        tap((pros)=> console.log(pros)),
        delay(1000)
      )
      .subscribe(this.departmentsSubject$);
      this.loaded = true
    }
    return this.departmentsSubject$.asObservable();
  }

  add(d: Product): Observable<Product>{
    return this.http.post<Product>(this.url, d)
    .pipe(
      tap((pro: Product)=> this.departmentsSubject$.getValue().push(pro))
    )
  }

  del(pro: Product): Observable<any> {
    return this.http.delete(`${this.url}/${pro._id}`)
    .pipe(
      tap(()=>{
        let departments = this.departmentsSubject$.getValue();
        let i = departments.findIndex(d => d._id === pro._id);
        if (i>=0) {
          departments.splice(i,1)
        }
      })
    )
  }


  update(pro: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.url}/${pro._id}`, pro)
    .pipe(
      tap((d)=>{
        let departments = this.departmentsSubject$.getValue();
        let i = departments.findIndex(d => d._id === pro._id);
        if (i>=0) {
          departments[i].name = d.name;
        }
      })
    )
  }

}
