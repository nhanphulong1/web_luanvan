import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../login/login.component';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CommentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    comment = '';

    ngOnInit(): void {
    }

    onSubmit(){
        let data = {
            status: 1,
            comment: this.comment
        }
        this.dialogRef.close(data);
    }

}
