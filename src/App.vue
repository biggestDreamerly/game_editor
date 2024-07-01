<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ref } from 'vue';
import { onMounted, Ref } from 'vue';
import { Engine, Node, Scene, MeshNode } from './core';
import { EventManager } from './core/Event';

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

  if (editorPanel) {
    const __engine__ = new Engine(editorPanel);
    eventManager.value = new EventManager();
    __engine__.registerResizeEvent(eventManager.value);
    const __scene__ = new Scene('root')
    const __node__ = new MeshNode('mesh')
    const __node__1 = new MeshNode('mesh1')
    __node__1.position.y = 10
    __node__.position.y = 5
    __node__.script = 1
    console.log(__node__1, '__node__1')
    console.log(__node__, '__node__')
    __scene__.add_node(__node__)
    __scene__.add_node(__node__1)
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
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">Sidebar</span>
      </div>
    </ResizablePanel>
    <ResizableHandle id="handle-demo-handle-1" with-handle />
    <ResizablePanel :onResize="onResize" id="handle-demo-panel-2" :default-size="50">
      <div id="Editor_Panel" class="h-full ">
        <!-- <ResizablePanelGroup id="demo-group-2" direction="vertical">
          <ResizablePanel id="demo-panel-3" :default-size="0">

          </ResizablePanel>
          <ResizableHandle id="demo-handle-2" />
          <ResizablePanel :onResize="onResize" id="demo-panel-4" :default-size="100">
            <div id="Editor_Panel" class=" h-full">
            </div>
          </ResizablePanel>
        </ResizablePanelGroup> -->
      </div>
    </ResizablePanel>
    <ResizableHandle id="handle-demo-handle-3" with-handle />
    <ResizablePanel id="handle-demo-panel-3" :default-size="25">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">Sidebar2</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>