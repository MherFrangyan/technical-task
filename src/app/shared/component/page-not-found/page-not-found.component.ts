import { Component } from '@angular/core';
import {LogoLeftBlockComponent} from "../main-left-block/logo-left-block/logo-left-block.component";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    LogoLeftBlockComponent
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
