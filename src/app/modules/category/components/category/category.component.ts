import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../../shared/services/category.service';
import { ModalNewCategComponent } from '../modal-new-categ/modal-new-categ.component';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private categService: CategoryService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions']
  dataSource = new MatTableDataSource<CategoryElement>()


  @ViewChild(MatPaginator)

  paginator!: MatPaginator

  getCategories(){

    this.categService.getcategories()     
        .subscribe( (data:any) => {
          console.log(data);
          this.processCategoriesResponse(data)
          
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
      this.dataSource.paginator = this.paginator;
    }
  }


  openCategory(){
    
    const dialogRef = this.dialog.open(ModalNewCategComponent   , {
      width: '450px'
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;

      if(result == 1 ){
        this.openSnackbar("category added", "Success")
        this.getCategories()
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


  updateCategory(id:number, name: string, description: string ){

    const dialogRef = this.dialog.open(ModalNewCategComponent, {
      width: '450px',
       data: {id: id, name: name, description: description },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;

      if(result == 1 ){
        this.openSnackbar("category updated", "Success")
        this.getCategories()
      }else if (result == 2){

        this.openSnackbar("Error to update category", "Success")

      }
    });



  }


  deleteCategory(id: any){
    
    const dialogRef = this.dialog.open(ConfirmComponent , {
      width: '450px',
       data: {id: id, module: "category" },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;

      if(result == 1 ){
        this.openSnackbar("category eliminated", "Success")
        this.getCategories()
      }else if (result == 2){

        this.openSnackbar("Error to delete category", "Success")

      }
    });  

  }


  search(termino: string){

    if (termino.length === 0){

      return this.getCategories();

    }

    this.categService.getCategoriesById(termino)
        .subscribe(data => {
          this.processCategoriesResponse(data)
        } )
  }



}


export interface CategoryElement{

  id: number,
  name: string,
  description: string,
  

}