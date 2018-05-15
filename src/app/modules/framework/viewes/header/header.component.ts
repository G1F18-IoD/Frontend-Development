import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtTokenPayload } from '../../interfaces/jwttoken';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public auth = false;

  constructor(public globalService: GlobalService, private router: Router) { }

  ngOnInit() {

  }

  public home() {
    this.router.navigate(['/home']);
  }

}
