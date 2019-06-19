import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tasks2Component } from './tasks2.component';

describe('Tasks2Component', () => {
  let component: Tasks2Component;
  let fixture: ComponentFixture<Tasks2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tasks2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tasks2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
