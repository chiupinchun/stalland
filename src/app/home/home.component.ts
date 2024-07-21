import { Component, Inject, SimpleChanges } from '@angular/core';
import { CanvasComponent } from "@app/common/three-model/canvas/canvas.component";
import { LightComponent } from "@app/common/three-model/light/light.component";
import { FloorComponent } from "@app/common/three-model/floor/floor.component";
import { ModelComponent } from "@app/common/three-model/model/model.component";
import { StarsComponent } from "../common/three-model/stars/stars.component";
import { AvatarComponent } from "../common/avatar/avatar.component";
import { MOVE_STEP_LENGTH, RANDOM_MOVE_PERIOD } from '@constants/spirit-model';
import { getRandomFromRange } from 'utils/math';
import { spirits } from 'config/spirit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CanvasComponent, LightComponent, FloorComponent, ModelComponent, StarsComponent, AvatarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  spirits = spirits.map(spirit => ({
    key: spirit.key,
    position: [
      getRandomFromRange(0, 2, false),
      -getRandomFromRange(0, 2)
    ] as [number, number]
  }))
  speakingSpirit?: typeof this.spirits[number]

  cameraPosition: [number, number] = [0, 2]

  constructor() { }

  ngOnInit(): void {
    const randomMove = (spirit: typeof this.spirits[number]) => {
      setTimeout(() => {
        randomMove(spirit)
      }, getRandomFromRange(...RANDOM_MOVE_PERIOD))

      if (this.speakingSpirit === spirit) { return }

      const [rawX, rawZ] = spirit.position
      spirit.position = [
        rawX + getRandomFromRange(...MOVE_STEP_LENGTH, false),
        rawZ + getRandomFromRange(...MOVE_STEP_LENGTH, false)
      ]
    }

    this.spirits.forEach(randomMove)
  }

  speakTo(spirit: typeof this.spirits[number]) {
    const [x, z] = spirit.position
    this.cameraPosition = [x, z + 0.5]
    this.speakingSpirit = spirit
  }
}
