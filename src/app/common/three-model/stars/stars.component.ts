import { Component, Input } from '@angular/core';
import * as THREE from 'three'
import { getRandomFromRange } from 'utils/math';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [],
  template: ''
})
export class StarsComponent {
  scene!: THREE.Scene
  @Input()
  count: number = 0
  @Input()
  distanceRange?: number[]

  ngAfterViewInit(): void {
    const [near = 30, far = 40] = this.distanceRange ?? []
    for (let i = 0; i < this.count; i++) {
      const geometry = new THREE.SphereGeometry(0.01, 12, 12);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      const [x, z] = [
        getRandomFromRange(near, far, false), getRandomFromRange(0, far, false)
      ].sort(() => Math.random() > 0.5 ? 1 : -1)
      const y = getRandomFromRange(1, 20)
      star.position.set(x, y, z);
      this.scene.add(star);
    }
  }
}
