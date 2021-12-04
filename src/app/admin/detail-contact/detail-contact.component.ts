import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MailService } from 'src/app/Services/mail.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.scss']
})
export class DetailContactComponent implements OnInit {

  constructor(
    private service: ServeHttpService,
    private route: ActivatedRoute,
    private mail: MailService,
  ) { }

  id;
  data;
  content;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    this.service.getContactById(this.id).subscribe((result)=>{
      this.data = result.data[0];
    });
    this.service.updateContact(this.id).subscribe((result)=>{});
  }

  async sendMail(){
    let data = {
      email: this.data.con_email,
      content: this.content
    };
    let kq = await this.mail.sendMailContact(data).toPromise();
    if(kq.status == 1){
      Swal.fire({
        icon: 'success',
        text: "Phản hồi góp ý thành công!"
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: "Phản hồi góp ý thất bại!"
      })
    }
  }

}
