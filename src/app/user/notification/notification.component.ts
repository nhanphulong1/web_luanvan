import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { QuillModule } from 'ngx-quill';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private notifi: NotificationService,
        private auth: AuthService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    QuillConfiguration = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            ['link'],
            ['clean'],
        ],
    }


    id;
    no_id;
    formNotifi= this.fb.group({
        no_title: ['', Validators.required],
        no_content: ['', Validators.required],
        cla_id: ['', Validators.required]
    });
    data;
    type;
    check = false;
    update=false;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        if (this.id) {
            this.formNotifi.controls['cla_id'].setValue(this.id);
        };
        this.type = this.auth.getType();
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.no_id = params.get('no_id');
        });
        if(this.no_id){
            this.update = true;
            this.notifi.getNotifiById(this.no_id).subscribe((result)=>{
                this.data = result.data[0];
                this.id = this.data.cla_id;
                this.setValue();
            })
        }
    }

    setValue(){
        this.formNotifi.controls['no_title'].setValue(this.data.no_title);
        this.formNotifi.controls['no_content'].setValue(this.data.no_content);
        this.formNotifi.controls['cla_id'].setValue(this.data.cla_id);
    }

    async onSubmit() {
        this.check = true;
        if (this.formNotifi.valid) {
            let kq = await this.notifi.createNotifi(this.formNotifi.value).toPromise();
            if (kq.status == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo thông báo thành công!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.router.navigate(['front/class/' + this.id])
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Tạo thông báo thất bại. Vui lòng thử lại sau!',
                })
            }
        }
    }

    async onUpdate() {
        this.check = true;
        if (this.formNotifi.valid) {
            let kq = await this.notifi.updateNotifi(this.no_id,this.formNotifi.value).toPromise();
            if (kq.status == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thông báo thành công!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.router.navigate(['front/class/' + this.data.cla_id])
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Cập nhật thông báo thất bại. Vui lòng thử lại sau!',
                })
            }
        }
    }
}
