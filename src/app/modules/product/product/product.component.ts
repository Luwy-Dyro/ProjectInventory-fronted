import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isAdmin: any

  constructor( private prodService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private util: UtilService
    ) { }

  ngOnInit(): void {
    this.getProducts()
    this.isAdmin =  this.util.isAdmin();
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
        
        //element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture
        dataProduct.push(element);
      
      });

      //Set the datasource
      this.dataSource = new MatTableDataSource<ProductEle>(dataProduct);
      this.dataSource.paginator = this.paginator

    }
    
    

  }


  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent   , {
      width: '450px'
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;

      if(result == 1 ){
        this.openSnackbar("Product added", "Success")
        this.getProducts()
      }else if (result == 2){

        this.openSnackbar("Error to save category", "Success")

      }
    });
  }

  
  openSnackbar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>  {

    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }


  edit(id: number, name : string, price: number, account: number, category: string ){

    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: {
        id,
        name,
        price,
        account,
        category
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;

      if(result == 1 ){
        this.openSnackbar("Product edited", "Success")
        this.getProducts()
      }else if (result == 2){

        this.openSnackbar("Error to edit product", "Success")

      }
    });
  }


  delete(id: any){

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {
        id,
        module: "product"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;

      if(result == 1 ){
        this.openSnackbar("Product Eliminated", "Success")
        this.getProducts()
      }else if (result == 2){

        this.openSnackbar("Error to delete product", "Success")

      }
    });

  }


  search(name: string){

    if(name.length === 0){
        return this.getProducts();
    }

    this.prodService.getProductByName(name)
      .subscribe( (data:any) =>{
        this.processProductResponse(data)
      })
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