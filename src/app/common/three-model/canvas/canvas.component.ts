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
  @ViewChild('canvasContainer') canvasContainer!: ElementRef;

  @ContentChildren(LightComponent) lightComponents!: QueryList<LightComponent>;
  @ContentChildren(FloorComponent) floorComponents!: QueryList<FloorComponent>;
  @ContentChildren(ModelComponent) modelComponents!: QueryList<ModelComponent>;

  scene = new THREE.Scene();

  constructor(
    private ngZone: NgZone
  ) { }

  ngAfterContentChecked(): void {
    console.log(this.modelComponents)
    // 將 scene 傳遞給子組件
    this.lightComponents?.forEach(comp => comp.scene = this.scene);
    this.floorComponents?.forEach(comp => comp.scene = this.scene);
    this.modelComponents?.forEach(comp => comp.scene = this.scene);
  }

  async ngAfterViewInit() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 啟用陰影

    this.canvasContainer.nativeElement.appendChild(renderer.domElement);

    // 調整攝像頭距離
    camera.position.z = 1;
    camera.position.y = 0.5;
    camera.rotation.x = -30 / 180 * Math.PI;



    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(this.scene, camera);
    };
    this.ngZone.runOutsideAngular(animate)

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
