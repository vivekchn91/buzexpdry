import { TestBed, inject } from '@angular/core/testing';

import { MathOpsService } from './math-ops.service';

describe('MathOpsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MathOpsService]
    });
  });

  it('should be created', inject([MathOpsService], (service: MathOpsService) => {
    expect(service).toBeTruthy();
  }));
});
