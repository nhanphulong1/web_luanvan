import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/Services/config.service';

@Component({
    selector: 'app-back-footer',
    templateUrl: './back-footer.component.html',
    styleUrls: ['./back-footer.component.scss']
})
export class BackFooterComponent implements OnInit {

    constructor(
        private config: ConfigService,
    ) { }

    data;

    ngOnInit(): void {
        this.config.getConfig().subscribe((kq)=>{
            this.data = kq.data;
          });
    }

}
