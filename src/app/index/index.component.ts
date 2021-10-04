import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServeHttpService } from '../Services/serve-http.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { CourseService } from '../Services/course.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ServeHttpService,
    private courseService: CourseService,
    private route: Router
  ) { }

  public formRegis:FormGroup = this.fb.group({
    res_email: ['', Validators.required],
    res_name: ['', Validators.required],
    res_type: ['B1', Validators.required],
    res_phone: ['', [Validators.required,Validators.pattern("^[0][0-9]{9}")]],
  });
  b1; b2; c1;

  ngOnInit(): void {
    this.courseService.getCourseByName('b1').subscribe((data)=>{
      this.b1 = data.data;
      console.log(this.b1);
      
    });
    this.courseService.getCourseByName('b2').subscribe((data)=>{
      this.b2 = data.data;
    });
    this.courseService.getCourseByName('c1').subscribe((data)=>{
      this.c1 = data.data;
    });
    console.log(this.b1,this.b2,this.c1);
    
  }

  public getData(){
    let data = {
      'res_name': this.formRegis.value.res_name,
      'res_email': this.formRegis.value.res_email,
      'res_phone': this.formRegis.value.res_phone,
      'res_type': this.formRegis.value.res_type,
    }
    return data;
  }

  public onSubmit(){
    if(this.formRegis.valid){
      let data = this.getData();
      this.service.postRegis(data).subscribe((result)=>{
        console.log('result: ',result);
        
        if(result.status == 1){
          Swal.fire(
            'Success!',
            'Đăng ký khóa học thành công!',
            'success'
          ).then((result)=>{
            this.route.navigate(['/']);
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Đăng ký khóa học thất bại, Vui lòng thử lại sau!',
          })
        }
      });
    }
  }
}
