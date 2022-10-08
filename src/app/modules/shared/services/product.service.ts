import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';


const base_url = environment.url_base

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getProducts(){

    const endpoint = `${base_url}/products`;
    return this.http.get(endpoint)

  }


}
