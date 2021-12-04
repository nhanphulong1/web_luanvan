import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { ClassService } from 'src/app/Services/class.service';
import { CourseService } from 'src/app/Services/course.service';
import { DetailService } from 'src/app/Services/detail.service';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-regis-class',
	templateUrl: './regis-class.component.html',
	styleUrls: ['./regis-class.component.scss']
})
export class RegisClassComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private course: CourseService,
		private student: StudentService,
		private classService: ClassService,
		private detail: DetailService,
	) { }

	courseData;
	classData;
	studentData;
	detailData;
	isUpdate = false;
	id;
	cla_id;
	cou_id;
	de_id;
	back = '/admin/student';

	ngOnInit(): void {
		this.course.getAllCourse().subscribe((result) => {
			this.courseData = result.data;
		});
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.id = params.get('id');
			this.de_id = params.get('de_id');
		});
		if (this.id) {
			this.student.getStudentById(this.id).subscribe((result) => {
				result.data[0].stu_birthday = moment(result.data[0].birthday).format('YYYY-MM-DD');
				this.studentData = result.data[0];
			})
		} else {
			this.router.navigate(['/admin/student']);
		}
		if (this.de_id) {
			this.isUpdate = true;
			this.detail.getDeatilById(this.de_id).subscribe((result) => {
				this.detailData = result.data[0];
				this.cla_id = this.detailData.cla_id;
				this.classService.getClassById(this.detailData.cla_id).subscribe((data) => {
					this.cou_id = data.data[0].cou_id;
					this.classService.getAllClassByCourse(this.cou_id).subscribe((result) => {
						this.classData = result.data;
						this.setValue();
						this.back = '/admin/class/detail/'+this.cla_id;
					});
				})
			})
		}
	}


	public formRegisClass = this.fb.group({
		cou_id: ['', Validators.required],
		cla_id: ['', Validators.required],
		stu_id: ['', Validators.required],
		de_status: ['0', Validators.required],
		de_paidFee: ['0', Validators.required],
	});

	setValue() {
		this.formRegisClass.controls['cou_id'].setValue(this.cou_id);
		this.formRegisClass.controls['cla_id'].setValue(this.detailData.cla_id);
		this.formRegisClass.controls['stu_id'].setValue(this.detailData.stu_id);
		this.formRegisClass.controls['de_status'].setValue(this.detailData.de_status);
		this.formRegisClass.controls['de_paidFee'].setValue(this.detailData.de_paidFee);
	}


	getClass(id) {
		this.classService.getAllClassByCourse(id).subscribe((result) => {
			this.classData = result.data;
		});
	}

	async onSubmit() {
		this.formRegisClass.controls['stu_id'].setValue(this.id);
		if (this.formRegisClass.valid) {
			var checkDeatil = await this.detail.checkDetail(this.id).toPromise();
			var classFull = await this.classService.checkClassFull(this.formRegisClass.value.cla_id).toPromise();

			if (checkDeatil.valid == 1 && classFull.status == 1)
				this.detail.createDetail(this.formRegisClass.value).subscribe((result) => {
					if (result.status == 1) {
						Swal.fire(
							'Success!',
							'Bạn đã thêm học viên mới thành công!',
							'success'
						).then(() =>
							this.router.navigate(['/admin/class/detail/' + this.formRegisClass.value.cla_id])
						)
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Lỗi',
							text: 'Đăng ký lớp học có lỗi xảy ra!',
						})
					}
				})
			else if (classFull.status == 2) {
				Swal.fire({
					icon: 'error',
					title: 'Lớp Full',
					text: 'Lớp học đã đủ học viên vui lòng chọn lớp học khác!',
				})
			} else if (checkDeatil.valid == 0) {
				Swal.fire({
					icon: 'error',
					title: 'Lỗi',
					text: 'Học viên hiện đang học tại trung tâm!',
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Lỗi!',
					text: 'Đã có lỗi xảy ra xin vui lòng thử lại!',
				})
			}
		}
	}

	async onUpdate() {
		this.formRegisClass.controls['stu_id'].setValue(this.id);
		if (this.formRegisClass.valid) {
			var classFull = await this.classService.checkClassFull(this.formRegisClass.value.cla_id).toPromise();

			if (classFull.status == 1 || this.formRegisClass.value.cla_id == this.cla_id)
				this.detail.updateDetail(this.de_id,this.formRegisClass.value).subscribe((result) => {
					if (result.status == 1) {
						Swal.fire(
							'Success!',
							'Bạn đã cập nhật thành công!',
							'success'
						).then(() =>
							this.router.navigate(['/admin/class/detail/' + this.formRegisClass.value.cla_id])
						)
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Lỗi',
							text: 'Đăng ký lớp học có lỗi xảy ra!',
						})
					}
				})
			else if (classFull.status == 2) {
				Swal.fire({
					icon: 'error',
					title: 'Lớp Full',
					text: 'Lớp học đã đủ học viên vui lòng chọn lớp học khác!',
				})
			} else  {
				Swal.fire({
					icon: 'error',
					title: 'Lỗi!',
					text: 'Đã có lỗi xảy ra xin vui lòng thử lại!',
				})
			}
		}
	}

}
