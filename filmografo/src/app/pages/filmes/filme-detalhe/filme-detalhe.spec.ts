import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeDetalhe } from './filme-detalhe';

describe('FilmeDetalhe', () => {
  let component: FilmeDetalhe;
  let fixture: ComponentFixture<FilmeDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmeDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmeDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
