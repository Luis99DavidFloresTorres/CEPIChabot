import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujosComponent } from './flujos.component';

describe('FlujosComponent', () => {
  let component: FlujosComponent;
  let fixture: ComponentFixture<FlujosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlujosComponent]
    });
    fixture = TestBed.createComponent(FlujosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
