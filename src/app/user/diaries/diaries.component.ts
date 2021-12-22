import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/Services/auth.service';
import { DiariesService } from 'src/app/Services/diaries.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-diaries',
    templateUrl: './diaries.component.html',
    styleUrls: ['./diaries.component.scss']
})
export class DiariesComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private diaries: DiariesService,
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
    ) { }

    id;
    type;
    date = new Date();
    formDiaries = this.fb.group({
        di_location: ['', Validators.required],
        di_content: ['', Validators.required],
        di_type: ['0', Validators.required],
        di_start: [null, Validators.required],
        di_end: [null, Validators.required],
        di_status: [0, Validators.required],
        di_date: [moment(this.date).format('YYYY-MM-DD'), Validators.required],
        cla_id: ['']
    })

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.type = this.auth.getType();
    }

    onSubmit(){
        let time1 = new Date('1/1/2021'+' '+this.formDiaries.value.di_start+':00');
        let time2 = new Date('1/1/2021'+' '+this.formDiaries.value.di_end+':00');
        if(new Date(this.formDiaries.value.di_date + ' 23:59:59') < this.date){
            this.formDiaries.controls['di_date'].setErrors({minDate: true});
        }
        if(time1.valueOf()>time2.valueOf()){
            this.formDiaries.controls['di_end'].setErrors({min: true})
        }else if(this.formDiaries.valid){
            this.formDiaries.controls['cla_id'].setValue(this.id);
            this.diaries.createDiaries(this.formDiaries.value).subscribe((result)=>{
                if(result.status == 1){
                    Swal.fire(
                        'Thành công!',
                        'Bạn đã thêm nhật ký dạy học thành công!',
                        'success'
                      ).then(()=>{
                          this.router.navigate(['front/class/diaries/'+this.id])
                      })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!',
                        text: 'Thêm nhật ký dạy học thất bại!'
                      })
                }
            })
        }
    }

}
