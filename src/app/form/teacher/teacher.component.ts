import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TeacherService } from 'src/app/Services/teacher.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder,
    private service: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    if(this.id){
      this.isUpdate = true;
      this.service.getTeacherById(this.id).subscribe((result) => {
        console.log(result.data[0]);
        this.setValueForm(result.data[0]);
      })
    }
  }
  
  url_image = "../../../assets/storage/default-avatar.jpg";
  imageInvalid = false;
  isUpdate = false;
  id;

  public formTeacher = this.fb.group({
    tea_email: ['',[Validators.required, Validators.email]],
    tea_phone: ['',[Validators.required, Validators.pattern("^[0][0-9]{9}")]],
    tea_name: ['',[Validators.required]],
    tea_image: ['', Validators.required],
    tea_gender: ['0',[Validators.required]],
    tea_cmnd: ['',[Validators.required]],
    tea_address: ['',[Validators.required]],
    tea_birthday: ['',[Validators.required]],
  });

  setValueForm(data){
    this.formTeacher.controls['tea_name'].setValue(data.tea_name);
    this.formTeacher.controls['tea_email'].setValue(data.tea_email);
    this.formTeacher.controls['tea_phone'].setValue(data.tea_phone);
    this.formTeacher.controls['tea_image'].setValue(data.tea_image);
    this.url_image = data.tea_image;
    // this.formTeacher.controls['type'].setValue(''+data.type);
    this.formTeacher.controls['tea_birthday'].setValue(data.tea_birthday);
    this.formTeacher.controls['tea_address'].setValue(data.tea_adress);
    this.formTeacher.controls['tea_cmnd'].setValue(data.tea_cmnd);
  }

  onSelectFile(e){
    var file = e.target.files[0];
    if(file){
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.url_image =('data:image/png;base64,' + btoa(e.target.result));
    this.formTeacher.controls['tea_image'].setValue(this.url_image);
  }

  onSubmit(){
    this.imageInvalid = true;
    if(this.formTeacher.valid){
      this.service.createTeacher(this.formTeacher.value).subscribe((data) => {
        if(data.status == 1){
          Swal.fire(
            'Success!',
            'Bạn đã thêm giáo viên mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/teacher'])
          )
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Có lỗi đã xảy ra!',
          })
        }
      });
    }
  }

  onUpdate(){
    this.imageInvalid = true;
    if(this.formTeacher.valid){
      this.service.updateTeacher(this.id, this.formTeacher.value).subscribe((data) => {
        if(data.status == 1){
          Swal.fire(
            'Success!',
            'Bạn đã cập nhật giáo viên mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/teacher'])
          )
        }else{
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
