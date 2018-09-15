import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterusersComponent } from './masterusers.component';

describe('MasterusersComponent', () => {
  let component: MasterusersComponent;
  let fixture: ComponentFixture<MasterusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
