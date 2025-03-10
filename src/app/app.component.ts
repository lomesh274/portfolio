import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model:any = {};
  title = 'generate-16-project';
  loginList:any =[]
  submit(form:any){
    if(form.valid){
      let loginListData:any = localStorage.getItem('loginData')
      this.loginList = JSON.parse(loginListData);
      console.log(form,this.model)
      // this.loginList.push(this.model)
      localStorage.setItem('loginData',JSON.stringify(this.loginList))
      form.resetForm()
    }
  }
}
