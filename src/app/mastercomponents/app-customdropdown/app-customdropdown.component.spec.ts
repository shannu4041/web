import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCustomdropdownComponent } from './app-customdropdown.component';

describe('AppCustomdropdownComponent', () => {
  let component: AppCustomdropdownComponent;
  let fixture: ComponentFixture<AppCustomdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCustomdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCustomdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
