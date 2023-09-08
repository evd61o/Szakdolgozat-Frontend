import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalkulatorComponent } from './kalkulator.component';

describe('KalkulatorComponent', () => {
  let component: KalkulatorComponent;
  let fixture: ComponentFixture<KalkulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KalkulatorComponent]
    });
    fixture = TestBed.createComponent(KalkulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
