import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiqueDeConfidentialiteComponent } from './politique-de-confidentialite.component';

describe('PolitiqueDeConfidentialiteComponent', () => {
  let component: PolitiqueDeConfidentialiteComponent;
  let fixture: ComponentFixture<PolitiqueDeConfidentialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolitiqueDeConfidentialiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolitiqueDeConfidentialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
