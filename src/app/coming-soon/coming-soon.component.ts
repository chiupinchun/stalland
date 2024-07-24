import { Component } from '@angular/core';
import { CanvasComponent } from "app/common/three-model/canvas/canvas.component";
import { StarsComponent } from "app/common/three-model/stars/stars.component";
import { LightComponent } from "app/common/three-model/light/light.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CanvasComponent, StarsComponent, LightComponent, RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
  count = 0

  getBackgroundSize() {
    const rate = 100 / Math.pow(2, this.count % 3)
    return `${rate}% ${rate}%`
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      console.log(this.count)
      this.count++
    }, 500)
  }
}
