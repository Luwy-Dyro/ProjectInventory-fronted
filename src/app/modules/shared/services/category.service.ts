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


  saveCategories(body: any){

    const endpoint = `${base_url}/categories`;

    return this.service.post(endpoint, body)

  }

  updateCategories(body: any, id: any){

    const endpoint = `${base_url}/categories/${id}`;

    return this.service.put(endpoint, body)

  }

  deleteCategories(id: any){

    const endpoint = `${base_url}/categories/${id}`;

    return this.service.delete(endpoint)

  }


  getCategoriesById(id: any){

    const endpoint = `${base_url}/categories/${id}`;

    return this.service.get(endpoint)

  }

}
