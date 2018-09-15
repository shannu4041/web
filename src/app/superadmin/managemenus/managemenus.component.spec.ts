import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemenusComponent } from './managemenus.component';

describe('ManagemenusComponent', () => {
  let component: ManagemenusComponent;
  let fixture: ComponentFixture<ManagemenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
