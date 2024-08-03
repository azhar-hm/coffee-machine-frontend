import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeOrderSelectionComponent } from './coffee-order-selection.component';

describe('CoffeeOrderSelectionComponent', () => {
  let component: CoffeeOrderSelectionComponent;
  let fixture: ComponentFixture<CoffeeOrderSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeOrderSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeOrderSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
