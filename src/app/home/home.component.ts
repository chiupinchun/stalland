import { Component, Inject, SimpleChanges } from '@angular/core';
import { CanvasComponent } from "@app/common/three-model/canvas/canvas.component";
import { LightComponent } from "@app/common/three-model/light/light.component";
import { FloorComponent } from "@app/common/three-model/floor/floor.component";
import { ModelComponent } from "@app/common/three-model/model/model.component";
import { StarsComponent } from "../common/three-model/stars/stars.component";
import { AvatarComponent } from "../common/avatar/avatar.component";
import { MOVE_STEP_LENGTH, RANDOM_MOVE_PERIOD } from '@constants/spirit-model';
import { getRandomFromRange } from 'utils/math';

interface Spirit {
  key: string
  position: [number, number]
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CanvasComponent, LightComponent, FloorComponent, ModelComponent, StarsComponent, AvatarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  spirits: Spirit[] = [
    {
      key: 'cat',
      position: [1, 0]
    },
    {
      key: 'chikun',
      position: [-1, -1]
    },
    {
      key: 'dog',
      position: [1, -1]
    },
    {
      key: 'fish',
      position: [-1, 0]
    },
    {
      key: 'prairie-dog',
      position: [0, 0]
    },
    {
      key: 'snake',
      position: [0, -1]
    },
  ]
  speakingSpirit?: Spirit

  cameraPosition: [number, number] = [0, 2]

  constructor() { }

  ngOnInit(): void {
    const randomMove = (spirit: Spirit) => {
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

  speakTo(spirit: Spirit) {
    const [x, z] = spirit.position
    this.cameraPosition = [x, z + 0.5]
    this.speakingSpirit = spirit
  }
}
