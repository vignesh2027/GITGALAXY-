<template>
  <div class="fixed inset-0 z-0">
    <canvas ref="canvasRef" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { GalaxyEngine } from '../../three/GalaxyEngine'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let engine: GalaxyEngine | null = null

onMounted(() => {
  if (!canvasRef.value) return
  engine = new GalaxyEngine(canvasRef.value)
  engine.animate()
})

onUnmounted(() => {
  engine?.dispose()
})
</script>
