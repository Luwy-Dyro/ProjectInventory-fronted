import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor( private prodService: ProductService,
    
    ) { }

  ngOnInit(): void {
    this.getProducts()
  }


  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture','actions']
  dataSource = new MatTableDataSource<ProductEle>()

  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  getProducts(){

    this.prodService.getProducts()
      .subscribe((data:any) => {
        console.log(data);

        this.processProductResponse(data)
        
      })
      
  }

  processProductResponse(resp: any){

    const dataProduct: ProductEle[] = [];

    if (resp.metadata[0].code == "00"){

      let listProduct = resp.product.products;

      listProduct.forEach((element: ProductEle) => {
        
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture
        dataProduct.push(element);
      
      });

      //Set the datasource
      this.dataSource = new MatTableDataSource<ProductEle>(dataProduct);
      this.dataSource.paginator = this.paginator

    }
    
    

  }


}




export interface ProductEle{
  id:number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}