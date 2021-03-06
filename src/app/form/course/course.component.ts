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
  checkContent = false;
  imageInvalid = false;
  url_image = "../../../assets/image/default-image.jpg";
  id;

  public formCourse = this.fb.group({
    cou_name: ['', [Validators.required]],
    cou_fee: ['', [Validators.required]],
    cou_training: ['', [Validators.required]],
    cou_quantity: ['', Validators.required],
    cou_content: ['', Validators.required],
    cou_image: ['', Validators.required],
  });

  setValueForm(data) {
    this.formCourse.controls['cou_name'].setValue(data.cou_name);
    this.formCourse.controls['cou_fee'].setValue(data.cou_fee);
    this.formCourse.controls['cou_training'].setValue(data.cou_training);
    this.formCourse.controls['cou_quantity'].setValue(data.cou_quantity);
    this.formCourse.controls['cou_content'].setValue(data.cou_content);
    this.formCourse.controls['cou_image'].setValue(data.cou_image);
    this.url_image = data.cou_image;
  }

  onSelectFile(e) {
		let file = e.target.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = this.handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
	}

	handleReaderLoaded(e) {
		this.url_image = ('data:image/png;base64,' + btoa(e.target.result));
		this.formCourse.controls['cou_image'].setValue(this.url_image);
	}


  onSubmit() {
    this.checkContent = true;
    this.imageInvalid = true;
    if (this.formCourse.valid) {
      this.service.createCourse(this.formCourse.value).subscribe((data) => {
        if (data.status == 1) {
          Swal.fire(
            'Tha??nh c??ng!',
            'Ba??n ??a?? th??m kho??a ho??c m????i tha??nh c??ng!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/course'])
          )
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Co?? l????i ??a?? xa??y ra!',
          })
        }
      })
    }
  }

  onUpdate() {
    this.checkContent = true;
    this.imageInvalid = true;
    if (this.formCourse.valid) {
      this.service.updateCourse(this.id, this.formCourse.value).subscribe((data) => {
        if (data.status == 1) {
          Swal.fire(
            'Tha??nh c??ng!',
            'Ba??n ??a?? c????p nh????t kho??a ho??c m????i tha??nh c??ng!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/course'])
          )
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Co?? l????i ??a?? xa??y ra!',
          })
        }
      })
    }
  }

}
