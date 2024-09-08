import {Component, OnInit} from '@angular/core';
import { LogoLeftBlockComponent } from "../logo-left-block/logo-left-block.component";
import { TranslateModule} from "@ngx-translate/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    LogoLeftBlockComponent,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit{
  isLogged: boolean = false;
  ngOnInit() {
    this.isLogged = !!localStorage.getItem('token')
  }

}
