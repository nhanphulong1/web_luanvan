import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewsComponent } from 'src/app/form/news/news.component';
import { NewsService } from 'src/app/Services/news.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-news',
    templateUrl: './list-news.component.html',
    styleUrls: ['./list-news.component.scss']
})
export class ListNewsComponent implements OnInit {

    constructor(
        private news: NewsService,
        private dialog: MatDialog,
    ) { }

    data;
    displayedColumns: string[] = ['id', 'n_title', 'created_at', 'n_status', 'action'];
    dataSource = new MatTableDataSource();

    ngOnInit(): void {
        this.news.getAllNews().subscribe((result) => {
            this.data = result.data;
            this.dataSource = new MatTableDataSource(this.data);
        })
    }

    loadTable(){
        this.news.getAllNews().subscribe((result) => {
            this.data = result.data;
            this.dataSource = new MatTableDataSource(this.data);
        })
    }

    createNews() {
        const dialogRef = this.dialog.open(NewsComponent, {
            width: '850px',
        });

        dialogRef.afterClosed().subscribe((result)=>{
            this.loadTable();
        })
    }

    updateNews(id){
        const dialogRef = this.dialog.open(NewsComponent, {
            width: '850px',
            data: {n_id: id}
        });

        dialogRef.afterClosed().subscribe((result)=>{
            this.loadTable();
        })
    }

    deleteNews(id){
        Swal.fire({
            title: 'Xóa tin tức?',
            text: "Bạn có muốn xóa tin tức này!",
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#9A948',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xóa'
          }).then((result) => {
            if (result.isConfirmed) {
              this.news.deleteNews(id).subscribe((result) => {
                if (result.status == 1) {
                  Swal.fire(
                    'Thành công!',
                    'Xóa tin tức thành công!',
                    'success'
                  );
                  this.loadTable();
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!!!',
                    text: 'Xóa tin tức thất bại.',
                  })
                }
              })
            }
          })
    }

}
