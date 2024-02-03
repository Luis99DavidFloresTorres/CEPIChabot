import { TestBed } from '@angular/core/testing';


import { userGuardGuard } from './user-guard.guard';

describe('userGuardGuard', () => {
  let guard: userGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(userGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});