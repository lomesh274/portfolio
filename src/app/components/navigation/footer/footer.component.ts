import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
  redirect( type:any){
    const doc = document.getElementById(type)
    doc?.scrollIntoView()
   }
}
