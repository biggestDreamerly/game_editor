import { Node } from '../Node';
import { Mesh, BufferGeometry, MeshBasicMaterial, SphereGeometry, BoxGeometry, Material, Object3D, Color } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { ObservableProperty, applyObservableProperties } from '../decorators/ObservableProperty';

export class MeshNode extends Node {
  public material: Material;
  public geometry: BufferGeometry;
  public mesh: Mesh;

  constructor(name: string, geometry?: BufferGeometry, material?: Material) {
    super(name, 0, 0); // 默认位置为 (0, 0)
    this.material = material || new MeshBasicMaterial({ color: new Color('#ffffff') });
    this.geometry = geometry || new BoxGeometry(1, 1, 1);
    this.mesh = new Mesh(this.geometry, this.material);
    this.add(this.mesh);
    // Apply proxy to this instance
    // return applyObservableProperties(this);
    console.log(this.position, 'this');
  }

  updateUI(property: string, value: any) {
    console.log(`Property ${property} updated to`, value);
  }

  setGeometry(type: 'box' | 'sphere' | 'custom', customGeometry?: BufferGeometry) {
    switch (type) {
      case 'box':
        this.geometry = new BoxGeometry(1, 1, 1);
        break;
      case 'sphere':
        this.geometry = new SphereGeometry(1, 32, 32);
        break;
      case 'custom':
        if (customGeometry) {
          this.geometry = customGeometry;
        } else {
          console.error('Custom geometry must be provided for type "custom".');
          return;
        }
        break;
      default:
        console.error('Invalid geometry type.');
        return;
    }
    this.mesh.geometry = this.geometry;
  }

  setMaterial(material: Material) {
    this.material = material;
    this.mesh.material = this.material;
  }

  async loadModel(url: string) {
    const extension = url.split('.').pop()?.toLowerCase();
    let loader: GLTFLoader | OBJLoader;

    switch (extension) {
      case 'gltf':
      case 'glb':
        loader = new GLTFLoader();
        break;
      case 'obj':
        loader = new OBJLoader();
        break;
      case 'fbx':
        loader = new FBXLoader();
        break;
      default:
        console.error('Unsupported model format.');
        return;
    }

    try {
      const model = await new Promise<Object3D>((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

      this.remove(this.mesh);
      this.mesh = model as Mesh;
      this.add(this.mesh);
    } catch (error) {
      console.error('Error loading model:', error);
    }
  }

  resetToPrimitive(type: 'box' | 'sphere') {
    this.remove(this.mesh);
    this.setGeometry(type);
    this.mesh = new Mesh(this.geometry, this.material);
    this.add(this.mesh);
  }
}