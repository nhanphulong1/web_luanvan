import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { ClassService } from 'src/app/Services/class.service';
import { CourseService } from 'src/app/Services/course.service';
import { DetailService } from 'src/app/Services/detail.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import { StudentService } from 'src/app/Services/student.service';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';
import { PaymentService } from 'src/app/Services/payment.service';
import { MailService } from 'src/app/Services/mail.service';
import { CustomValidators } from 'src/app/user/change-info/change-info.component';


@Component({
	selector: 'app-student',
	templateUrl: './student.component.html',
	styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private service: ServeHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private course: CourseService,
		private student: StudentService,
		private mail: MailService,
		private classService: ClassService,
		private detail: DetailService,
		private payment: PaymentService,
		private auth: AuthService,
	) { }

	courseData;
	classData;
	studentData;
	detailData;
	cla_id;
	cou_id;
	de_id;

	ngOnInit(): void {
		this.course.getAllCourse().subscribe((result) => { //Lấy dữ liệu loại khóa học
			this.courseData = result.data;
		});
		this.route.paramMap.subscribe((params: ParamMap) => { //Lấy ra stu_id
			this.id = params.get('id');
		});
		if (this.id) {
			this.isUpdate = true;
			this.student.getStudentById(this.id).subscribe((result) => { // Nếu là update lấy thông tin học viên cần update
				this.setValueForm(result.data[0]);
			})
		}
	}


	url_image = "../../../assets/storage/default-avatar.jpg";
	imageInvalid = false;
	isUpdate = false;
	user = this.auth.getInfo();
	now = moment(new Date).format('YYYY-MM-DD');
	id;

	public formStudent = this.fb.group({
		stu_email: ['', [Validators.required, Validators.email]],
		stu_phone: ['', [Validators.required, Validators.pattern("^[0][0-9]{9}")]],
		stu_name: ['', [Validators.required]],
		stu_image: [this.url_image],
		stu_gender: ['0', [Validators.required]],
		stu_cmnd: ['', [Validators.required]],
		stu_cardIssue: [''],
		stu_cardDate: [null, CustomValidators.dateMinimum(this.now)],
		stu_national: ['Việt Nam', Validators.required],
		stu_address: ['', [Validators.required]],
		stu_residence: [''],
		stu_birthday: ['', [Validators.required]],
	});

	public formRegisClass = this.fb.group({
		cou_id: ['', Validators.required],
		cla_id: ['', Validators.required],
		stu_id: [''],
		de_status: ['0', Validators.required],
		de_paidFee: ['0', Validators.required],
		pay_id: [''],
	});

	getClass(id) { //Gọi ra ds các lớp thuộc loại khóa học đã chọn trong form
		this.classService.getAllClassByCourse(id).subscribe((result) => {
			this.classData = result.data;
			this.classData = this.classData.filter(element => element.cla_admission == 0);
		});
	}

	setValueForm(data) {
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
		if (data.stu_cardDate != null)
			this.formStudent.controls['stu_cardDate'].setValue(moment(data.stu_cardDate).format('YYYY-MM-DD'));
		this.formStudent.controls['stu_national'].setValue(data.stu_national);
		this.formStudent.controls['stu_residence'].setValue(data.stu_residence);
	}

	onSelectFile(e) {
		let file = e.target.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = this.handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
	}

	checkBirthDay(){
		let year = new Date(this.formStudent.value.stu_birthday).getFullYear();
		let yearNow = new Date().getFullYear();
		if(yearNow - year < 18){
			this.formStudent.controls['stu_birthday'].setErrors({age: true});
		}
	}

	handleReaderLoaded(e) {
		this.url_image = ('data:image/png;base64,' + btoa(e.target.result));
		this.formStudent.controls['stu_image'].setValue(this.url_image);
	}

	async onSubmit() {
		this.imageInvalid = true;
		this.checkBirthDay();
		this.formStudent.markAllAsTouched();
		this.formRegisClass.markAllAsTouched();
		if (this.formRegisClass.value.de_paidFee == '2' && this.formRegisClass.value.pay_id == '')
			this.formRegisClass.controls['pay_id'].setErrors({ required: true })
		else {
			let dataCheck = this.formStudent.value;
			dataCheck.cou_id = this.formRegisClass.value.cou_id;
			let checkStudent = await this.student.checkStudent(dataCheck).toPromise();
			let classFull = await this.classService.checkClassFull(this.formRegisClass.value.cla_id).toPromise();//kiểm tra class full chưa
			if (this.formStudent.valid && this.formRegisClass.valid && checkStudent.valid == 1 && classFull.status == 1) {
				Swal.showLoading();
				let newStudent = await this.student.createStudent(this.formStudent.value).toPromise();
				let user = await this.student.getStudentById(newStudent.data.insertId).toPromise();
				if (newStudent.status == 1) {
					let dataAccount = {
						user: user.data[0].stu_code
					}
					this.service.createUserStudent(dataAccount).toPromise();
					this.formRegisClass.controls['stu_id'].setValue(newStudent.data.insertId);
					this.detail.createDetail(this.formRegisClass.value).subscribe((result) => {
						if (result.status == 1) {
							if(this.formRegisClass.value.de_paidFee != '-1'){ //Thêm giá trị thanh toán
								let dataPayment = {
									de_id : result.data.insertId,
									pay_type : this.formRegisClass.value.de_paidFee
								};
								if(this.formRegisClass.value.de_paidFee == '1'){
									dataPayment['pay_id']= this.formRegisClass.value.pay_id;
								}
								this.payment.createPayment(dataPayment).subscribe();
							}
							Swal.fire(
								'Thành công!',
								'Bạn đã thêm học viên mới thành công!',
								'success'
							).then(() =>
								this.router.navigate(['/admin/student/'])
							)
						} else {
							Swal.fire({
								icon: 'error',
								title: 'Lỗi',
								text: 'Đăng ký lớp học có lỗi xảy ra!',
							})
						}
					})
					let classData = await this.classService.getClassById(this.formRegisClass.value.cla_id).toPromise();
					let dataEmail = classData.data[0];
					dataEmail.pay_type = this.formRegisClass.value.de_paidFee;
					dataEmail.name = this.formStudent.value.stu_name;
					dataEmail.code = user.data[0].stu_code;
					dataEmail.email = this.formStudent.value.stu_email;
					this.mail.sendMailUser(dataEmail).toPromise();
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Lỗi',
						text: 'Đăng ký lớp học có lỗi xảy ra!',
					})
				}
			} else if (classFull.status == 2) {
				Swal.fire({
					icon: 'error',
					title: 'Lớp Full',
					text: 'Lớp học đã đủ học viên vui lòng chọn lớp học khác!',
				})
			} else if (checkStudent.valid == 0) {
				Swal.fire({
					icon: 'error',
					title: 'Lỗi',
					text: 'Email hoặc số điện thoại đã được sử dụng!',
				})
			}
		}
	}

	onUpdate() {
		this.imageInvalid = true;
		this.checkBirthDay();
		this.formStudent.markAllAsTouched();
		if (this.formStudent.valid) {
			this.student.updateStudent(this.id, this.formStudent.value).subscribe((data) => {
				if (data.status == 1) {
					Swal.fire(
						'Thành công!',
						'Bạn đã cập nhật học viên mới thành công!',
						'success'
					).then(() =>
						this.router.navigate(['admin/student'])
					)
				} else {
					Swal.fire({
						icon: 'error',
						text: 'Có lỗi đã xảy ra!',
					})
				}
			})
		}
	}


}
