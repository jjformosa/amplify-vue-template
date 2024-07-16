<script setup lang="ts">
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-vue"
import "@aws-amplify/ui-vue/styles.css";
import { ref } from 'vue'
import {
  signInWithRedirect,
  getCurrentUser,
  fetchUserAttributes,
  signOut,
  fetchAuthSession,
  type AuthSession } from "aws-amplify/auth";
const refEmail = ref("123"), refPwd = ref("321")
const refCurrentUser = ref<AuthSession | null>(null)
const login = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      console.log(currentUser)
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
    refCurrentUser.value = await fetchAuthSession()
    console.log(refCurrentUser.value)
  } catch (ex) {
    console.log(Amplify.getConfig().Auth)
    await signInWithRedirect({
      provider: { custom: 'liff-tsaipandev' }
    })
    console.warn(ex)
    // await signIn({ username: refEmail.value, password: refPwd.value })
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
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{user?.signInDetails?.loginId}}'s todos</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
    <div v-if="refCurrentUser !== null">
      <h1>Hello {{refCurrentUser?.userSub}}'s todos</h1>
    </div>
    <div v-else>
      <div>
        <input name="mail" v-model="refEmail"/>
      </div>
      <div>
        <input name="pwd" v-model="refPwd"/>
      </div>
      <button type="button" @click="login">login</button>
      <button @click="doLogout">Sign Out</button>
    </div>
  </main>
</template>

