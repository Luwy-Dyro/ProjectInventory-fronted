import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalNewCategComponent } from '../../category/components/modal-new-categ/modal-new-categ.component';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  public productForm: FormGroup;
  estadoForm: string = ""
  categories: CategoryElement[] = []

  selectedFile: any;
  nameImg: String = ""


  constructor(
    private fb: FormBuilder,
    private categService: CategoryService,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ModalNewCategComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.estadoForm = "Add New Product"

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required],
      

    })

    if (data != null){
      this.updateForm(data);
      this.estadoForm = "Update"
    }

  }

  ngOnInit(): void {
    this.getCategories()
  }


  
  onSave(){
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);


    //preguntar para agregar nuevo o actualizar
    if(this.data != null){
      this.productService.putUpdateProduct(uploadImageData, this.data.id)
      .subscribe ((data: any) => {
        this.dialogRef.close(1);
      })
    }else{

      this.productService.postSaveProduct(uploadImageData)
      .subscribe ( (data: any)=>{
          this.dialogRef.close(1);

      }   )
    }

   

  }
  onCancel(){
    this.dialogRef.close(3)
  }


  getCategories(){

    this.categService.getcategories()     
        .subscribe( (data:any) => {
          console.log(data);
          
          this.categories = data.categoryResponse.category;
        })

  }

  onFileChange(event: any){
    console.log("s");
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
    this.nameImg = event.target.files[0].name
    
  }


  updateForm(data: any){
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category.id, Validators.required],
      picture: [data.picture, Validators.required],
    })

  }



}


export interface CategoryElement{

  id: number,
  name: string,
  description: string,
  

}