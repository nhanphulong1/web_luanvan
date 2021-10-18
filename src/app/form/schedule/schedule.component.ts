import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ScheduleService } from 'src/app/Services/schedule.service';
import { ShiftService } from 'src/app/Services/shift.service';
import { LocationService } from 'src/app/Services/location.service'; 
import { DayService } from 'src/app/Services/day.service'; 
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private schedule: ScheduleService,
    private shift: ShiftService,
    private location: LocationService,
    private day: DayService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
      this.formSchedule.controls['cla_id'].setValue(this.id);
    });
    this.shift.getAllShift().subscribe((result) => {
      this.shiftData = result.data;
    });
    this.location.getAllLocation().subscribe((result) => {
      this.locationData = result.data;
    });
    this.day.getAllDay().subscribe((result) => {
      this.dayData = result.data;
    });
  }

  shiftData = [];
  dayData = [];
  locationData = [];
  id;
  isvalid= true;

  public formSchedule = this.fb.group({
    shi_id: ['',[Validators.required]],
    loc_id: ['',[Validators.required]],
    day_id: ['',[Validators.required]],
    cla_id: ['',[Validators.required]],
    sche_quantity: ['',[Validators.required]],
  });


  onSubmit(){
    if(this.formSchedule.valid){
      if((this.formSchedule.value.shi_id <= 5 && (+this.formSchedule.value.shi_id + +this.formSchedule.value.sche_quantity) > 6)  || (this.formSchedule.value.shi_id > 5 && (+this.formSchedule.value.shi_id + +this.formSchedule.value.sche_quantity) > 10) || +this.formSchedule.value.sche_quantity<1){
        this.formSchedule.controls['sche_quantity'].setErrors({'invalidQuantity': true});
        return;
      }
      var data = {
        'shi_id': this.formSchedule.value.shi_id,
        'sche_quantity': this.formSchedule.value.sche_quantity,
        'loc_id': this.formSchedule.value.loc_id,
        'day_id': this.formSchedule.value.day_id,
      }
      return this.schedule.checkSchedule(data).subscribe((result)=>{
        console.log(result);
        if(result.status == 1 && result.valid==1)
          this.schedule.createSchedule(this.formSchedule.value).subscribe((data) => {
            if(data.status == 1){
              Swal.fire(
                'Success!',
                'Bạn đã thêm thời khóa biểu thành công!',
                'success'
              ).then(() =>
                this.router.navigate(['admin/timetable/'+this.id])
              )
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Có lỗi đã xảy ra!',
              })
            }
          });
        else {
          Swal.fire({
            icon: 'error',
            title: 'Trùng thời khóa biểu',
            text: 'Thời khóa biểu đã trùng với lớp khác!',
          })
        }
      })
      
    }
  }

}
