<script setup>
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "../backoffice/form/BaseInput.vue";

const email = ref("");
</script>
<template>
  <form
    action="https://gmail.us21.list-manage.com/subscribe/post?u=c483fd3417ef380993eb727ad&amp;id=1522d0a095&amp;f_id=0046d8e6f0"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    target="_self"
    novalidate="true"
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
</template>

<style scoped>
form {
  max-width: 50%;
  width: 50%;
  display: flex;
  gap: 24px;
  align-items:flex-end ;
  justify-content: center;
}

form:deep(label){
  color: white
}
</style>
