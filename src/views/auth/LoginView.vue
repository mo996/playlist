<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    const { error, login, isPending } = useLogin();

    const email = ref("");
    const password = ref("");
    const router = useRouter()

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        router.push({name: 'userPlaylists'})
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>
