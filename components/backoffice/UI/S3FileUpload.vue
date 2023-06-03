<script setup lang="ts">
import { Ref } from "vue";
import { ref } from "vue";

export interface IFile {
  name: string;
  size: number;
  type: string;
  fileExtention: string;
  url: string;
  isImage: boolean;
  isUploaded: boolean;
}

const props = defineProps({
  maxSize: {
    type: Number,
    default: 5,
    required: true,
  },
  accept: {
    type: String,
    default: "image/*",
  },
});

const isLoading = ref(false);
// const uploadReady = ref(true);
const errors: Ref<string[]> = ref([]);

// const file: IFile = {
//   name: "",
//   size: 0,
//   type: "",
//   fileExtention: "",
//   url: "",
//   isImage: false,
//   isUploaded: false,
// };

function handleFileChange(e: any) {
  errors.value = [];
  isLoading.value = true;

  if (e.target.files && e.target.files[0]) {
    if (isFileValid(e.target.files[0])) {
      const file = e.target.files[0];
      const fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100;
      const fileExtention = file.name.split(".").pop();
      const fileName = file.name.split(".").shift();
      const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtention);
      console.log(fileSize, fileExtention, fileName, isImage, file);
      isLoading.value = false;
    } else {
      isLoading.value = false;
      console.log("Invalid file");
    }
  }
}

function isFileSizeValid(fileSize: number) {
  if (fileSize <= props.maxSize) {
    console.log("File size is valid");
  } else {
    errors.value.push(`File size should be less than ${props.maxSize} MB`);
  }
}
function isFileTypeValid(fileExtention: string) {
  if (props.accept.split(",").includes(fileExtention)) {
    console.log("File type is valid");
  } else {
    errors.value.push(`File type should be ${props.accept}`);
  }
}
function isFileValid(file: IFile) {
  isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100);
  isFileTypeValid(file.name.split(".").pop()!);
  if (errors.value.length === 0) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <div class="file-upload">
    <div class="file-upload__area" v-if="!isLoading">
      <input type="file" name="" id="" @change="handleFileChange($event)" />
      <div v-if="errors.length > 0">
        <div
          class="file-upload__error"
          v-for="(error, index) in errors"
          :key="index"
        >
          <span>{{ error }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-upload {
  height: 100px;
  max-width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 24px;
}
.file-upload .file-upload__area {
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--gray-100);
  border-radius: var(--br-8);
}
</style>
