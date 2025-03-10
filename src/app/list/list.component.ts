import { Component } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  params:any = {
    limit:10
  }
  loginData:any = []
  constructor(private homeService: HomeService){
    this.fetchProductList('')
    window.addEventListener('scroll', ()=>{
      // window.innerHeight + window.innerHeight >= document.documentElement.offsetHeight
      console.log(window.innerHeight + window.scrollY >= document.documentElement.offsetHeight)
      console.log(document.documentElement.scrollTop,window.scrollY,window.innerHeight, document.documentElement.offsetHeight)
    })
    let loginListData:any = localStorage.getItem('loginData')
    this.loginData = JSON.parse(loginListData)
  }


  fetchProductList(type:any){
    this.homeService.fetchList(this.params).subscribe((el:any)=>{
      console.log(el)
      this.loginData = el
    })
  }
editBtn(type:any, data:any,index:any){
  type == 'edit' ? data.isEdit = true :data.isEdit = false;

}
}
