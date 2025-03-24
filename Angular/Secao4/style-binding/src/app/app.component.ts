import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  widthButton1 = '110px';
  widthButton2 = 130;
  stylesObj = { width: '160px', backgroundColor: 'grey' };

  updateStyleObj() {
    console.log('updateStyleObj');

    this.stylesObj.width = '170px';
    this.stylesObj.backgroundColor = 'lightblue';
  }

  updateStyleObjCorrect() {
    console.log('updateStyleObjCorrect');

    this.stylesObj = { width: '170px', backgroundColor: 'lightblue' };
  }

  updateWidth() {
    this.widthButton2 = 200;
  }
}
