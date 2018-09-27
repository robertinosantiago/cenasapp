import Vue from 'nativescript-vue';
import axios from 'axios'

import HelloWorld from './components/HelloWorld';
import Main from './components/Main';


import './styles.scss';

// Uncomment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

Vue.use(axios);

new Vue({

  render: h => h(Main),


}).$start();
