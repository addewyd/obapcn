import Vue from 'vue';
import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate);
Validator.localize('ru', ru);

import $ from 'jquery';
import popper from 'popper.js';

import MainTop from '../vue/main.vue';



function application() {
    
};


application.prototype.init = async function() {
    await new Promise((resolve) => 
        BX24.init(function () {
            alert('init ok');
            resolve(true);
        })
    )
};


var app = new application();


new Vue({
  el: '#app-main-top',
  components: {
    'app-main-top': MainTop
  }
});


export default app;
