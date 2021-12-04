import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewsService } from 'src/app/Services/news.service';

@Component({
    selector: 'app-detail-news',
    templateUrl: './detail-news.component.html',
    styleUrls: ['./detail-news.component.scss']
})
export class DetailNewsComponent implements OnInit {

    constructor(
        private news: NewsService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    data;
    id;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.news.getNewsById(this.id).subscribe((result)=>{
            this.data = result.data[0];
            if(this.data.length == 0){
                this.router.navigate(['/home']);
            }
        })
    }

}
