import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  isEditMode = false;
  
  constructor() {}

  saveProject(): void {
    console.log('Save project');
  }

  cancel(): void {
    console.log('Cancel');
  }
}
