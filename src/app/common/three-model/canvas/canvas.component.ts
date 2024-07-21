import { Component, ElementRef, ViewChild, AfterViewInit, ContentChildren, QueryList, Input, SimpleChanges, NgZone } from '@angular/core';
import * as THREE from 'three';
import { LightComponent } from '../light/light.component';
import { FloorComponent } from '../floor/floor.component';
import { ModelComponent } from '../model/model.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [LightComponent, FloorComponent, ModelComponent],
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent {
  @ViewChild('canvasContainer') canvasContainer!: ElementRef<HTMLDivElement>;

  @ContentChildren('scene') needSceneElements!: QueryList<any>

  scene = new THREE.Scene();

  @Input()
  cameraPosition: [number, number] = [0, 0.8]
  camera!: THREE.PerspectiveCamera

  constructor(
    private ngZone: NgZone
  ) { }

  ngAfterContentChecked(): void {
    this.needSceneElements?.forEach(comp => comp.scene = this.scene)
  }

  async ngAfterViewInit() {
    const containerEl = this.canvasContainer.nativeElement
    this.camera = new THREE.PerspectiveCamera(75, containerEl.clientWidth / containerEl.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
    renderer.shadowMap.enabled = true; // 啟用陰影

    containerEl.appendChild(renderer.domElement);

    // 調整攝像頭距離
    this.camera.position.x = this.cameraPosition[0]
    this.camera.position.z = this.cameraPosition[1];
    this.camera.position.y = 0.3;
    this.camera.rotation.x = -25 / 180 * Math.PI;

    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta()
      this.moveCamera(delta * 5)

      renderer.render(this.scene, this.camera);
    };
    this.ngZone.runOutsideAngular(animate)

    window.addEventListener('resize', () => {
      this.camera.aspect = containerEl.clientWidth / containerEl.clientHeight;
      this.camera.updateProjectionMatrix();
      renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
    });
  }

  moveCamera(delta: number): void {
    if (!this.camera) { return }

    const [goalX, goalZ] = this.cameraPosition
    const [currentX, _, currentZ] = this.camera.position

    this.camera.position.set(
      Math.abs(goalX - currentX) > delta
        ? currentX + (goalX - currentX) * delta
        : goalX,
      this.camera.position.y,
      Math.abs(goalZ - currentZ) > delta
        ? currentZ + (goalZ - currentZ) * delta
        : goalZ
    )
  }
}
