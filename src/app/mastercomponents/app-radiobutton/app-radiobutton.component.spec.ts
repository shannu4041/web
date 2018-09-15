import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRadioComponent } from './app-radiobutton.component';

describe('AppRadioComponent', () => {
  let component: AppRadioComponent;
  let fixture: ComponentFixture<AppRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
