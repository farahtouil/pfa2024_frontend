import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResAcceptComponent } from './res-accept.component';

describe('ResAcceptComponent', () => {
  let component: ResAcceptComponent;
  let fixture: ComponentFixture<ResAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResAcceptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
