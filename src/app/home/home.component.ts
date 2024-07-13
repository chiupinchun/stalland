import { Component } from '@angular/core';
import { CanvasComponent } from "@app/common/three-model/canvas/canvas.component";
import { LightComponent } from "@app/common/three-model/light/light.component";
import { FloorComponent } from "@app/common/three-model/floor/floor.component";
import { ModelComponent } from "@app/common/three-model/model/model.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CanvasComponent, LightComponent, FloorComponent, ModelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
