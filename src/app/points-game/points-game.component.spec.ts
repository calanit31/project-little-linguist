import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsGameComponent } from './points-game.component';

describe('PointsGameComponent', () => {
  let component: PointsGameComponent;
  let fixture: ComponentFixture<PointsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
