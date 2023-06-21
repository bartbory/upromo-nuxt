<script setup lang="ts">
import { Status } from "@prisma/client";
import { computed } from "vue";

const props = defineProps({
  statusType: { type: String as PropType<Status>, required: true },
  isSmall: { type: Boolean, default: false },
});

const status = computed(() => {
  if (props.statusType === "PUBLISHED") {
    return "published";
  } else if (props.statusType === "DRAFT") {
    return "draft";
  } else {
    return "unpublished";
  }
});
</script>

<template>
  <div :class="[isSmall ? 'status__container' : 'status__container__big']">
    <div class="status__indicator" :class="status"></div>
    <p :class="{ small: isSmall }">
      {{
        props.statusType.slice(0, 1) + props.statusType.slice(1).toLowerCase()
      }}
    </p>
  </div>
</template>

<style scoped>
.status__container__big {
  display: flex;
  column-gap: 8px;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--gray-100);
}
.status__container {
  display: flex;
  column-gap: 4px;
  align-items: center;
  background-color: transparent;
}

.status__indicator {
  width: 8px;
  height: 8px;
  border-radius: 4px;
}
.published {
  background-color: var(--green-900);
}
.draft {
  background-color: var(--yellow-900);
}
.unpublished {
  background-color: var(--red-900);
}

.small {
  font-size: 12px;
}

@media screen and (min-width: 740px) {
  .status__container {
    display: flex;
    column-gap: 8px;
    align-items: center;
    background-color: transparent;
  }
  .status__indicator {
    width: 12px;
    height: 12px;
    border-radius: 6px;
  }
  .small {
    font-size: 16px;
  }
}
</style>
