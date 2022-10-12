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

  postSaveProduct(body: any){

    const endpoint = `${base_url}/products`
    return this.http.post(endpoint, body)


  }

  
  putUpdateProduct(body: any, id:any){
    const endpoint = `${base_url}/products/${id}`
    return this.http.put(endpoint, body);
  }

  deleteProduct(id: any){
    const endpoint = `${base_url}/products/${id}`
    return this.http.delete(endpoint);
  }


  getProductByName(name: any){

    const endpoint = `${base_url}/products/filter/${name}`
    return this.http.get(endpoint);

  }


}
