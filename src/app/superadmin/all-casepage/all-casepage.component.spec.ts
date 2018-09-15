import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCasepageComponent } from './all-casepage.component';

describe('AllCasepageComponent', () => {
  let component: AllCasepageComponent;
  let fixture: ComponentFixture<AllCasepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCasepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCasepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
