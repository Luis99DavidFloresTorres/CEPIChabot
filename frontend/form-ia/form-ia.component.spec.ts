import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIAComponent } from './form-ia.component';

describe('FormIAComponent', () => {
  let component: FormIAComponent;
  let fixture: ComponentFixture<FormIAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormIAComponent]
    });
    fixture = TestBed.createComponent(FormIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
