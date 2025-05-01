import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  formGroup !:FormGroup;
  constructor(private form: FormBuilder) {}
  ngOnInit(): void {

    this.formGroup = this.form.group({
      email: ['', Validators.required, Validators.email],
      name: ['', Validators.required],
      description: ['']
    })
  }
  submit() {}
}
