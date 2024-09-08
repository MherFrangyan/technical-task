import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {LanguageComponent} from "../../shared/component/language/language.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    LanguageComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  router = inject(Router);
  currentUserToken: string = ''
  ngOnInit() {
    this.currentUserToken = localStorage.getItem('token') ?? '';
    if (this.currentUserToken) {
      this.router.navigate(['/system'])
    }
  }
}
