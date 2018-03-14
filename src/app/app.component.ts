import { Component, OnInit } from '@angular/core';
//import { FrameworkModule. } from './modules/framework/framework.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    localStorage.setItem('title', JSON.stringify({ title: "localStorageWorks" }));
    this.title = JSON.parse(localStorage.getItem('title'))['title'];
  }
}
