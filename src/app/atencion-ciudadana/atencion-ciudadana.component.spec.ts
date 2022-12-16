import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionCiudadanaComponent } from './atencion-ciudadana.component';

describe('AtencionCiudadanaComponent', () => {
  let component: AtencionCiudadanaComponent;
  let fixture: ComponentFixture<AtencionCiudadanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionCiudadanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionCiudadanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
