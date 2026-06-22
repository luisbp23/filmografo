import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaDetalhe } from './pessoa-detalhe';

describe('PessoaDetalhe', () => {
  let component: PessoaDetalhe;
  let fixture: ComponentFixture<PessoaDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(PessoaDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
