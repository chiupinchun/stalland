import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { LightComponent } from '../three-model/light/light.component';
import { FloorComponent } from '../three-model/floor/floor.component';
import { ModelComponent } from '../three-model/model/model.component';

@Component({
  selector: 'app-star-night',
  standalone: true,
  imports: [LightComponent, FloorComponent, ModelComponent],
  templateUrl: './star-night.component.html',
  styleUrls: ['./star-night.component.scss']
})
export class StarNightComponent {
  @ViewChild('canvasContainer')
  canvasContainer!: ElementRef;
  scene = new THREE.Scene()

  async ngAfterViewInit() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 啟用陰影

    this.canvasContainer.nativeElement.appendChild(renderer.domElement);

    // 調整攝像頭距離
    camera.position.z = 1
    camera.position.y = 0.5
    camera.rotation.x = -30 / 180 * Math.PI






    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta()
      renderer.render(this.scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
