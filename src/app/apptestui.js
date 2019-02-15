import Vue from 'vue';

import Test01 from '../vue/testui01.vue';

(function () {
    
})();

function application() {
    this.cb = 'profile';
}


var app = new application();

//Vue.component(Test01);

new Vue({
  el: '#b',
  components: {
    'test-a': Test01
  }
})


//module.exports = app;
export default app
