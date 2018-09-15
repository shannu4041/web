import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalSettingsComponent } from './technical-settings.component';

describe('TechnicalSettingsComponent', () => {
  let component: TechnicalSettingsComponent;
  let fixture: ComponentFixture<TechnicalSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
