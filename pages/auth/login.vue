<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import LoadingScreen from "~/components/loading/LoadingScreen.vue";

definePageMeta({
  middleware: ["auth"],
});
const supabase = useSupabaseAuthClient();
const router = useRouter();
const loading = ref(false);
const email = ref("");
const password = ref("");
const msg = ref("");

const handleLogin = async () => {
  loading.value = true;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    loading.value = false;
  }
  if (data) {
    navigateTo("/user");
  }
};
</script>

<template>
  <section>
    <h1 class="logo">UPROMO</h1>
    <form @submit="handleLogin" v-if="!loading">
      <BaseInput label="Login" inputType="email" v-model="email" v-if="!msg" />
      <BaseInput
        label="Password"
        inputType="password"
        v-model="password"
        v-if="!msg"
      />
      <BaseButton
        type="submit"
        styleType="primary"
        msg="Login"
        size="normal"
        v-if="!msg"
      />
      <p>{{ msg }}</p>
    </form>

    <LoadingScreen v-else />
  </section>
</template>

<!-- <script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import createUser from "@/helpers/createUser";
// import getUserData from "@/helpers/getUserData";

export default defineComponent({
  name: "UserLogin",
  async setup() {
    const router = useRouter();
    const email = ref("");
    const pass = ref("");
    const name = ref("");

    const formIsValid = ref(true);
    const mode = ref("login");

    const switchButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Switch to signup mode";
      } else {
        return "Switch to login mode";
      }
    });
    const switchCaption = computed(() => {
      if (mode.value === "login") {
        return "Login";
      } else {
        return "Register";
      }
    });

    function switchAuthMode() {
      if (mode.value === "login") {
        mode.value = "register";
        console.log("zmieniam na register");
      } else {
        mode.value = "login";
        console.log("zmieniam na login");
      }
    }
    function submitForm() {
      formIsValid.value = true;
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        pass.value.length < 6
      ) {
        formIsValid.value = false;
        return;
      } else if (mode.value === "register") {
        createUserWithEmailAndPassword(getAuth(), email.value, pass.value)
          .then((data) => {
            if (name.value.trim() !== "")
              console.log("Successfully registred!", data);
            const userData = {
              id: data.user.uid,
              name: name.value.trim(),
              email: email.value.trim(),
              lastMeasure: null,
            };
            localStorage.setItem("uid", `${data.user.uid}`);
            localStorage.setItem("name", `${name.value.trim()}`);
            createUser(userData);
            router.push("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } else if (mode.value === "login") {
        signInWithEmailAndPassword(getAuth(), email.value, pass.value)
          .then((data) => {
            console.log("Successfully Logged!", data);
            localStorage.setItem("uid", `${data.user.uid}`);
            router.push(`/user`);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      }
    }

    function signInWithGoogle() {
      return;
    }

    return {
      email,
      pass,
      name,
      formIsValid,
      mode,
      submitForm,
      switchAuthMode,
      switchButtonCaption,
      signInWithGoogle,
      switchCaption,
    };
  },
});
</script> -->

<style scoped>
/* form {
  margin: 0 auto;
}
.actions {
  margin: 0 auto;
  display: flex;
  column-gap: 24px;
  justify-content: center;
} */

section {
  width: 100vw;
  height: 100vh;
  background: var(--gradient-purple);
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 40px;
  min-width: 60%;
  background: var(--white-900);
  border-radius: var(--br-16);
}
</style>
