import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ClassService } from 'src/app/Services/class.service'; 
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {

  displayedColumns: string[] = ['day_id', 'shi_id', 'sche_quantity', 'loc_name'];
  dataSource = new MatTableDataSource();
  id;
  dataSchedule;
  type;

  constructor(
    private scheduleService: ScheduleService,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    this.type = this.auth.getType();
    this.scheduleService.getScheduleByClass(this.id).subscribe((result)=>{
      this.dataSource = new MatTableDataSource(result.data);
    })
  }

}
