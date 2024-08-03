import { TestBed } from '@angular/core/testing';

import { CoffeeDetailsService } from './coffee-details.service';

describe('CoffeeDetailsService', () => {
  let service: CoffeeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
