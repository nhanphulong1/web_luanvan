import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CourseService } from 'src/app/Services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.isUpdate = true;
      this.service.getCourseById(this.id).subscribe((result) => {
        console.log(result.data[0]);
        this.setValueForm(result.data[0]);
      })
    }
  }

  isUpdate = false;
  id;

  public formCourse = this.fb.group({
    cou_name: ['', [Validators.required]],
    cou_fee: ['', [Validators.required]],
    cou_training: ['', [Validators.required]],
    cou_quantity: ['', Validators.required],
  });

  setValueForm(data) {
    this.formCourse.controls['cou_name'].setValue(data.cou_name);
    this.formCourse.controls['cou_fee'].setValue(data.cou_fee);
    this.formCourse.controls['cou_training'].setValue(data.cou_training);
    this.formCourse.controls['cou_quantity'].setValue(data.cou_quantity);
  }

  onSubmit() {
    if (this.formCourse.valid) {
      this.service.createCourse(this.formCourse.value).subscribe((data) => {
        if (data.status == 1) {
          Swal.fire(
            'Success!',
            'Bạn đã thêm khóa học mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/course'])
          )
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Có lỗi đã xảy ra!',
          })
        }
      })
    }
  }

  onUpdate() {
    if (this.formCourse.valid) {
      this.service.updateCourse(this.id, this.formCourse.value).subscribe((data) => {
        if (data.status == 1) {
          Swal.fire(
            'Success!',
            'Bạn đã cập nhật khóa học mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/course'])
          )
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Có lỗi đã xảy ra!',
          })
        }
      })
    }
  }

}
