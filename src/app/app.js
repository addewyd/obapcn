import Vue from 'vue';
import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate);
Validator.localize('ru', ru);

import $ from 'jquery';
import popper from 'popper.js';

import * as Utils  from './utils';


import MainTop from '../vue/main.vue';
import MainMiddle from '../vue/mainmiddle.vue';

function application() {
    this.dbname = undefined;
};

application.prototype.loadObjects = async function(r) {
    console.log('loadObjects ' + this.dbname);
    var params = Utils.array_merge(
        {
            'operation': 'getObjects', 
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                function (data) {
                    console.log('resolve getObjects', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else reject('error');
                }).fail(
                function (e) {
                    console.log('GOe', e);
                    reject(['error', e]);
                });
    });
};

// .............................................................................

application.prototype.loadAll = async function(r) {
    console.log('loadAll');
    var p1 = await Utils.getoption('dbname');
    this.dbname = p1;
    var p2 = await this.loadObjects(p1);
    console.log('objects ', p2); // array of records is here
    return p2;
};

// .............................................................................

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
    },
        error: function(e){ console.log('ajax upddb error',e );}
    });    
};

// .............................................................................

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
var bus = new Vue;


Vue.component('app-main-middle', MainMiddle);
        
new Vue({
  el: '#app-main-top',
  components: {
    'app-main-top': MainTop
  }
});


export /*default*/ {app, bus};
