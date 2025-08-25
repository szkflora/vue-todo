<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

interface Props {
  htmlType?: 'submit' | 'button' | 'reset';
  type?: 'primary' | 'secondary' | 'bar' | 'danger' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
  htmlType: 'button',
  type: 'primary',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const htmlType = props.htmlType ?? 'button';

const typeClasses = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'rounded-md md:rounded-2xl w-[80px] md:w-[110px] h-[36px] md:h-[50px] text-lg border-[none] bg-[#38cb89] mr-[10px] md:mr-[20px] hover:bg-[#23a068]';
    case 'secondary':
      return 'rounded-md md:rounded-2xl w-[70px] md:w-[90px] h-[30px] md:h-[40px] font-semibold px-4 py-2 border-[none] bg-[rgb(188,182,182)] text-gray-900 hover:bg-[#8e8989]';
    case 'bar':
      return 'rounded-md h-[26px] md:h-[28px] font-semibold px-4 py-2';
    case 'danger':
      return 'rounded-md md:rounded-2xl w-[70px] md:w-[90px] h-[30px] md:h-[40px] font-semibold px-4 py-2 border-[none]  bg-red-600 text-white hover:bg-red-700';
    default:
      return 'border-[none] rounded-[50%] w-9 md:w-12 bg-[#38cb89] text-white';
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
