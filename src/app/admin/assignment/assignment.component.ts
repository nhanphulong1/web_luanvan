import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ClassService } from 'src/app/Services/class.service';
import { MailService } from 'src/app/Services/mail.service';
import { ScheduleService } from 'src/app/Services/schedule.service';
import { TeacherService } from 'src/app/Services/teacher.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-assignment',
	templateUrl: './assignment.component.html',
	styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	displayedColumns: string[] = ['id', 'tea_code', 'tea_name', 'tea_email'];
	dataSource = new MatTableDataSource();
	displayedColumns1: string[] = ['id', 'cla_code', 'cla_name', 'cou_name', 'cla_start'];
	dataSource1 = new MatTableDataSource();
	dataTeacher;
	checkTea = false;

	constructor(
		private fb: FormBuilder,
		private teacher: TeacherService,
		private classService: ClassService,
		private schedule: ScheduleService,
		private router: Router,
		private mail: MailService,
	) { }

	@ViewChild('teacherPaginator', { read: MatPaginator }) teacherPaginator: MatPaginator;
	@ViewChild('classPaginator', { read: MatPaginator }) classPaginator: MatPaginator;

	ngOnInit(): void {
		this.firstFormGroup = this.fb.group({
			tea_id: ['', Validators.required]
		});
		this.secondFormGroup = this.fb.group({
			cla_id: ['', Validators.required]
		});
		this.teacher.getAllTeacher().subscribe((result) => {
			this.dataSource = new MatTableDataSource(result.data);
			this.dataTeacher = result.data;
			this.dataSource.paginator = this.teacherPaginator;
		});
		this.classService.getAllClassByTeacherNull().subscribe((result) => {
			this.dataSource1 = new MatTableDataSource(result.data);
			this.dataSource1.paginator = this.classPaginator;
		});
	}


	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	applyFilter1(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource1.filter = filterValue.trim().toLowerCase();
	}

	async onSubmit() {
		var check = true;
		var cla_id = this.secondFormGroup.value.cla_id;
		var tea_id = this.firstFormGroup.value.tea_id;
		var scheduleTeacher = await this.schedule.getScheduleByClass(cla_id).toPromise();
		for await (const iterator of scheduleTeacher.data) {
			var data = iterator;
			data.tea_id= tea_id;
			var result = await this.schedule.checkScheduleByTeacher(data).toPromise();
			if(result.status == 1 && result.valid == 0)
				check= false;
		}
		if(check==true){
			var dataClass = await this.classService.getClassById(cla_id).toPromise();
			dataClass = dataClass.data[0];
			dataClass.tea_id = tea_id;
			dataClass.teacher = this.dataTeacher.filter( element => element.tea_id == tea_id);
			dataClass.cla_start = moment(dataClass.cla_start).format('YYYY-MM-DD');
			this.classService.updateClass(cla_id,dataClass).subscribe((result)=>{
				if(result.status == 1){
					this.mail.sendMailAssign(dataClass).subscribe(result => {
						Swal.fire(
							'Success!',
							'Phân công giảng dạy thành công!',
							'success'
						  ).then(()=>{
								this.router.navigate(['/admin/class/detail/'+cla_id]);
						  });
					});
				}else{
					Swal.fire({
						icon: 'error',
						title: 'Lỗi!',
						text: 'Phân công giảng dạy thất bại!',
					  })
				}
			})
		}else{
			Swal.fire({
				icon: 'warning',
				title: 'Trùng thời khóa biểu!!!',
				text: 'Lịch dạy của giáo viên trùng với lịch học của lớp!!',
			  })
		}
	}
}
