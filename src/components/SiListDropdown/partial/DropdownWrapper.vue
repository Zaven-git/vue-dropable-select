<template>
  <div>
    <VueDraggableNext class="dragArea list-group " :list="list" @change="changePositions">
      <div class="d-flex items-center my-3" v-for="(element, i) in list" :key="element.id">
        <Dropdown 
          @setSelectedValue="setSelectedValue" 
          :index="i" 
          :selectedDropdowns="selectedDropdowns"
          @removeDropdown="removeDropdown" 
          :list="dropdownList" 
          :defaultValue="element.name" 
          :hideDeleteButtons="hideDeleteButtons"
        />
      </div>
      <div v-if="!hideAddButton" class="d-flex align-end justify-start" @click="addDropdownItem" >
        <img src="../../../assets/plus.svg" alt="plus icon"  class="add-image">
        <span>Add</span>
      </div>
    </VueDraggableNext>
  </div>
</template>
<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import Dropdown from './Dropdown.vue';
import { VueDraggableNext } from 'vue-draggable-next'
import { DropDownWrapperItem, SelectedValue,DragDropedValue } from '../../../types/index'

const props = defineProps(['minimum','maximum','defaultDropdowns','disableAdd','disableDelete'])
const emit = defineEmits(['setProperties','changePositions'])

const dropdownList = ref([
  { title: 'California', value: "california" },
  { title: 'Colorado', value: "colorado" },
  { title: 'Florida', value: "florida" },
  { title: 'Georgia', value: "georgia" },
  { title: 'Texas', value: "texas" },
  { title: 'Wyoming', value: "wyoming" }
])

const list = ref<DropDownWrapperItem[]>([]);

const selectedDropdowns = ref<string[]>([]);

const hideAddButton = computed(()=> list.value.length === props.maximum || props.disableAdd)
const hideDeleteButtons = computed(()=> list.value.length === props.minimum + 1 || props.disableDelete)

onMounted(() => {
  const uniqueSet = new Set();
  props.defaultDropdowns.forEach((element: DropDownWrapperItem) => {
    uniqueSet.add(JSON.stringify(element))
  });
  
  list.value = Array.from(uniqueSet).map((item): DropDownWrapperItem => JSON.parse(item))
})

const setSelectedValue = (val: SelectedValue) => {
  list.value[val.index].name = val.title;
  emit('setProperties',val)
}

const removeDropdown = (index: number) => {
  list.value.splice(index, 1)
}

const changePositions = (val:DragDropedValue) => {
  emit('changePositions', val)
}

const addDropdownItem = () => {
  list.value.push({ name: '', id: list.value[list.value.length - 1].id + 1 });
  selectedDropdowns.value = list.value.map(e => e.name);
}

</script>

<style>
.dragArea img {
  width: 40px;
  height: 40px;
}
.dragArea .remove-icon{
  margin-top: 8px;
  margin-left: 5px;
  height: 20px;
  width: 20px;
}
</style>