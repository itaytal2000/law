import { Component, OnInit } from '@angular/core';
import { Fromto } from '../../Shared/fromto';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  allConvert:Fromto[];

  constructor() { }
  
  ngOnInit(): void {
    this.displayAll();
  }

  // Display all history from local storage
  displayAll(){
    this.allConvert = JSON.parse(localStorage.getItem("allConvert"));
  }
}