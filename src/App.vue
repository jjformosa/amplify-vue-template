<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { ref } from 'vue'
import Todos from './components/Todos.vue'
import { 
  signIn,
  signInWithRedirect,
  getCurrentUser,
  fetchUserAttributes,
  updateUserAttribute,
  autoSignIn,
  fetchAuthSession,
  rememberDevice,
  type UpdateUserAttributeOutput } from "aws-amplify/auth";
const refEmail = ref("123"), refPwd = ref("321")
const login = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      console.log(currentUser)
    } else {
      // const nextStep = await signIn({ username: refEmail.value, password: refPwd.value })
      // console.log(nextStep)
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
    await signInWithRedirect({
      provider: { custom: 'liff-tsaifatdev' }
    })
    console.warn(ex)
  }
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
    <div>
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

