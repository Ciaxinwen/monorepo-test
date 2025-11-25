<template>
  <a-card
    :class="['h-full', attrs.cardClass]"
    :bodyStyle="{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '12px 16px',
    }"
    :bordered="false"
  >
    <slot name="header" />
    <div class="flex-grow overflow-auto">
      <a-table v-bind="$attrs" sticky bordered>
        <template v-for="(_, slot) in $slots" :key="slot" #[slot]="scope">
          <slot :name="slot" v-bind="scope || {}" />
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<style lang="scss" scoped></style>
