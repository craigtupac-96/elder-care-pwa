import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // private title: string;
  title = 'Elder-Care';

  constructor() { }

  ngOnInit() {
    // this.title = 'Elder-Care';
  }

}
