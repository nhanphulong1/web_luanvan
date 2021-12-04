import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsService } from 'src/app/Services/news.service';
import { DialogData } from 'src/app/user/login/login.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private news: NewsService,
        public dialogRef: MatDialogRef<NewsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    formNews = this.fb.group({
        n_title: ['', Validators.required],
        n_summary: ['', Validators.required],
        n_image: ['', Validators.required],
        n_content: ['', Validators.required],
        n_status: [0]
    });
    update = false;
    dataNews;
    url_image = "../../../assets/image/default-image.jpg";
    checkImage =false;

    ngOnInit(): void {
        if(this.data['n_id']){
            this.news.getNewsById(this.data['n_id']).subscribe((result)=>{
                if(result.data.length > 0){
                    this.update = true;
                    this.dataNews = result.data[0];
                    this.setValue();
                }
            })
        }
    }

    onSelectFile(e) {
		let file = e.target.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = this.handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
	}

	handleReaderLoaded(e) {
		this.url_image = ('data:image/png;base64,' + btoa(e.target.result));
		this.formNews.controls['n_image'].setValue(this.url_image);
	}

    setValue() {
        this.formNews.controls['n_title'].setValue(this.dataNews.n_title);
        this.formNews.controls['n_summary'].setValue(this.dataNews.n_summary);
        this.formNews.controls['n_image'].setValue(this.dataNews.n_image);
        this.url_image = this.dataNews.n_image;
        this.formNews.controls['n_content'].setValue(this.dataNews.n_content);
        this.formNews.controls['n_status'].setValue(this.dataNews.n_status);
    }

    onSubmit() {
        this.checkImage= true;
        if(this.update){
            this.updateNews();
        }else{
            this.createNews();
        }
    }

    async createNews(){
        if(this.formNews.valid){
            let kq = await this.news.createNews(this.formNews.value).toPromise();
            if(kq.status == 1){
                Swal.fire({
                    text: 'Thêm tin tức mới thành công!',
                    icon:'success',
                    timer: 2000
                }).then(()=>{
                    this.onNoClick();
                })
            }else{
                Swal.fire({
                    icon:"error",
                    text:"Có lỗi xảy ra trong quá trình thêm!",
                    timer: 2000
                }).then(()=>{
                    this.onNoClick();
                })
            }
        }
    }

    async updateNews(){
        if(this.formNews.valid){
            let kq = await this.news.updateNews(this.data['n_id'],this.formNews.value).toPromise();
            if(kq.status == 1){
                Swal.fire({
                    text: 'Cập nhật tin tức mới thành công!',
                    icon:'success',
                    timer: 2000
                }).then(()=>{
                    this.onNoClick();
                })
            }else{
                Swal.fire({
                    icon:"error",
                    text:"Có lỗi xảy ra trong quá trình thêm!",
                    timer: 2000
                }).then(()=>{
                    this.onNoClick();
                })
            }
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
