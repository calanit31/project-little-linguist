import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOrFailureDialogComponent } from './success-or-failure-dialog.component';

describe('SuccessOrFailureDialogComponent', () => {
  let component: SuccessOrFailureDialogComponent;
  let fixture: ComponentFixture<SuccessOrFailureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessOrFailureDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessOrFailureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
