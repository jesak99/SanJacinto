import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBienvenidoComponent } from './form-bienvenido.component';

describe('FormBienvenidoComponent', () => {
  let component: FormBienvenidoComponent;
  let fixture: ComponentFixture<FormBienvenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBienvenidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBienvenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
