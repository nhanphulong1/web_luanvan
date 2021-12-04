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
        private route: Router
    ) { }

    data;

    ngOnInit(): void {
        this.news.getAllNews().subscribe((result)=>{
            this.data = result.data;
        })
    }




}
