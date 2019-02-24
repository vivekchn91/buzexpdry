import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConfigComponent } from './data-config.component';

describe('DataConfigComponent', () => {
  let component: DataConfigComponent;
  let fixture: ComponentFixture<DataConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
