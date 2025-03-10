import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  fetchList(params:any){
    let api = 'https://fakestoreapi.com/products?limit='+params.limit;
    return this.http.get(api).pipe( catchError((error:any)=>{
      return of({error:true, object:error})
    }))
  }
}
