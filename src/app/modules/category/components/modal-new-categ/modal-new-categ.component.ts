import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-modal-new-categ',
  templateUrl: './modal-new-categ.component.html',
  styleUrls: ['./modal-new-categ.component.scss']
})
export class ModalNewCategComponent implements OnInit {

  public categoryForm: FormGroup
  estadoForm: string = ""

  constructor(
      private fb: FormBuilder,
      private categService: CategoryService,
      private dialogRef: MatDialogRef<ModalNewCategComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { 

      this.estadoForm = "Add"
      console.log(data);
      
    this.categoryForm = this.fb.group({

        name: ['', Validators.required],
        description: ['', Validators.required]

    })

    if (data != null){
      this.updateForm(data)
      this.estadoForm= "Update"
    }

  }

  ngOnInit(): void {
  }

  onSave(){

    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value

    }
    
    if(this.data != null){

      //uodate categ
      this.categService.updateCategories(data, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        })

    }else {

      //create new register
      console.log("assssaa");
      
      this.categService.saveCategories(data)
      .subscribe(data => {
        console.log(data);
        this.dialogRef.close(1)
        
      }
      // , (error: any )=>{
      //   this.dialogRef.close(2)
      // }
      )
      
      
    }
  }

  onCancel(){
    this.dialogRef.close(3)
  }

  updateForm(data: any){
          
    this.categoryForm = this.fb.group({

      name: [data.name, Validators.required],
      description: [data.description, Validators.required]

    })




  }




}
