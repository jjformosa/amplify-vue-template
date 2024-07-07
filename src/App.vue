<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-vue/styles.css";
import { ref } from 'vue'
import Todos from './components/Todos.vue'
import {
  signInWithRedirect,
  getCurrentUser,
  fetchUserAttributes,
  updateUserAttribute,
  signOut,
  fetchAuthSession,
  rememberDevice,
  type GetCurrentUserOutput} from "aws-amplify/auth";
const refEmail = ref("123"), refPwd = ref("321")
const refCurrentUser = ref<GetCurrentUserOutput | null>(null)
const login = async () => {
  try {
    refCurrentUser.value = await getCurrentUser()
    if (refCurrentUser.value) {
      console.log(refCurrentUser.value)
    } 
    const attrs = await fetchUserAttributes()
    if (attrs) {
      console.log(attrs)
      // const updateAttrNextStep = await updateUserAttribute({
      //   userAttribute: {
      //     attributeKey: "custom:birthday",
      //     value: "1988-07-04T16:30:00+08:00"
      //   }
      // })
      // console.log(updateAttrNextStep)
    }
    const session = await fetchAuthSession()
    console.log(session)
    //await rememberDevice()
  } catch (ex) {
    console.log(Amplify.getConfig().Auth)
    await signInWithRedirect({
      provider: { custom: 'liff-test' }
    })
    // await signIn({ username: refEmail.value, password: refPwd.value })
    console.warn(ex)
  }
}
const doLogout = async () => {
  await signOut({
    global: true
  })
}
</script>

<template>
  <main>
    <!-- <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{user?.signInDetails?.loginId}}'s todos</h1>
        <Todos />
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator> -->
    <div v-if="refCurrentUser !== null">
      <h1>Hello {{refCurrentUser?.signInDetails?.loginId}}'s todos</h1>
      <Todos />
      <button @click="doLogout">Sign Out</button>
    </div>
    <div v-else>
      <div>
        <input name="mail" v-model="refEmail"/>
      </div>
      <div>
        <input name="pwd" v-model="refPwd"/>
      </div>
      <button type="button" @click="login">login</button>
    </div>
  </main>
</template>

