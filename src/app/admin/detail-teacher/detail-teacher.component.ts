import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TeacherService } from 'src/app/Services/teacher.service';
import { ClassService } from 'src/app/Services/class.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.component.html',
  styleUrls: ['./detail-teacher.component.scss']
})
export class DetailTeacherComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cla_name', 'cou_name', 'cla_start', 'cla_status', 'action'];
  dataSource = new MatTableDataSource();
  id;
  data;

  constructor(
    private teacherService: TeacherService,
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    this.teacherService.getTeacherById(this.id).subscribe((result) => {
      // console.log(this.data);
      this.data = result.data[0];
    });
    this.classService.getAllClassByTeacher(this.id).subscribe((result) =>{
      console.log(result.data);
      this.dataSource = new MatTableDataSource(result.data);
    })
  }

}
