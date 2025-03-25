import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
 @Input() planType: string = '';
 @Input( {required: true} ) planPrice: number = 0;

 buttonClicked(valueEmitted: boolean) {
  console.log('buttonClicked', valueEmitted)
 }
}
