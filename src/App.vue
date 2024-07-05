<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ref } from 'vue';
import { onMounted, Ref } from 'vue';
import { Engine, Node, Scene, MeshNode, ModelNode } from './core';
import { EventManager } from './core/Event';
import nodeTreePanelVue from './ui/nodeTreePanel.vue';
import RightPanel from './ui/Panel/RIghtPanel.vue';
const eventManager = ref(null) as Ref<EventManager | null>

class a {
  get b() {
    return 1
  }
  set b(v) {
    alert(v)
  }
}
class c extends a {
  get b() {
    return 2
  }
  set b(v) {
    alert(3)
  }
}
const d = new c()
console.log(d.b, '========================>>')
console.log(d, '========================>>')
onMounted(() => {
  const editorPanel = document.getElementById('Editor_Panel');
  console.log(editorPanel?.clientWidth, 'editorPanel')
  if (editorPanel) {
    const __engine__ = Engine.getInstance(editorPanel);
    eventManager.value = new EventManager();
    __engine__.registerResizeEvent(eventManager.value);
    const __scene__ = new Scene('root')
    const __node__ = new MeshNode('mesh')
    const __node__1 = new MeshNode('mesh1')
    const model = new ModelNode('model')
    model.loadModel("/src/assets/主变压器.FBX")
    __node__1.position.y = 10
    __node__.position.y = 5
    __node__.script = 1
    console.log(__node__1, '__node__1')
    console.log(__node__, '__node__')
    __scene__.add_node(__node__)
    __scene__.add_node(__node__1)
    __scene__.add_node(model)
    __engine__.add_scene(__scene__)
    __node__.script = {
      update: (_this: any) => {
        // console.log('update', __scene__.position)
        // _this.position.x += 0.001
        // _this.position.x += 1
      },
      ready: (_this: any) => {
        // alert('load')
        // console.log(_this, 'this')
      }
    }
    __engine__.start()

    console.log(__engine__.get_scene())

  } else {
    console.error('Editor_Panel element not found');
  }
})

const onResize = (e: any) => {
  console.log(e)
  eventManager.value!.emit('resize');
}
</script>

<template>
  <ResizablePanelGroup id="handle-demo-group-1" direction="horizontal"
    class="min-h-screen min-w-screen rounded-lg border">
    <ResizablePanel id="handle-demo-panel-1" :default-size="25">
      <nodeTreePanelVue></nodeTreePanelVue>
    </ResizablePanel>
    <ResizableHandle id="handle-demo-handle-1" with-handle />
    <ResizablePanel :onResize="onResize" id="handle-demo-panel-2" :default-size="50">
      <div id="Editor_Panel" class="h-full ">
      </div>
    </ResizablePanel>
    <ResizableHandle id="handle-demo-handle-3" with-handle />
    <ResizablePanel id="handle-demo-panel-3" class="bg-[#29292e]" :default-size="25">
      <div id="rightCurrentPane" style="height: 100vh;" class="h-100vh p-4  overflow-scroll bg-[#29292e]"></div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>