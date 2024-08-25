import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPrestataireComponent } from './signup-prestataire.component';

describe('SignupPrestataireComponent', () => {
  let component: SignupPrestataireComponent;
  let fixture: ComponentFixture<SignupPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPrestataireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
