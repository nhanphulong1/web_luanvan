import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ServeHttpService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    if(this.id){
      this.isUpdate = true;
      this.service.getUserById(this.id).subscribe((result) => {
        console.log(result.data[0]);
        this.setValueForm(result.data[0]);
      })
    }
  }
  
  url_image = "../../../assets/storage/default-avatar.jpg";
  imageInvalid = false;
  isUpdate = false;
  id;

  public formUser = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    phone: ['',[Validators.required, Validators.pattern("^[0][0-9]{9}")]],
    name: ['',[Validators.required]],
    image: ['', Validators.required],
    type: ['0',[Validators.required]],
    position: ['',[Validators.required]],
    address: ['',[Validators.required]],
  });

  setValueForm(data){
    this.formUser.controls['name'].setValue(data.name);
    this.formUser.controls['email'].setValue(data.email);
    this.formUser.controls['phone'].setValue(data.phone);
    this.formUser.controls['image'].setValue(data.image);
    this.url_image = data.image;
    this.formUser.controls['type'].setValue(''+data.type);
    this.formUser.controls['position'].setValue(data.position);
    this.formUser.controls['address'].setValue(data.address);
  }

  onSelectFile(e){
    var file = e.target.files[0];
    if(file){
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.url_image =('data:image/png;base64,' + btoa(e.target.result));
    this.formUser.controls['image'].setValue(this.url_image);
  }

  onSubmit(){
    this.imageInvalid = true;
    if(this.formUser.valid){
      this.service.checkEmail(this.formUser.value.email).subscribe((result)=>{
        if(result.status == 1){
          this.service.createUser(this.formUser.value).subscribe((data) => {
            if(data.status == 1){
              Swal.fire(
                'Success!',
                'Bạn đã thêm tài khoản mới thành công!',
                'success'
              ).then(() =>
                this.router.navigate(['admin/user'])
              )
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Có lỗi đã xảy ra!',
              })
            }
          })
        }else{
          this.formUser.controls['email'].setErrors({invalidEmail : 'true'});
        }
      });
    }
  }

  onUpdate(){
    this.imageInvalid = true;
    if(this.formUser.valid){
      this.service.updateUser(this.id, this.formUser.value).subscribe((data) => {
        if(data.status == 1){
          Swal.fire(
            'Success!',
            'Bạn đã cập nhật tài khoản mới thành công!',
            'success'
          ).then(() =>
            this.router.navigate(['admin/user'])
          )
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Có lỗi đã xảy ra!',
          })
        }
      })
    }
  }

}
// custom validator Email Unique
// export function forbiddenEmail(){
//   return (control: AbstractControl) => {
//     var customerService : ServeHttpService;
//     return customerService.checkEmail(control.value).subscribe(res => {
//       return res.status ? null : {invalidEmail: true};
//     });
//   }
// }