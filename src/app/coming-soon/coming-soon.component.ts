import { Component, Inject } from '@angular/core';
import { CanvasComponent } from "app/common/three-model/canvas/canvas.component";
import { StarsComponent } from "app/common/three-model/stars/stars.component";
import { LightComponent } from "app/common/three-model/light/light.component";
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CanvasComponent, StarsComponent, LightComponent, RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
  count = 0
  countTimer?: ReturnType<typeof setInterval>

  constructor(
    @Inject(Location)
    private readonly location: Location
  ) { }

  getBackgroundSize() {
    const rate = 100 / Math.pow(2, this.count % 3)
    return `${rate}% ${rate}%`
  }

  handleBack() {
    this.location.back()
  }

  ngAfterViewInit(): void {
    this.countTimer = setInterval(() => {
      this.count++
    }, 500)
  }

  ngOnDestroy(): void {
    clearInterval(this.countTimer)
  }
}
