import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedLattersGameComponent } from './mixed-latters-game.component';

describe('MixedLattersGameComponent', () => {
  let component: MixedLattersGameComponent;
  let fixture: ComponentFixture<MixedLattersGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedLattersGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedLattersGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
