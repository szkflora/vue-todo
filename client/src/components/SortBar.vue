<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { ref, defineEmits, watch } from 'vue';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/outline';
import { SortOrder, SortCriteria, SortData } from '@/types/Task';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits<{
  (e: 'sort', order: SortOrder, property: string): void;
}>();

const props = defineProps<{ sortData: SortData }>();
const localSortData = ref(props.sortData ?? null);

const orders: Record<SortCriteria, SortOrder> = {
  [SortCriteria.TITLE]: SortOrder.UNO,
  [SortCriteria.DESCRIPTION]: SortOrder.UNO,
  [SortCriteria.IMPORTANCE]: SortOrder.UNO,
  [SortCriteria.DATE]: SortOrder.UNO
}

const property = ref<string>('');

const router = useRouter();
const route = useRoute();

watch(localSortData, (newVal) => {
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      title: newVal.title || undefined,
      description: newVal.description || undefined,
      importance: newVal.importance || undefined,
      dueDate: newVal.dueDate || undefined
    }
  })
}, { deep: true });

function changeProperty(newProperty: string): void {
  property.value = newProperty;

  switch (orders[property.value]) {
    case SortOrder.UNO:
      orders[property.value] = SortOrder.ASC;
      break;
    case SortOrder.ASC:
      orders[property.value] = SortOrder.DSC;
      break;
    case SortOrder.DSC:
      orders[property.value] = SortOrder.UNO;
      break;
  }

  emit('sort', orders[property.value], property.value);
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full flex justify-between items-center flex-wrap my-3 md:my-5 gap-2">
      <div class="flex justify-start gap-2 md:gap-3.5">
        <BaseButton type="bar" :class="['default', localSortData.title]" @click="changeProperty('title')"
          >Title
        </BaseButton>
        <BaseButton
          type="bar"
          :class="['default', localSortData.description]"
          @click="changeProperty('description')"
          >Description
        </BaseButton>
        <BaseButton
          type="bar"
          :class="['default', localSortData.importance]"
          @click="changeProperty('importance')"
          >Priority</BaseButton
        >
        <BaseButton type="bar" :class="['default', localSortData.dueDate]" @click="changeProperty('dueDate')"
          >Date</BaseButton
        >
      </div>
      <div class="flex justify-end gap-3.5">
        <BaseButton type="bar" class="default ascending">
          <ArrowUpIcon class="w-4"></ArrowUpIcon>
        </BaseButton>
        <BaseButton type="bar" class="default descending">
          <ArrowDownIcon class="w-4"></ArrowDownIcon>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.default {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.ascending {
  background-color: #38cb89;
  color: white;
}

.descending {
  background-color: black;
  color: white;
}

.unorganized {
  background-color: white;
  border-width: 1.5px;
  border-color: black;
}
</style>
