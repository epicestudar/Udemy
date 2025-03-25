import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonCancelComponent } from './card-button-cancel.component';

describe('CardButtonCancelComponent', () => {
  let component: CardButtonCancelComponent;
  let fixture: ComponentFixture<CardButtonCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardButtonCancelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardButtonCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
