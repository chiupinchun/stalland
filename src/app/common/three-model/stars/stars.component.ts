import { Component, Input } from '@angular/core';
import * as THREE from 'three'

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
        this.getPosition(near, far), this.getPosition(0, far)
      ].sort(() => Math.random() > 0.5 ? 1 : -1)
      const y = this.getPosition(1, 20)
      star.position.set(x, y, z);
      this.scene.add(star);
    }
  }

  getPosition(near: number, far: number) {
    const direct = Math.random() > 0.5
      ? 1
      : -1
    return (Math.random() * (far - near) + near) * direct
  }
}
