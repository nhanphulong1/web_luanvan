import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassService } from 'src/app/Services/class.service'; 
import { ScheduleService } from 'src/app/Services/schedule.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  displayedColumns: string[] = ['day_id', 'shi_id', 'sche_quantity', 'loc_name', 'action'];
  dataSource = new MatTableDataSource();
  id;
  data;
  // dataSchedule;

  constructor(
    private classService: ClassService,
    private scheduleService: ScheduleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    this.classService.getClassById(this.id).subscribe((result)=>{
      if(result.status == 0) this.router.navigate(['/admin/class']);
      this.data = result.data[0];
    });
    this.scheduleService.getScheduleByClass(this.id).subscribe((result)=>{
      // this.createData();
      // this.loadData(result.data);
      this.dataSource = new MatTableDataSource(result.data);
    })
  }

  loadTable(){
    this.scheduleService.getScheduleByClass(this.id).subscribe((result)=>{
      // this.createData();
      // this.loadData(result.data);
      this.dataSource = new MatTableDataSource(result.data);
    })
  }

  // createData(){
  //   this.dataSchedule = [
  //     {'day_name':'Thứ 2', 'shi_id':'', 'sche_quantity':'', 'loc_name':''},
  //     {'day_name':'Thứ 3', 'shi_id':'', 'sche_quantity':'', 'loc_name':''},
  //     {'day_name':'Thứ 4', 'shi_id':'', 'sche_quantity':'', 'loc_name':''},
  //     {'day_name':'Thứ 5', 'shi_id':'', 'sche_quantity':'', 'loc_name':''},
  //     {'day_name':'Thứ 6', 'shi_id':'', 'sche_quantity':'', 'loc_name':''},
  //     {'day_name':'Thứ 7', 'shi_id':'', 'sche_quantity':'', 'loc_name':''},
  //     {'day_name':'Chủ nhật', 'shi_id':'', 'sche_quantity':'', 'loc_name':''}
  //   ];
  // }

  // loadData(data){
  //   data.forEach(element => {
  //     this.dataSchedule[element.day_id-1]=element;
  //   });
  // }

  deleteSchedule(id) {
    Swal.fire({
      title: 'Xóa thời khóa biểu?',
      text: "Bạn có muốn xóa thời khóa biểu lớp học này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        this.scheduleService.deleteSchedule(id).subscribe((result) => {
          if (result.status == 1) {
            Swal.fire(
              'Thành công!',
              'Xóa lịch học thành công!',
              'success'
            );
            this.loadTable();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!!!',
              text: 'Xóa lịch học thất bại.',
            })
          }
        })
      }
    })
  }

}
