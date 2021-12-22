import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassService } from 'src/app/Services/class.service';
import { CourseService } from 'src/app/Services/course.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-Class',
  templateUrl: './Class.component.html',
  styleUrls: ['./Class.component.scss']
})
export class ClassComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ClassService,
    private course: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    if(this.id){
      this.isUpdate = true;
      this.service.getClassById(this.id).subscribe((result) => {
        this.cou_id = result.data[0].cou_id;
        this.setValueForm(result.data[0]);
      })
    }
    this.course.getAllCourse().subscribe((result)=>{
      this.courseData = result.data;
    })
  }

  isUpdate = false;
  cou_id;
  courseData = [];
  id;
  now = new Date();

  public formClass = this.fb.group({
    cla_name: ['',[Validators.required]],
    cla_fee: ['', Validators.required],
    cla_course: ['', Validators.required],
    cla_start: [moment(new Date).format('YYYY-MM-DD'),[Validators.required]],
    cla_quantity: ['',[Validators.required]],
    cla_count: ['',[Validators.required]],
    cla_status: ['0'],
    cla_admission: [0,Validators.required],
    cou_id: ['', [Validators.required]],
    cou_name:'',
    tea_id: [null]
  });

  setValueForm(data){
    this.formClass.controls['cla_name'].setValue(data.cla_name);
    this.formClass.controls['cla_fee'].setValue(data.cla_fee);
    this.formClass.controls['cla_course'].setValue(data.cla_course);
    this.formClass.controls['cla_start'].setValue(moment(data.cla_start).format('YYYY-MM-DD'));
    this.formClass.controls['cla_quantity'].setValue(data.cla_quantity);
    this.formClass.controls['cla_count'].setValue(data.cla_count);
    this.formClass.controls['cla_admission'].setValue(data.cla_admission);
    this.formClass.controls['cou_id'].setValue(data.cou_id);
    this.formClass.controls['tea_id'].setValue(data.tea_id);
  }

  setFee(data){
    this.formClass.controls['cla_fee'].setValue(data.cou_fee);
    this.formClass.controls['cla_count'].setValue(data.cou_quantity);
    this.formClass.controls['cou_name'].setValue(data.cou_name);
  }

  onSubmit(){
    if(new Date(this.formClass.value.cla_start) < this.now){
      this.formClass.controls['cla_start'].setErrors({min:true});
    }else
    if(this.formClass.valid){
      this.service.createClass(this.formClass.value).subscribe((data) => {
        if(data.status == 1){
          Swal.fire(
            'Thành công!',
            'Bạn đã thêm lớp học mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/class'])
          )
        }else{
          console.error(data.message);
          Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Có lỗi đã xảy ra!',
          })
        }
      });
    }
  }

  onUpdate(){
    if(this.formClass.valid){
      this.service.updateClass(this.id, this.formClass.value).subscribe((data) => {
        if(data.status == 1){
          Swal.fire(
            'Thành công!',
            'Bạn đã cập nhật lớp học mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/class'])
          )
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Có lỗi đã xảy ra!',
          })
        }
      })
    }
  }


}
