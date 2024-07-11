import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarNightComponent } from './star-night.component';

describe('StarNightComponent', () => {
  let component: StarNightComponent;
  let fixture: ComponentFixture<StarNightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarNightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
