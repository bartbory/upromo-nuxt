<script setup lang="ts">
import { PropType } from "vue";
import BaseButton from "../UI/BaseButton.vue";
import ModalFiles from "../modal/ModalFiles.vue";
import { IFiles } from "../../../types";

const props = defineProps({
  label: { type: String, required: true },
  text: { type: String, required: true },
  filesSelected: { type: Array as PropType<IFiles[]>, required: true },
  files: {
    type: Array as PropType<IFiles[]>,
    required: true,
  },
});

const emits = defineEmits(["selectionHandler", "deleteSelectedFile"]);

const filesArray = ref(props.filesSelected);

function selectionHandler(file: IFiles) {
  if (filesArray.value.find((i) => i.path === file.path)) {
    const idx = filesArray.value.indexOf(file);
    filesArray.value.splice(idx, 1);
  } else {
    filesArray.value.push(file);
  }
}

const showModal = ref(false);
</script>

<template>
  <Teleport to="body">
    <modal-files
      :show="showModal"
      @close="showModal = false"
      title="Select files"
      :filesSelected="props.filesSelected"
      :files="props.files"
      @selectionHandler="(file: IFiles) => selectionHandler(file)"
      @save="emits('selectionHandler', filesArray)"
    >
    </modal-files>
  </Teleport>
  <div class="form__row">
    <label>{{ label }}</label>
    <BaseButton
      size="big"
      styleType="primary"
      :msg="props.text"
      v-if="!props.files"
    />
    <div class="files__container" v-if="props.filesSelected.length > 0">
      <div class="file" v-for="file in props.filesSelected" :key="file.name">
        <p>{{ file.name }}</p>
        <p>{{ file.extention }}</p>
        <div class="on__hover">
          <BaseButton
            size="small"
            styleType="danger"
            msg="Delete"
            @click="emits('deleteSelectedFile', file)"
          />
        </div>
      </div>
    </div>
    <BaseButton
      size="big"
      styleType="primary"
      :msg="props.text"
      @click="showModal = true"
    />
  </div>
</template>

<style scoped>
.form__row {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;
}

.files__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--gray-300);
  border-radius: var(--br-4);
  padding: 4px;
}

.file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: var(--br-4);
  padding: 8px;
  background-color: var(--white-900);
}

.on__hover {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.file:hover > .on__hover {
  opacity: 1;
}
.add {
  background-color: var(--gray-100);
  color: var(--gray-900);
}

img {
  width: 100%;
}

button {
  border: none;
  font-size: 16px;
  font-family: "Lato";
}
</style>
