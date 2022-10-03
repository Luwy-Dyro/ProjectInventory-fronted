import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        private categSrevice: CategoryService
    ) { }

  ngOnInit(): void {
  }


  onNoClick(){
      this.dialogRef.close(3)
  }


  onDelete(){
    if(this.data != null){
      this.categSrevice.deleteCategories(this.data.id)
        .subscribe( data => {
          this.dialogRef.close(1)
        }, (error: any) => {
          this.dialogRef.close(2)
        }
        
        )
    }else{

      this.dialogRef.close(2)
    }
  }
}