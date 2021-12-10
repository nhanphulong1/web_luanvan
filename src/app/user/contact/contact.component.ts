import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ServeHttpService
  ) { }

  public formContact = this.fb.group({
    con_email: ['',[Validators.required, Validators.email]],
    con_phone: ['',[Validators.required, Validators.pattern("^[0][0-9]{9}")]],
    con_name: ['',[Validators.required]],
    con_title: ['',[Validators.required]],
    con_content: ['',[Validators.required]],
  });

  ngOnInit(): void {
  }

  getData(){
    return {
      'con_name': this.formContact.value.con_name,
      'con_email': this.formContact.value.con_email,
      'con_phone': this.formContact.value.con_phone,
      'con_title': this.formContact.value.con_title,
      'con_content': this.formContact.value.con_content,
    };
  }

  public onSubmit(){
    if(this.formContact.valid){
      let data = this.getData();
      console.log(data);
      this.service.postContact(data).subscribe((result)=>{
        if(result.status == 1){
          Swal.fire(
            'Thành công',
            'Gửi yêu cầu thành công!',
            'success'
          ).then((result)=>{
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Gửi yêu cầu thất bại, Vui lòng thử lại sau!',
          })
        }
      });
    }
  }

}
