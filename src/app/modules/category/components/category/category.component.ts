import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private categService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions']
  dataSource = new MatTableDataSource<CategoryElement>()

  getCategories(){

    this.categService.getcategories()
        .subscribe( (data:any) => {
          console.log(data);
          this.processCategoriesResponse(data)
          
        }, (error: any)=> {
          console.error("error: ", error);
          
        })

  }

  processCategoriesResponse(resp : any){

    const dataCategory: CategoryElement[] = [];

    if(resp.metadata[0].code == "00" ){

      let listCategory = resp.categoryResponse.category

      listCategory.forEach( (element: CategoryElement) => {
          dataCategory.push(element)
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory)
    }


  }



}


export interface CategoryElement{

  id: number,
  name: string,
  description: string,
  

}