import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [],
  template: ''
})
export class ModelComponent implements OnInit {
  @Input()
  scene!: THREE.Scene
  @Input()
  src!: string

  async ngOnInit() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(this.src);

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
    }
    animate();

    this.scene.add(gltf.scene);
  }
}
