<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  htmlType?: 'submit' | 'button' | 'reset';
  type?: 'primary' | 'secondary' | 'bar' | 'danger' | 'default';
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const htmlType = props.htmlType ?? 'button';

const typeClasses = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'rounded-md md:rounded-2xl w-[80px] md:w-[110px] h-[36px] md:h-[50px] text-lg border-[none]';
    case 'secondary':
      return 'rounded-md md:rounded-2xl w-[50px] md:w-[90px] h-[30px] md:h-[40px] font-semibold px-4 py-2 border-[none]';
    case 'bar':
      return 'rounded-md h-[26px] md:h-[28px] font-semibold px-4 py-2';
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600';
    default:
      return 'border-[none] rounded-[50%]';
  }
});

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<template>
  <button :type="htmlType" :class="['cursor-pointer', typeClasses]" @click="handleClick">
    <slot />
  </button>
</template>
