export namespace Environment {
  // Set your app configurations here.
  // For the list of config options, please refer to https://ionicframework.com/docs/api/config/Config/
  export const config = {
    mode: 'ios', //Firestarter's style is custom-designed based on iOS style, removing or changing this WILL MAKE THE APP LOOK BAD.
    menuType: 'overlay'
  };
  // Set language to use.
  export const language = 'en';
  // Firebase Cloud Messaging Server Key.
  // Get your gcmKey on https://console.firebase.google.com, under Overview -> Project Settings -> Cloud Messaging.
  // This is needed to send push notifications.
  export const gcmKey = 'AAAAy6aGtLI:APA91bH5CSnq3v6jCcaIwXJ5nKDx4wtfyZ7CdSjjJOdiNTHF3epPAKHI-sTPyJk4aMaYO3UXNAeXs3EWGfu3zSJAA7ut3cPWTz9v-nUrmfaAUAJq2xZMC75FvQta9AdeBWysBuzmbZSn';
  // Set to your Firebase app, you can find your credentials on Firebase app console -> Add Web App.
  export const firebase = {
    apiKey: "AIzaSyB4CQMJUsN8Vd67R0USHNbu4EUthM2fxd8",
    authDomain: "luxurybankcard.firebaseapp.com",
    databaseURL: "https://luxurybankcard.firebaseio.com",
    projectId: "luxurybankcard",
    storageBucket: "luxurybankcard.appspot.com",
    messagingSenderId: "874672207026"
  };
  // You can find your googleWebClientId on your Firebase app console -> Authentication -> Sign-in Method -> Google -> Web client ID
  export const googleWebClientId: string = '874672207026-u8v3tc5rnei35ubhiggbtsjntjbr41df.apps.googleusercontent.com';
  // Loading Configuration.
  // Please refer to the official Loading documentation here: https://ionicframework.com/docs/api/components/loading/LoadingController/
  export const loading = {
    spinner: 'circles'
  };
  // Toast Configuration.
  // Please refer to the official Toast documentation here: https://ionicframework.com/docs/api/components/toast/ToastController/
  export const toast = {
    position: 'bottom' // Position of Toast, top, middle, or bottom.
  };
  export const toastDuration = 5000; // Duration (in milliseconds) of how long toast messages should show before they are hidden.
}
