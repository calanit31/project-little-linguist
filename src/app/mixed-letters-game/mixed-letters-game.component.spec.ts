import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedLettersGameComponent } from './mixed-letters-game.component';

describe('MixedLettersGameComponent', () => {
  let component: MixedLettersGameComponent;
  let fixture: ComponentFixture<MixedLettersGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedLettersGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedLettersGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
