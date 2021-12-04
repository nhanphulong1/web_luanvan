import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/Services/auth.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import { StudentService } from 'src/app/Services/student.service';
import { TeacherService } from 'src/app/Services/teacher.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-change-info',
    templateUrl: './change-info.component.html',
    styleUrls: ['./change-info.component.scss']
})
export class ChangeInfoComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private service: ServeHttpService,
        private student: StudentService,
        private teacher: TeacherService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    now = moment(new Date()).format("YYYY-MM-DD");

    public formInfo = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern("^[0][0-9]{9}")]],
        name: ['', [Validators.required]],
        image: ['', Validators.required],
        gender: ['0', [Validators.required]],
        cmnd: ['', [Validators.required]],
        cardIssue: [''],
        cardDate: [null, CustomValidators.dateMinimum(this.now)],
        national: ['Việt Nam', Validators.required],
        address: ['', [Validators.required]],
        residence: [''],
        birthday: ['', [Validators.required, CustomValidators.dateMinimum(this.now)]],
    });
    id;
    isLogin;
    data;
    dataStudent;
    dataTeacher;
    url_image = "../../../assets/storage/default-avatar.jpg";
    imageInvalid = false;

    ngOnInit(): void {
        this.isLogin = this.auth.isLoggedIn();
        if (!this.isLogin)
            this.router.navigate(['home']);
        if (this.isLogin) {
            this.id = this.auth.getInfo();
            this.getData();
        }
    }

    async getData() {
        let dataAccount = await this.service.getUserById(this.id).toPromise();
        this.data = dataAccount.data[0];
        if(this.data.type == 0){
            this.setStudent(this.data);
        }else{
            this.setTeacher(this.data);
        }
    }

    setStudent(data){
        this.formInfo.controls['name'].setValue(data.stu_name);
		this.formInfo.controls['email'].setValue(data.stu_email);
		this.formInfo.controls['phone'].setValue(data.stu_phone);
		this.formInfo.controls['image'].setValue(data.stu_image);
		this.url_image = data.stu_image;
		this.formInfo.controls['gender'].setValue(data.stu_gender);
		this.formInfo.controls['birthday'].setValue(moment(data.stu_birthday).format('YYYY-MM-DD'));
		this.formInfo.controls['address'].setValue(data.stu_address);
		this.formInfo.controls['cmnd'].setValue(data.stu_cmnd);
		this.formInfo.controls['cardIssue'].setValue(data.stu_cardIssue);
		if(data.stu_cardDate != null)
			this.formInfo.controls['cardDate'].setValue(moment(data.stu_cardDate).format('YYYY-MM-DD'));
		this.formInfo.controls['national'].setValue(data.stu_national);
		this.formInfo.controls['residence'].setValue(data.stu_residence);
    }

    setTeacher(data){
        this.formInfo.controls['name'].setValue(data.tea_name);
		this.formInfo.controls['email'].setValue(data.tea_email);
		this.formInfo.controls['phone'].setValue(data.tea_phone);
		this.formInfo.controls['image'].setValue(data.tea_image);
		this.url_image = data.tea_image;
		this.formInfo.controls['gender'].setValue(data.tea_gender);
		this.formInfo.controls['birthday'].setValue(moment(data.tea_birthday).format('YYYY-MM-DD'));
		this.formInfo.controls['address'].setValue(data.tea_address);
		this.formInfo.controls['cmnd'].setValue(data.tea_cmnd);
		this.formInfo.controls['cardIssue'].setValue(data.tea_cardIssue);
		if(data.tea_cardDate != null)
			this.formInfo.controls['cardDate'].setValue(moment(data.tea_cardDate).format('YYYY-MM-DD'));
		this.formInfo.controls['national'].setValue(data.tea_national);
		this.formInfo.controls['residence'].setValue(data.tea_residence);
    }

    onSelectFile(e) {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    handleReaderLoaded(e) {
        this.url_image = ('data:image/png;base64,' + btoa(e.target.result));
        this.formInfo.controls['image'].setValue(this.url_image);
    }

    getDataStudent(){
        this.dataStudent = {
            stu_email: this.formInfo.value.email,
            stu_name: this.formInfo.value.name,
            stu_phone: this.formInfo.value.phone,
            stu_image: this.formInfo.value.image,
            stu_gender: this.formInfo.value.gender,
            stu_birthday: this.formInfo.value.birthday,
            stu_address: this.formInfo.value.address,
            stu_cmnd: this.formInfo.value.cmnd,
            stu_cardIssue: this.formInfo.value.cardIssue,
            stu_cardDate: this.formInfo.value.cardDate,
            stu_national: this.formInfo.value.national,
            stu_residence: this.formInfo.value.residence,
        }
    }

    getDataTeacher(){
        this.dataTeacher = {
            tea_email: this.formInfo.value.email,
            tea_name: this.formInfo.value.name,
            tea_phone: this.formInfo.value.phone,
            tea_image: this.formInfo.value.image,
            tea_gender: this.formInfo.value.gender,
            tea_birthday: this.formInfo.value.birthday,
            tea_address: this.formInfo.value.address,
            tea_cmnd: this.formInfo.value.cmnd,
            tea_cardIssue: this.formInfo.value.cardIssue,
            tea_cardDate: this.formInfo.value.cardDate,
            tea_national: this.formInfo.value.national,
            tea_residence: this.formInfo.value.residence,
        }
    }

    async onSubmit() {
        let result;
        if(this.formInfo.valid){
            if(this.data.type == 0){
                this.getDataStudent();
                result = await this.student.updateStudent(this.data.stu_id,this.dataStudent).toPromise();
            }else{
                this.getDataTeacher();
                result = await this.teacher.updateTeacher(this.data.tea_id,this.dataTeacher).toPromise();
            }
            if(result.status == 1){
                Swal.fire(
                    'Thành công!',
                    'Cập nhật thông tin thành công!',
                    'success'
                ).then(() => {
                    this.router.navigate(['front/detail']);
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Cập nhật thông tin thất bại!',
                })
            }
        }
    }


}
export class CustomValidators {
    static dateMinimum(date: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (control.value == null) {
          return null;
        }
  
        const controlDate = moment(control.value, "YYYY-MM-DD");
  
        if (!controlDate.isValid()) {
          return null;
        }
  
        const validationDate = moment(date);
  
        return controlDate.isBefore(validationDate) ? null : {
          'date-minimum': {
            'date-minimum': validationDate.format("YYYY-MM-DD"),
            'actual': controlDate.format("YYYY-MM-DD")
          }
        };
      };
    }
  }
