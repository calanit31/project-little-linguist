import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGameComponent } from './dialog-game.component';

describe('DialogGameComponent', () => {
  let component: DialogGameComponent;
  let fixture: ComponentFixture<DialogGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
