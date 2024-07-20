import { Component } from '@angular/core';
import { CanvasComponent } from "@app/common/three-model/canvas/canvas.component";
import { LightComponent } from "@app/common/three-model/light/light.component";
import { FloorComponent } from "@app/common/three-model/floor/floor.component";
import { ModelComponent } from "@app/common/three-model/model/model.component";
import { StarsComponent } from "../common/three-model/stars/stars.component";
import { AvatarComponent } from "../common/avatar/avatar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CanvasComponent, LightComponent, FloorComponent, ModelComponent, StarsComponent, AvatarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  position: [number, number] = [0, 0]
  pushModel() {
    const [x, z] = this.position
    this.position = [x + 0.1, z + 0.1]
  }
}
