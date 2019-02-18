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

application.prototype.loadAll = async function(r) {
    console.log('loadAll');
    return new Promise(function(resolve) {
        return resolve("loadall-p");
    });
};


application.prototype.init = async function() {
    console.log('init start');
    var r1 = await new Promise((resolve) => 
        BX24.init(function () {
            console.log('init ok');
            resolve(true);
        })
    );
    
    var r2 = await this.loadAll(r1);
    console.log('after await');
    return r2;    
};


var app = new application();


new Vue({
  el: '#app-main-top',
  components: {
    'app-main-top': MainTop
  }
});


export default app;
