import { Raycaster, Vector2, Camera, Scene as ThreeScene, Object3D, EventDispatcher } from 'three';
import { Node } from '../Node'
export class SelectionSystem extends EventDispatcher {
  private raycaster: Raycaster;
  private mouse: Vector2;
  private camera: Camera;
  private scene: ThreeScene;
  public container: HTMLElement
  static selectStore: Map<string, Node> = new Map();

  constructor(camera: Camera, scene: ThreeScene, container: HTMLElement) {
    super();
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.camera = camera;
    this.scene = scene;
    this.container = container

    window.addEventListener('click', this.onClick.bind(this));
  }

  private onClick(event: MouseEvent) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    console.log(this.scene, 'this.scene')
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children[2].children, true);
    // console.log(intersects, 'intersects')
    if (intersects.length > 0) {
      console.log(intersects)
      console.log(SelectionSystem.selectStore)
      const selectedObject = intersects[0].object;
      this.dispatchEvent({ type: 'select', object: selectedObject })
    }
  }
}