<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import Todos from './components/Todos.vue'
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
const test = async () => {
  const session = await fetchAuthSession()
  console.log(session)
  const user = await getCurrentUser()
  console.log(user)
}
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{user?.signInDetails?.loginId}}'s todos</h1>
        <Todos />
        <button @click="signOut">Sign Out</button>
        <button @click="test">Test</button>
      </template>
    </authenticator>
  </main>
</template>

