import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    if(this.id){
      this.isUpdate = true;
      this.service.getStudentById(this.id).subscribe((result) => {
        console.log(result.data[0]);
        this.setValueForm(result.data[0]);
      })
    }
  }

    
  url_image = "../../../assets/storage/default-avatar.jpg";
  imageInvalid = false;
  isUpdate = false;
  id;

  public formStudent = this.fb.group({
    stu_email: ['',[Validators.required, Validators.email]],
    stu_phone: ['',[Validators.required, Validators.pattern("^[0][0-9]{9}")]],
    stu_name: ['',[Validators.required]],
    stu_image: ['', Validators.required],
    stu_gender: ['0',[Validators.required]],
    stu_cmnd: ['',[Validators.required]],
    stu_cardIssue: [''],
    stu_cardDate: [''],
    stu_national: ['Việt Nam', Validators.required],
    stu_address: ['',[Validators.required]],
    stu_residence: [''],
    stu_birthday: ['',[Validators.required]],
  });

  setValueForm(data){
    this.formStudent.controls['stu_name'].setValue(data.stu_name);
    this.formStudent.controls['stu_email'].setValue(data.stu_email);
    this.formStudent.controls['stu_phone'].setValue(data.stu_phone);
    this.formStudent.controls['stu_image'].setValue(data.stu_image);
    this.url_image = data.stu_image;
    this.formStudent.controls['stu_gender'].setValue(data.stu_gender);
    this.formStudent.controls['stu_birthday'].setValue(moment(data.stu_birthday).format('YYYY-MM-DD'));
    this.formStudent.controls['stu_address'].setValue(data.stu_address);
    this.formStudent.controls['stu_cmnd'].setValue(data.stu_cmnd);
    this.formStudent.controls['stu_cardIssue'].setValue(data.stu_cardIssue);
    this.formStudent.controls['stu_cardDate'].setValue(moment(data.stu_cardDate).format('YYYY-MM-DD'));
    this.formStudent.controls['stu_national'].setValue(data.stu_national);
    this.formStudent.controls['stu_residence'].setValue(data.stu_residence);
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
    this.formStudent.controls['stu_image'].setValue(this.url_image);
  }

  onSubmit(){
    this.imageInvalid = true;
    if(this.formStudent.valid){
      this.service.createStudent(this.formStudent.value).subscribe((data) => {
        if(data.status == 1){
          Swal.fire(
            'Success!',
            'Bạn đã thêm học viên mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/student'])
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
    if(this.formStudent.valid){
      this.service.updateStudent(this.id, this.formStudent.value).subscribe((data) => {
        if(data.status == 1){
          Swal.fire(
            'Success!',
            'Bạn đã cập nhật học viên mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/student'])
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
