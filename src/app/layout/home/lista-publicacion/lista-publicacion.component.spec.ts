import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPublicacionComponent } from './lista-publicacion.component';

describe('ListaPublicacionComponent', () => {
  let component: ListaPublicacionComponent;
  let fixture: ComponentFixture<ListaPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
