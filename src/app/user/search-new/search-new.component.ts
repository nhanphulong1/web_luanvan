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
    page:number = 1;
    countNews = 2;
    countPage;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.title = params.get('search');
            this.page = parseInt(params.get('page'));
            this.search = this.title;
            this.getNews(this.title,this.page);
        });
    }

    async getNews(title, page){
        let kqCount = await this.news.getCountPageNews(title).toPromise();
        this.countPage = (kqCount.data[0].n_page/this.countNews);
        let kqNews = await this.news.searchNews(title,page).toPromise();
        this.data = kqNews.data;
    }

    loadPage(num){
        console.log(this.countPage);
        if(num == 0 && this.page>0){
            this.router.navigate(['/front/search/'+(this.page-1)+'/'+this.search]);
        }else if(num == 1 && this.page < this.countPage){
            this.router.navigate(['/front/search/'+(this.page+1)+'/'+this.search]);
        }
    }

    onSearch(){
        if(this.search == ''){
            this.search = 'all';
        }
        this.router.navigate(['/front/search/1/'+this.search]);
    }

}
