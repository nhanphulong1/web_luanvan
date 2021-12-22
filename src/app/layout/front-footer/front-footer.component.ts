import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/Services/config.service';

@Component({
    selector: 'app-front-footer',
    templateUrl: './front-footer.component.html',
    styleUrls: ['./front-footer.component.scss']
})
export class FrontFooterComponent implements OnInit {

    constructor(
        private config: ConfigService,
    ) { }

    data;

    ngOnInit(): void {
        this.config.getConfig().subscribe((kq) => {
            this.data = kq.data;
        })
    }

}
