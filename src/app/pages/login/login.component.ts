import { Component } from '@angular/core';
import {LogoLeftBlockComponent} from "../../shared/component/main-left-block/logo-left-block/logo-left-block.component";
import {CustomSelectComponent} from "../../shared/component/custom-select/custom-select.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LogoLeftBlockComponent,
    CustomSelectComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
