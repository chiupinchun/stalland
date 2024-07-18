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

  @ContentChildren(LightComponent) lightComponents!: QueryList<LightComponent>;
  @ContentChildren(FloorComponent) floorComponents!: QueryList<FloorComponent>;
  @ContentChildren(ModelComponent) modelComponents!: QueryList<ModelComponent>;

  scene = new THREE.Scene();

  constructor(
    private ngZone: NgZone
  ) { }

  ngAfterContentChecked(): void {
    // 將 scene 傳遞給子組件
    this.needSceneElements?.forEach(comp => comp.scene = this.scene)
    // this.lightComponents?.forEach(comp => comp.scene = this.scene);
    // this.floorComponents?.forEach(comp => comp.scene = this.scene);
    // this.modelComponents?.forEach(comp => comp.scene = this.scene);
  }

  async ngAfterViewInit() {
    const containerEl = this.canvasContainer.nativeElement
    const camera = new THREE.PerspectiveCamera(75, containerEl.clientWidth / containerEl.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
    renderer.shadowMap.enabled = true; // 啟用陰影

    containerEl.appendChild(renderer.domElement);

    // 調整攝像頭距離
    camera.position.z = 0.8;
    camera.position.y = 0.5;
    camera.rotation.x = -15 / 180 * Math.PI;



    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(this.scene, camera);
    };
    this.ngZone.runOutsideAngular(animate)

    window.addEventListener('resize', () => {
      camera.aspect = containerEl.clientWidth / containerEl.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
    });
  }
}
