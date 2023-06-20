<template>
  <v-col cols="4">
    <dropdown-wrapper 
      :minimum="4" 
      :maximum="5" 
      :disableAdd="false" 
      :disableDelete="false"
      :defaultDropdowns="[{ name: 'florida', id: 1 }]" 
      @setProperties="setProperties" 
    />
  </v-col>
</template>

<script setup lang="ts">
import DropdownWrapper from './partial/DropdownWrapper.vue';
import { SelectedValue } from '../../types/index'

const emit = defineEmits(['setProperties'])

const setProperties = (props: SelectedValue) => {
  emit('setProperties', props)
}
</script>
