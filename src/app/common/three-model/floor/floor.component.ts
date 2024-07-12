import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three'

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [],
  template: ''
})
export class FloorComponent implements OnInit {
  @Input()
  scene!: THREE.Scene

  ngOnInit(): void {
    // 添加地板
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.8, metalness: 0.2 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // 使地板水平
    floor.position.y = -1; // 使地板在模型下方
    floor.receiveShadow = true;
    this.scene.add(floor);
  }
}
