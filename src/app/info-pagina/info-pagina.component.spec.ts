import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPaginaComponent } from './info-pagina.component';

describe('InfoPaginaComponent', () => {
  let component: InfoPaginaComponent;
  let fixture: ComponentFixture<InfoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
