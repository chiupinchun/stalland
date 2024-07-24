import { Component, Input, NgZone, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { degToRadian, getRotationByOffset } from 'utils/math';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [],
  template: ''
})
export class ModelComponent {
  scene!: THREE.Scene
  @Input()
  src!: string
  @Input()
  position?: [number, number]
  @Input()
  keepRotation?: number

  constructor(
    private ngZone: NgZone
  ) { }

  async ngAfterViewInit() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(this.src);

    if (this.position) {
      const [x, z] = this.position
      gltf.scene.position.set(x, 0, z)
    }

    gltf.scene.traverse((node: any) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });

    let mixer: THREE.AnimationMixer | null = null
    if (gltf.animations?.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    }

    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta()

      if (mixer) { mixer.update(delta) }

      if (this.position) {
        const [currentX, _, currentZ] = gltf.scene.position
        const [goalX, goalZ] = this.position
        const [deltaX, deltaZ] = [goalX - currentX, goalZ - currentZ]
        // setting rotation breaks performance, so rotate only when neccessary!
        if (deltaX !== 0 || deltaZ !== 0) {
          gltf.scene.rotation.y = this.keepRotation ?? getRotationByOffset(deltaX, deltaZ)
        }
        gltf.scene.position.set(
          currentX + (deltaX) * delta,
          0,
          currentZ + (deltaZ) * delta
        )
      }
    }
    this.ngZone.runOutsideAngular(animate)

    this.scene.add(gltf.scene);
  }
}
