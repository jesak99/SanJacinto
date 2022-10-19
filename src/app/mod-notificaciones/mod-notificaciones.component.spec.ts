import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModNotificacionesComponent } from './mod-notificaciones.component';

describe('ModNotificacionesComponent', () => {
  let component: ModNotificacionesComponent;
  let fixture: ComponentFixture<ModNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModNotificacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
