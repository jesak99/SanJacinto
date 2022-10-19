import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaginaComponent } from './form-pagina.component';

describe('FormPaginaComponent', () => {
  let component: FormPaginaComponent;
  let fixture: ComponentFixture<FormPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
