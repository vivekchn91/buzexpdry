import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePackingComponent } from './circle-packing.component';

describe('CirclePackingComponent', () => {
  let component: CirclePackingComponent;
  let fixture: ComponentFixture<CirclePackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclePackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
