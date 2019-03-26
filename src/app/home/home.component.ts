import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // private title: string;
  title = 'Dashboard';

  constructor(public auth: AuthService) { }

  ngOnInit() {
    // this.
  }

}
