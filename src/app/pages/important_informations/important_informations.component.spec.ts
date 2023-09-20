import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantInformationsComponent } from './important-informations.component';

describe('ImportantInformationsComponent', () => {
  let component: ImportantInformationsComponent;
  let fixture: ComponentFixture<ImportantInformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportantInformationsComponent]
    });
    fixture = TestBed.createComponent(ImportantInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
