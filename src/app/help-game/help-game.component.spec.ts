import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpGameComponent } from './help-game.component';

describe('HelpGameComponent', () => {
  let component: HelpGameComponent;
  let fixture: ComponentFixture<HelpGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
