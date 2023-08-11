<script setup>
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "../backoffice/form/BaseInput.vue";

const email = ref("");
const isLoading = ref(false);
const isError = ref(false);

async function submitForm() {
  isLoading.value = true;
  isError.value = false;

  if (!email.value) {
    isError.value = true;
    isLoading.value = false;
    return;
  }

  const { data, pending } = await useFetch("/api/mailchimp/subscribe", {
    method: "POST",
    body: { email },
  });
  if (data.value) {
    console.log("ok");
    console.log(data.value);
  } else {
    console.log("error");
    console.log(data.value);
  }
  isLoading.value = pending.value;
}
</script>
<template>
  <LoadingScreen v-if="isLoading" />
  <form
    v-else
    @submit.prevent="submitForm"
  >
    <BaseInput
      label="Email address"
      input-type="email"
      is-req="true"
      v-model="email"
      name="EMAIL"
    />
    <div aria-hidden="true" style="position: absolute; left: -5000px">
      /* real people should not fill this in and expect good things - do not
      remove this or risk form bot signups */
      <input
        type="text"
        name="b_c483fd3417ef380993eb727ad_1522d0a095"
        tabindex="-1"
        value=""
      />
    </div>
    <div class="optionalParent">
      <div class="clear foot">
        <BaseButton
          size="big"
          style-type="default"
          msg="Subscribe"
          type="submit"
        />
      </div>
    </div>
  </form>
  <p v-if="isError">This input shouldn't be empty</p>
</template>

<style scoped>
form {
  max-width: 100%;
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: flex-end;
  justify-content: center;
}

form:deep(label) {
  color: white;
}
</style>
