import { Object3D, Mesh, BufferGeometry, Material, Vector3, Euler } from 'three';
import { ObservableProperty, applyObservableProperties } from './decorators/ObservableProperty';

abstract class AbstractNode {
  protected children: Node[] = [];
  protected parent: Node | null = null;
  protected script: any = null;
  protected signals: { [key: string]: Signal } = {};

  abstract add_child(child: Node): void;
  abstract remove_child(child: Node): void;
  abstract get_parent(): Node | null;
  abstract load_script(script: any): void;
  abstract update(delta: number): void;
  abstract add_signal(name: string): void;
  abstract connect_signal(name: string, listener: Function): void;
  abstract emit_signal(name: string, ...args: any[]): void;
}

class Signal extends Object3D {
  private listeners: Function[] = [];

  connect(listener: Function) {
    this.listeners.push(listener);
  }

  emit(...args: any[]) {
    for (const listener of this.listeners) {
      listener(...args);
    }
  }
}

export class Node extends Signal {
  public script: any = null;
  public name: string = '';
  public mesh: Mesh = new Mesh();
  public node_children: Node[] = [];
  protected parent: Node | null = null;
  protected signals: { [key: string]: Signal } = {};

  constructor(name: string) {
    super();
  }

  setGeometry(geometry: BufferGeometry) {
    this.mesh.geometry = geometry;
  }

  setMaterial(material: Material) {
    alert(1);
    // this.mesh.material = material;
  }

  add_child(child: Node) {
    this.add(child);
    this.node_children.push(child);
    console.log(this, 'this');
  }

  remove_child(child: Node) {
    this.remove(child); // Remove Object3D from the parent
    this.node_children.splice(this.node_children.indexOf(child), 1);
  }

  get_parent(): Node | null {
    return this.parent;
  }

  load_script(script: any) {
    this.script = script;
    if (this.script && typeof this.script.ready === 'function') {
      this.script.ready(this);
    }
  }

  update(delta: number) {
    if (this.script && typeof this.script.update === 'function') {
      this.script.update(this);
    }
    for (const child of this.node_children) {
      // applyObservableProperties(this)
      child.update(delta);
    }
  }

  add_signal(name: string) {
    this.signals[name] = new Signal();
  }

  connect_signal(name: string, listener: Function) {
    if (this.signals[name]) {
      this.signals[name].connect(listener);
    }
  }

  emit_signal(name: string, ...args: any[]) {
    if (this.signals[name]) {
      this.signals[name].emit(...args);
    }
  }

  updateUI(propertyKey: string, newValue: any) {
    console.log(`Property ${propertyKey} updated to ${newValue}`);
    console.log(this.script, '123');
    // Here you can add the logic to update the UI
  }
}