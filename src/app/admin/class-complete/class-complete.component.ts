import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassService } from 'src/app/Services/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-complete',
  templateUrl: './class-complete.component.html',
  styleUrls: ['./class-complete.component.scss']
})
export class ClassCompleteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cla_code', 'cla_name', 'cou_name', 'tea_name', 'cla_course', 'cla_number',  'action'];
  dataSource = new MatTableDataSource();


  constructor(
    private service: ClassService,
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
    this.service.getAllClass().subscribe((result) => {
      let data = result.data.filter( element => (element.cla_complete == 1 && element.cla_status == 0) );
      this.dataSource = new MatTableDataSource(data);
    });
  }

}
