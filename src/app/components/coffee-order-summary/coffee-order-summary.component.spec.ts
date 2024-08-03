import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeOrderSummaryComponent } from './coffee-order-summary.component';

describe('CoffeeOrderSummaryComponent', () => {
  let component: CoffeeOrderSummaryComponent;
  let fixture: ComponentFixture<CoffeeOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeOrderSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
