import { Raycaster, Vector2, Camera, Scene as ThreeScene, Object3D, EventDispatcher } from 'three';

export class SelectionSystem extends EventDispatcher {
  private raycaster: Raycaster;
  private mouse: Vector2;
  private camera: Camera;
  private scene: ThreeScene;
  static selectStore: Map<string, string> = new Map();

  constructor(camera: Camera, scene: ThreeScene) {
    super();
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.camera = camera;
    this.scene = scene;

    window.addEventListener('click', this.onClick.bind(this));
  }

  private onClick(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(this.scene, 'this.scene')
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    console.log(intersects, 'intersects')
    if (intersects.length > 0) {
      //  && SelectionSystem.selectStore.has(intersects[0].object.uuid)
      // const selectedObject = intersects[0].object;
      // this.dispatchEvent({ type: 'select', object: selectedObject });
    }
  }
}