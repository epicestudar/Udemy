import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoxoComponent } from './card-roxo.component';

describe('CardRoxoComponent', () => {
  let component: CardRoxoComponent;
  let fixture: ComponentFixture<CardRoxoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRoxoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRoxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
