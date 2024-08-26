import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPrestataireComponent } from './navbar-prestataire.component';

describe('NavbarPrestataireComponent', () => {
  let component: NavbarPrestataireComponent;
  let fixture: ComponentFixture<NavbarPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarPrestataireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
