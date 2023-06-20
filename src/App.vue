<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-responsive class="fill-height">
          <SiListDropdown @setProperties="setProperties" />
          <v-row v-for="property in properties" :key="property.index">
            <v-col>
              {{ `Dropdown Number ${property.index + 1} Selected Item { ${property.value}:${property.title} }` }}
            </v-col>
          </v-row>
        </v-responsive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SiListDropdown from '@/components/SiListDropdown/SiListDropdown.vue'
import {SelectedValue} from './types/index'

const properties = ref<SelectedValue[]>([]);

const setProperties = (props:SelectedValue) => {
  if(properties.value.map(e => e.index).includes(props.index)){
    properties.value.splice(props.index,1,props)
  } else{
    properties.value.push(props)
  }
}

</script>
