import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { MailService } from 'src/app/Services/mail.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
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
		private user: ServeHttpService,
		private mail: MailService,
		private router: Router,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.id = params.get('id');
		});
		if (this.id) {
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
		tea_email: ['', [Validators.required, Validators.email]],
		tea_phone: ['', [Validators.required, Validators.pattern("^[0][0-9]{9}")]],
		tea_name: ['', [Validators.required]],
		tea_national: ['Việt Nam', [Validators.required]],
		tea_image: ['', Validators.required],
		tea_gender: ['0', [Validators.required]],
		tea_cmnd: ['', [Validators.required]],
		tea_cardIssue: [''],
		tea_cardDate: [null],
		tea_address: ['', [Validators.required]],
		tea_residence: [''],
		tea_birthday: [null, [Validators.required]],
	});

	setValueForm(data) {
		this.formTeacher.controls['tea_name'].setValue(data.tea_name);
		this.formTeacher.controls['tea_email'].setValue(data.tea_email);
		this.formTeacher.controls['tea_phone'].setValue(data.tea_phone);
		this.formTeacher.controls['tea_image'].setValue(data.tea_image);
		this.url_image = data.tea_image;
		this.formTeacher.controls['tea_birthday'].setValue(moment(data.tea_birthday).format('YYYY-MM-DD'));
		this.formTeacher.controls['tea_address'].setValue(data.tea_adress);
		this.formTeacher.controls['tea_national'].setValue(data.tea_national);
		this.formTeacher.controls['tea_residence'].setValue(data.tea_residence);
		this.formTeacher.controls['tea_cmnd'].setValue(data.tea_cmnd);
		this.formTeacher.controls['tea_cardIssue'].setValue(data.tea_cardIssue);
		if(data.tea_cardDate != null)
			this.formTeacher.controls['tea_cardDate'].setValue(moment(data.tea_cardDate).format('YYYY-MM-DD'));
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
		this.formTeacher.controls['tea_image'].setValue(this.url_image);
	}

	async onSubmit() {
		this.imageInvalid = true;
		if (this.formTeacher.valid) {
			let check = await this.service.checkTeacher(this.formTeacher.value.tea_email, this.formTeacher.value.tea_phone).toPromise();
			if (check.valid == 1){
				Swal.showLoading();
				let data = await this.service.createTeacher(this.formTeacher.value).toPromise();
				if (data.status == 1) {
					let dataTeacher = await this.service.getTeacherById(data.data.insertId).toPromise();
					let dataAccount = {
						user: dataTeacher.data[0].tea_code
					}
					let resultAccount = await this.user.createUserTeacher(dataAccount).toPromise();
					let dataMail = this.formTeacher.value;
					dataMail.tea_code =  dataTeacher.data[0].tea_code;
					let sendMail = await this.mail.sendMailTeacher(dataMail).toPromise();
					console.log(dataMail,sendMail);
					Swal.fire(
						'Success!',
						'Bạn đã thêm giáo viên mới thành công!',
						'success'
					).then(() =>
						this.router.navigate(['admin/teacher'])
					)
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Có lỗi đã xảy ra!',
					})
				}
			}
			else if(check.valid == 0){
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Email hoặc số điện thoại đã đăng ký!',
				})
			}
		}
	}

	onUpdate() {
		this.imageInvalid = true;
		if (this.formTeacher.valid) {
			this.service.updateTeacher(this.id, this.formTeacher.value).subscribe((data) => {
				if (data.status == 1) {
					Swal.fire(
						'Success!',
						'Bạn đã cập nhật giáo viên mới thành công!',
						'success'
					).then(() =>
						this.router.navigate(['admin/teacher'])
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
