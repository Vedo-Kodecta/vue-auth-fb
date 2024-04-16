<template>
  <div>
    <h1>Authentication</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import "firebaseui/dist/firebaseui.css"; 
import * as firebaseui from "firebaseui";
import { auth, googleProvider, emailAuthProvider } from "@/firebase"; 
import router from "@/router";

export default {
  beforeCreate() {
    auth.onAuthStateChanged(() => {
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (result) => {
            console.log(result);
            var accessToken;
            if(result.credential){
             accessToken = result.credential.idToken;
            }
            else if (result.user){
             accessToken = result.user.accessToken;
            }
            localStorage.setItem('accessToken', accessToken); 
            router.push("/dashboard");
            return false;
          }
        },
        signInFlow: 'popup',
        signInOptions: [
          googleProvider.providerId,
          {
            provider: emailAuthProvider.providerId,
            signInMethod: "password" 
          },
        ]
      };

      const ui = new firebaseui.auth.AuthUI(auth);
      ui.start("#firebaseui-auth-container", uiConfig);
    });
  }
};
</script>

<style scoped>
#firebaseui-auth-container {
  margin-top: 20px;
}
</style>
