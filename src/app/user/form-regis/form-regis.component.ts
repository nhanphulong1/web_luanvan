import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-regis',
  templateUrl: './form-regis.component.html',
  styleUrls: ['./form-regis.component.scss']
})
export class FormRegisComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  public formRegis = this.fb.group({
    res_email: ['', [Validators.required, Validators.email]],
    res_name: ['', Validators.required],
    res_type: ['B1', Validators.required],
    res_phone: ['', [Validators.required,Validators.pattern("^[0][0-9]{9}")]],
  });

  ngOnInit(): void {
  }

}
