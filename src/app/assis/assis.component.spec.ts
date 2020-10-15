import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssisComponent } from './assis.component';

describe('AssisComponent', () => {
  let component: AssisComponent;
  let fixture: ComponentFixture<AssisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
