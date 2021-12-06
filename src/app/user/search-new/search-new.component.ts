import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewsService } from 'src/app/Services/news.service';

@Component({
    selector: 'app-search-new',
    templateUrl: './search-new.component.html',
    styleUrls: ['./search-new.component.scss']
})
export class SearchNewComponent implements OnInit {

    constructor(
        private news: NewsService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    title;
    data;
    search='';

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.title = params.get('search');
            this.search = this.title;
            this.news.searchNews(this.title).subscribe((kq) => {
                this.data = kq.data;   
            })
        });
        
    }

    onSearch(){
        if(this.search == ''){
            this.search = 'all';
        }
        this.router.navigate(['/front/search/'+this.search]);
    }

}
