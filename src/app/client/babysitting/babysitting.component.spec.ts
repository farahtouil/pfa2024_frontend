import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysittingComponent } from './babysitting.component';

describe('BabysittingComponent', () => {
  let component: BabysittingComponent;
  let fixture: ComponentFixture<BabysittingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BabysittingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BabysittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
