import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CourseService } from 'src/app/Services/course.service';
import { DetailService } from 'src/app/Services/detail.service';
import { MailService } from 'src/app/Services/mail.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { ScheduleService } from 'src/app/Services/schedule.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-regis',
	templateUrl: './regis.component.html',
	styleUrls: ['./regis.component.scss']
})
export class RegisComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private service: ServeHttpService,
		private payment: PaymentService,
		private mailService: MailService,
		private course: CourseService,
		private schedule: ScheduleService,
		private student: StudentService,
		private detail: DetailService,
		private router: Router,
	) { }

	public formStudent = this.fb.group({
		stu_email: ['', [Validators.required, Validators.email]],
		stu_phone: ['', [Validators.required, Validators.pattern("^[0][0-9]{9}")]],
		stu_name: ['', [Validators.required]],
		stu_image: ['../../../assets/storage/default-avatar.jpg'],
		stu_gender: ['0', [Validators.required]],
		stu_cmnd: ['', [Validators.required]],
		stu_national: ['Việt Nam'],
		stu_address: ['', [Validators.required]],
		stu_birthday: ['', [Validators.required]],
		cou_id: ['', [Validators.required]],
		cla_id: ['', [Validators.required]],
		pay_type: [0, [Validators.required]],
	});

	dataClass;
	detail_id;
	pay_id;
	tokenId;
	price = 0;
	paidFee = 0;
	courseData;
	classData;
	scheduleClass = '';



	public handler = (<any>window).StripeCheckout.configure({
		key: 'pk_test_51JmKF4Ga5ke3UzMYPqz7Zy7Wus6UuVMLPpOTmjqK7T95RuBXwO3TQNtK4bifq8AqZArjooxkxEqU98clhrqDNHTj00JPnjdYQ8',
		token: (async (token) => {
			this.tokenId = token.id;
			let data = {
				'TokenId': token.id,
				'price': this.price
			};
			let result = await this.payment.postPayment(data).toPromise();
			this.pay_id = result.paymentId;
			this.addStudent();
		})
	});

	ngOnInit(): void {
		this.course.getAllCourse().subscribe((result) => {
			this.courseData = result.data;
			// this.formStudent.controls['cou_id'].setValue(this.courseData[0].cou_id);
		});
	}

	async loadClass(id){
		let kq = await this.course.checkClassbyCourse(id).toPromise(); // chọn ra các lớp đang tuyển sinh theo hạng bằng lái
		this.classData = kq.data;
	}

	async loadInfoClass(){
		let data = this.classData.filter( element => element.cla_id == this.formStudent.value.cla_id );
		this.dataClass = data[0];
		let tag = document.getElementById('class-info');
		tag.classList.add('show');
		alert(this.dataClass.cla_id);
		let sch = await this.schedule.getScheduleByClass(this.dataClass.cla_id).toPromise();
		this.scheduleClass = '';
		if(sch.data.length > 0){
			sch.data.forEach(element => {
				this.scheduleClass += element.day_name + ' ';
			});
		}else{
			this.scheduleClass= 'Chưa có thời khóa biểu!'
		}
	}

	async onSubmit() {
		if (this.formStudent.valid) {
			this.paidFee = this.formStudent.value.pay_type;
			// let checkCourse = await this.course.checkClassbyCourse(this.formStudent.value.cou_id).toPromise(); // chọn ra các lớp đang tuyển sinh theo hạng bằng lái
			let checkStudent = await this.student.checkStudent(this.formStudent.value).toPromise();
			if (checkStudent.valid == 1 && (this.dataClass.cla_number < this.dataClass.cla_quantity)) {//check còn slot học của khóa với học viên mới
				// this.dataClass = checkCourse.data;
				this.price = this.dataClass.cla_fee;
				if (this.formStudent.value.pay_type == 1) {//Thanh toán online
					let pay = await this.handler.open({
						title: "Thanh toán",
						currency: "vnd",
						amount: this.price
					});
				} else {//Thêm học viên thanh toán sau
					this.addStudent();
				}
			}else if(checkStudent.valid == 0){
				Swal.fire({
					icon: 'warning',
					title: 'Thông báo',
					text: 'Email hoặc SĐT đã đăng ký khóa học này ở trung tâm.',
				  })
			}else if(this.dataClass.cla_number >= this.dataClass.cla_quantity){
				Swal.fire({
					icon: 'warning',
					title: 'Thông báo',
					text: 'Hiện tại lớp học đã hết vị trí! Vui lòng liên hệ trung tâm để biết thêm',
				  })
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Lỗi',
					text: 'Có lỗi xảy ra vui lòng thử lại sau!',
				  })
			}
		}
	}

	async addStudent() {
		Swal.showLoading();
		let resultStudent = await this.student.createStudent(this.formStudent.value).toPromise();//tạo học viên
		let idNewStudent = resultStudent.data.insertId;//lấy id học viên vừa tạo
		let dataDetail = {
			cla_id: this.dataClass.cla_id,
			stu_id: idNewStudent,
			de_status: 0,
		};
		let resultDetail = await this.detail.createDetail(dataDetail).toPromise();
		this.detail_id = resultDetail.data.insertId;
		if(this.formStudent.value.pay_type == 1){
			let dataPayment = {
				de_id : this.detail_id,
				pay_id: this.pay_id,
				pay_type: 1
			};
			let pay = await this.payment.createPayment(dataPayment).toPromise();
		}
		let studentData = await this.student.getStudentById(idNewStudent).toPromise();
		let dataAccount = {
			user: studentData.data[0].stu_code
		}
		this.service.createUserStudent(dataAccount).subscribe();
		let dataEmail = this.dataClass;
		dataEmail.pay_type = this.formStudent.value.pay_type;
		dataEmail.name = this.formStudent.value.stu_name;
		dataEmail.code = studentData.data[0].stu_code;
		dataEmail.email = this.formStudent.value.stu_email;
		this.mailService.sendMailUser(dataEmail).toPromise();
		Swal.fire(
			'Success!',
			'Bạn đã đăng ký khóa học thành công! Vui lòng xem email để biết thêm thông tin',
			'success'
		)
	}
}
