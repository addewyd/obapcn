import Vue from 'vue';
import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, { Validator } from 'vee-validate';
Vue.config.devtools = true;
Vue.use(VeeValidate);
Validator.localize('ru', ru);

import VuejsDialog from "vuejs-dialog"
//import VuejsDialogMixin from "vuejs-dialog/dist/vuejs-dialog-mixin.min.js" // only needed in custom components
 
//import 'vuejs-dialog/dist/vuejs-dialog.min.css'
 
Vue.use(VuejsDialog)

import $ from 'jquery';
import popper from 'popper.js';

import * as Utils  from './utils';


import MainTop from '../vue/main.vue';
import MainMiddle from '../vue/mainmiddle.vue';
import ObjectsGrid from '../vue/objectsgrid.vue';
import ModalWindow from '../vue/modal.vue';
import FlatInfo from '../vue/flatinfo.vue';
import FITabs from '../vue/fitabs.vue';
import FITab01 from '../vue/fitab01.vue';
import FITab02 from '../vue/fitab02.vue';
import FITab03 from '../vue/fitab03.vue';

import CellTest from '../vue/celltest.vue';

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

application.prototype.getFloorData = async function(id) {
    console.log('app.getFloorData ' + this.dbname);
    var params = Utils.array_merge(
        {
            'operation': 'getFloorData',
            floorid: id,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
    $.ajax({url:'cntr/maincntr.php', type:'POST',data:params, dataType:'json'}).
        done(function(data) {
            
            if(data.status === 'success') {
                resolve(data['result'])
            } else {
                console.log('ajax getFloorData error', data.status);
                reject([data.status, data.result]);
            }
        }).
        fail(function(e){ 
                console.log('ajax getFloorData error',e );
                reject['error', e];
            }
        );    
    });
};

// .............................................................................

application.prototype.refreshdata = async function(id) {
    console.log('app.refreshdata', id);
    var params = Utils.array_merge(
        {
            'operation': 'getData',
            objectid: id,
            dbname: this.dbname
        }, BX24.getAuth());

    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                function (data) {
                    console.log('resolve getData', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('GDe', e);
                    reject(['error', e]);
                });
    });
}

// .............................................................................

application.prototype.init = async function() {
    console.log('init start');
    var r1 = await new Promise((resolve) => 
        BX24.init(function () {
            console.log('init ok');
            
            Vue.dialog.alert('init callback')
                .then(function (dialog) {
                    console.log(dialog);
            });
            resolve(true);
        })
    );
    
    var r2 = await this.loadAll(r1);
    console.log('after await');
    return r2;    
};


var app = new application();
var bus = new Vue;


Vue.component('fi-tab-01', FITab01);
Vue.component('fi-tab-02', FITab02);
Vue.component('fi-tab-03', FITab03);

Vue.component('fi-tabs', FITabs);
Vue.component('modal-window', ModalWindow);
Vue.component('flat-info', FlatInfo);

Vue.component('app-main-middle', MainMiddle);
Vue.component('objects-grid', ObjectsGrid);
Vue.component('cell-test', CellTest);
        
new Vue({
  el: '#app-main-top',
  components: {
    'app-main-top': MainTop
  }
});


export /*default*/ {app, bus};
