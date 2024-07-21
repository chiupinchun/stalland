import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three'

@Component({
  selector: 'app-light',
  standalone: true,
  imports: [],
  template: ''
})
export class LightComponent {
  scene!: THREE.Scene

  ngAfterViewInit(): void {
    // 環境光
    const ambientLight = new THREE.AmbientLight(0xffffff, Math.PI / 2);
    this.scene.add(ambientLight);

    // 聚光燈
    const spotLight = new THREE.SpotLight(0xffffff, Math.PI);
    spotLight.position.set(10, 10, 10);
    spotLight.angle = 0.15;
    spotLight.penumbra = 1;
    spotLight.decay = 0;
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    // 點光源
    const pointLight = new THREE.PointLight(0xffffff, Math.PI, 0, 0);
    pointLight.position.set(-10, -10, -10);
    pointLight.castShadow = true;
    this.scene.add(pointLight)
  }
}
