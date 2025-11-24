<template>
  <svg
    :class="svgClass"
    :style="svgStyle"
    :width="size"
    :height="size"
    :fill="color"
    aria-hidden="true"
    v-on="$attrs"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props定义
interface Props {
  // 图标名称
  name: string
  // 图标大小
  size?: string | number
  // 图标颜色
  color?: string
  // 额外的类名
  class?: string
}

// 定义组件的props
const props = withDefaults(defineProps<Props>(), {
  size: 20,
  color: '',
  class: '',
})

// 计算图标名称，添加#前缀
const iconName = computed(() => `#${props.name}`)

// 计算SVG类名
const svgClass = computed(() => {
  const classes = ['svg-icon']
  if (props.class) {
    classes.push(props.class)
  }
  return classes
})

// 计算SVG样式
const svgStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.color = props.color
  }
  return style
})
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
