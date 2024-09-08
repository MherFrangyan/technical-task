import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input()
  disabled: boolean = true;
  @Output()
  clickBtn: EventEmitter<Event> = new EventEmitter<Event>();

  clickButton(ev: Event) {
    this.clickBtn.emit(ev);
  }
}
