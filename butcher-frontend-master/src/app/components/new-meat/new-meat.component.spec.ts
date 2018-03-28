import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeatComponent } from './new-meat.component';

describe('NewMeatComponent', () => {
  let component: NewMeatComponent;
  let fixture: ComponentFixture<NewMeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
