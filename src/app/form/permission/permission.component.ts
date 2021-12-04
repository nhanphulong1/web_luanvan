import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionService } from 'src/app/Services/permission.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import { DialogData } from 'src/app/user/login/login.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

    constructor(
        private service: ServeHttpService,
        private permission: PermissionService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<PermissionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    id = this.data['id'];
    listPermission;
    userPermission=[];
    public formPermission = this.fb.group({
        permission: this.fb.array([])
    })

    ngOnInit(): void {
        this.permission.getAllPermission().subscribe((result) => {
            this.listPermission = result.data;
        })
        this.permission.getPermissionByUser(this.id).subscribe((result)=>{
            result.data.forEach((data)=>{
                this.userPermission.push(data.per_id);
            });
            this.setValue();
        })
    }

    setValue(){
        const website: FormArray = this.formPermission.get('permission') as FormArray;
        console.log(this.userPermission);
        for (let index = 0; index < this.userPermission.length; index++) {
            website.push(new FormControl(this.userPermission[index]));
        }
    }

    check(id){
        return this.userPermission.includes(id);
    }

    onCheckboxChange(e) {
        const website: FormArray = this.formPermission.get('permission') as FormArray;
        if (e.checked) {
          website.push(new FormControl(e.source.value));
        } else {
           const index = website.controls.findIndex(x => x.value === e.source.value);
           website.removeAt(index);
        }
    }

    async onSubmit(){
        console.log(this.formPermission.value.permission);
        let data = {
            permission: this.formPermission.value.permission
        };
        let kq = await this.permission.updatePermission(this.id, data).toPromise();
        if(kq.status == 1){
            Swal.fire({
                icon: 'success',
                title: 'Phân quyền tài khoản thành công!',
                showConfirmButton: false,
                timer: 2000
              })
            this.onNoClick();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Thất bại',
                text: 'Phân quyền cho tài khoản thất bại. Vui lòng thử lại sau!',
            }).then(()=>
                this.onNoClick()
            )
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
