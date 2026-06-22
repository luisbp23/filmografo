import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieDetalhe } from './serie-detalhe';

describe('SerieDetalhe', () => {
  let component: SerieDetalhe;
  let fixture: ComponentFixture<SerieDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(SerieDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
