import { Component, Inject, SimpleChanges } from '@angular/core';
import { CanvasComponent } from "@app/common/three-model/canvas/canvas.component";
import { LightComponent } from "@app/common/three-model/light/light.component";
import { FloorComponent } from "@app/common/three-model/floor/floor.component";
import { ModelComponent } from "@app/common/three-model/model/model.component";
import { StarsComponent } from "../common/three-model/stars/stars.component";
import { AvatarComponent } from "../common/avatar/avatar.component";
import { MOVE_STEP_LENGTH, RANDOM_MOVE_PERIOD } from '@constants/spirit-model';
import { getRandomFromRange } from 'utils/math';
import { Spirit, spirits } from 'config/spirit';
import { AvatarListComponent } from "./avatar-list/avatar-list.component";
import { DialogComponent } from "./dialog/dialog.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CanvasComponent, LightComponent, FloorComponent, ModelComponent, StarsComponent, AvatarComponent, AvatarListComponent, DialogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  spirits = spirits.map(spirit => ({
    ...spirit,
    position: [
      getRandomFromRange(0, 2, false),
      -getRandomFromRange(0, 2)
    ] as [number, number],
    options: [
      { text: '使用服務', onSelect: () => { } },
      { text: '接受試煉', onSelect: () => { } },
    ]
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

  handleSpeak(spiritKey: Spirit['key']) {
    const spirit = this.spirits.find(spirit => spirit.key === spiritKey)
    if (!spirit) { return }

    const [x, z] = spirit.position
    this.cameraPosition = [x, z + 0.5]
    this.speakingSpirit = spirit
  }
}
