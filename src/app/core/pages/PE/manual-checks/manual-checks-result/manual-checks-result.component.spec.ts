import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualChecksResultComponent } from './manual-checks-result.component';

describe('ManualChecksResultComponent', () => {
  let component: ManualChecksResultComponent;
  let fixture: ComponentFixture<ManualChecksResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualChecksResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualChecksResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
