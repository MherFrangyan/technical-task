import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

interface Country {
  name: string;
  code: number;
}
@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
  countries: Country[] = [
    { name: 'Armenia', code: 374 },
    { name: 'Andorra', code: 376 },
    { name: 'Antigua & Barbuda', code: 1268 },
    { name: 'Anguilla', code: 1264 },
    { name: 'Albania', code: 355 },
    { name: 'Angola', code: 244 },
    // Add more countries as needed
  ];
  selectedCountry: Country = this.countries[0];
  phoneNumber: string = '';
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.dropdownOpen = false;
  }
}
