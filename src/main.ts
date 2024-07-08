import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import { data, version } from "../amplify_outputs.json";

// Amplify.configure(outputs);
Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: "us-east-1:4b566e85-e5b3-4d13-ae68-0fce25b6bc61",
      userPoolId: "us-east-1_ma6Z4eYvY",
      userPoolClientId: "1t4mbh3q1imfjm9sjp5qk4lm73",
      loginWith: {
        oauth: {
          domain: "https://access.line.me",
          scopes: ["email", "openid", "profile"],
          responseType: "code",
          redirectSignIn: ['http://localhost:5173', 'https://localhost:9000', 'https://in-seen.tsaipanmwws.name'],
          redirectSignOut: []
        },
      },
  }, 
},
data, version })

createApp(App).mount("#app");
