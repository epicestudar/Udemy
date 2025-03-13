import { NgModule } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardButtonComponent } from '../card-button/card-button.component';
import { CardRoxoComponent } from '../card-roxo/card-roxo.component';
import { CommonModule } from '@angular/common';
import { CardRoxoButtonComponent } from '../card-roxo-button/card-roxo-button.component';



@NgModule({
  declarations: [
    CardComponent,
    CardButtonComponent,
    CardRoxoComponent,
    CardRoxoButtonComponent,
  ],
  imports: [CommonModule],
  exports: [
    CardComponent,
    // CardButtonComponent,
    CardRoxoComponent,
    // CardRoxoButtonComponent,
  ],
})
export class CardsModule {}
