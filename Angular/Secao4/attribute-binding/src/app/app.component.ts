import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  buttonTitle = 'Título do Botão';

  buttonDisable = false;

  onButtonClick() {
    this.buttonTitle = 'Título alterado';
    this.buttonDisable = !this.buttonDisable;
  }
}
