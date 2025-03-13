import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoxoButtonComponent } from './card-roxo-button.component';

describe('CardRoxoButtonComponent', () => {
  let component: CardRoxoButtonComponent;
  let fixture: ComponentFixture<CardRoxoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRoxoButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRoxoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
