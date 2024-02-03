import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTablaRecomendarComponent } from './formulario-tabla-recomendar.component';

describe('FormularioTablaRecomendarComponent', () => {
  let component: FormularioTablaRecomendarComponent;
  let fixture: ComponentFixture<FormularioTablaRecomendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioTablaRecomendarComponent]
    });
    fixture = TestBed.createComponent(FormularioTablaRecomendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
