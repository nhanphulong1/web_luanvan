import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';
import { FormRegisComponent } from '../../form-regis/form-regis.component';

@Component({
  selector: 'app-course-b1',
  templateUrl: './course-b1.component.html',
  styleUrls: ['./course-b1.component.scss']
})
export class CourseB1Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private service: ServeHttpService
    ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    let DialogRef = this.dialog.open(FormRegisComponent);
    DialogRef.afterClosed().subscribe((result) =>{
      if(result != "false"){
        this.service.postRegis(result).subscribe((result)=>{
          if(result.status == 1){
            Swal.fire(
              'Success!',
              'Đăng ký khóa học thành công!',
              'success'
            )
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Đăng ký khóa học thất bại, Vui lòng thử lại sau!',
            })
          }
        });
      }
    });
  }

}
