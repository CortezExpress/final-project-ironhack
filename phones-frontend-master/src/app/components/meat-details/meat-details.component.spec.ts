import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatDetailsComponent } from './meat-details.component';

describe('MeatDetailsComponent', () => {
  let component: MeatDetailsComponent;
  let fixture: ComponentFixture<MeatDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeatDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
