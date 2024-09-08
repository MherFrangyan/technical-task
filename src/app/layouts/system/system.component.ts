import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../shared/component/navbar/navbar.component";

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent {}
