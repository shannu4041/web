import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterControlPageComponent } from './master-control-page.component';

describe('MasterControlPageComponent', () => {
  let component: MasterControlPageComponent;
  let fixture: ComponentFixture<MasterControlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterControlPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
