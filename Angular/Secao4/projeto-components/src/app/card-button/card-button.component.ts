import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-button',
  standalone: false,
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss',
})
export class CardButtonComponent {
  @Output('buttonClick') buttonClickEmitter = new EventEmitter<boolean>();

  onButtonClick() {
    this.buttonClickEmitter.emit(true);
  }
}
