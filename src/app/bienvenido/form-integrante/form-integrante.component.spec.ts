import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIntegranteComponent } from './form-integrante.component';

describe('FormIntegranteComponent', () => {
  let component: FormIntegranteComponent;
  let fixture: ComponentFixture<FormIntegranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIntegranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
