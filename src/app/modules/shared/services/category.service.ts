import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const base_url = environment.url_base

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private service: HttpClient) { }


  
  getcategories(){

     const endpoint = `${base_url}/categories`
     return this.service.get(endpoint)

  }

}
