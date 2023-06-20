<template>
  <img src="../../../assets/drag.svg" alt="drag&drop icon">
  <v-combobox 
    :items="props.list" 
    variant="solo" 
    density="compact" 
    v-model="selectedValue" 
    :error="hasError"
    :error-messages="errorMessage" 
    return-object 
  />
  <img 
    v-if="props.hideDeleteButtons" 
    src="../../../assets/remove.svg" 
    alt="remove icon" 
    @click="removeDropdown"
    class="remove-icon"
  >
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import { DropDownItem } from '../../../types/index'

const props = defineProps(['index', 'selectedDropdowns', 'list', 'defaultValue', 'hideDeleteButtons']);
const emit = defineEmits(['setSelectedValue', 'removeDropdown'])


const selectedValue = ref({ title: '', value: '' });
const hasError = ref(false);
const errorMessage = ref('')

const removeDropdown = () => {
  emit('removeDropdown', props.index)
}

onMounted(() => {
  selectedValue.value = props.list.filter((e: DropDownItem) => e.value === props.defaultValue)[0]
})

watch(selectedValue, (val) => {
  if (val) {
    if (props.selectedDropdowns.length > 1 && props.selectedDropdowns.includes(val?.title)) {
      hasError.value = true
      errorMessage.value = 'The Option is already selected'
    } else if (!props.list.includes(val)) {
      hasError.value = true
      errorMessage.value = 'There is no item in the list with selected name'
    } else {
      errorMessage.value = '';
      hasError.value = false
      emit('setSelectedValue', { title: val.title, index: props.index, value: val?.value })
    }
  }
})
</script>