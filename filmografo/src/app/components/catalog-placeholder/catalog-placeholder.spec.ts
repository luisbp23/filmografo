import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPlaceholder } from './catalog-placeholder';

describe('CatalogPlaceholder', () => {
  let component: CatalogPlaceholder;
  let fixture: ComponentFixture<CatalogPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogPlaceholder],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogPlaceholder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
