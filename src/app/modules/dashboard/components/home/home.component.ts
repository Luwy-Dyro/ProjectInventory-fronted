import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductEle } from 'src/app/modules/product/product/product.component';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chartBar:any 
  chartDoughnut:any 

  constructor(private prodService: ProductService) { }


  ngOnInit(): void {

    this.getProducts()
  }

  getProducts(){

    this.prodService.getProducts()
      .subscribe((data:any) => {
        console.log(data);

        this.processProductResponse(data)
        
      })

    }
  

  processProductResponse(resp: any){

    const nameproduct: String[] = [];
    const account: number[] = [];

    if (resp.metadata[0].code == "00"){
      let listProduct = resp.product.products;

      listProduct.forEach((element: ProductEle) => {       
        
        nameproduct.push(element.name)
        account.push(element.account)
      
      });

      //Graphic bar

      this.chartBar = new Chart('canvas-bar', {

          type: 'bar',
          data: {
            labels: nameproduct,
            datasets: [
              {label: 'Products', data: account}
            ]
          }
      })

      this.chartDoughnut = new Chart('canvas-douhhnut', {

        type: 'doughnut',
        data: {
          labels: nameproduct,
          datasets: [
            {label: 'Products', data: account}
          ]
        }
    })
      
      
    }
    
    

  }



}
