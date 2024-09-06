import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoaderComponent} from "../shared/component/loader/loader.component";
import {LoaderService} from "../shared/service/loader.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loaderService = inject(LoaderService)
  title = 'technical-task';
}
