import Vue from 'vue';
import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate);
Validator.localize('ru', ru);

import $ from 'jquery';
import popper from 'popper.js';

import * as Utils  from './utils';


import MainTop from '../vue/main.vue';

function application() {
    this.dbname = undefined;
};

application.prototype.loadAll = async function(r) {
    console.log('loadAll');
//    return new Promise(function(resolve) {
//        return resolve("loadall-p");
//    });
    var p1 = await Utils.getoption('dbname');
    this.dbname = p1;
    return p1;
};

application.prototype.upddb = function() {
    console.log('upddb ' + this.dbname);
    var params = Utils.array_merge(
        {
            'operation': 'upddb', 
            dbname: this.dbname
        }, BX24.getAuth());
    $.ajax({url:'cntr/maincntr.php', type:'POST',data:params, dataType:'json',
        success:function(data){
            console.log(data);
            //var answer = JSON.parse(data);
            console.log(data['result']);
            BX24.installFinish();
    },
        error: function(e){ console.log('ajax updcodes error',e );}
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
