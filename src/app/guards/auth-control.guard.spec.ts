import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authControlGuard } from './auth-control.guard';

describe('authControlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authControlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
