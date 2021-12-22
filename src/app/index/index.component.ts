import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServeHttpService } from '../Services/serve-http.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { CourseService } from '../Services/course.service';
import { NewsService } from '../Services/news.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(
        private news: NewsService,
        private course: CourseService,
        private router: Router
    ) { }

    data=[];
    dataCourse;
    search = '';

    ngOnInit(): void {
        this.news.getAllNews().subscribe((result)=>{
            if(result.data.length > 3){
                for (let index = 0; index < 3; index++) {
                    this.data.push(result.data[index]);
                }
            }else{
                this.data=result.data;
            }
        });
        this.course.getAllCourse().subscribe((kq)=>{
            this.dataCourse = kq.data;
        });
    }

    onSearch(){
        if(this.search == ''){
            this.search = 'all';
        }
        this.router.navigate(['/front/search/1/'+this.search]);
    }


}
