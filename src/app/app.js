import Vue from 'vue';
import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, { Validator } from 'vee-validate';
Vue.config.devtools = true;
Vue.use(VeeValidate);
Validator.localize('ru', ru);
import AsyncComputed from 'vue-async-computed';
Vue.use(AsyncComputed);

import VuejsDialog from "vuejs-dialog"
//import VuejsDialogMixin from "vuejs-dialog/dist/vuejs-dialog-mixin.min.js" // only needed in custom components

//import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VuejsDialog)

import $ from 'jquery';
import popper from 'popper.js';

import * as Utils  from './utils';


import MainTop from '../vue/main.vue';
import MainMiddle from '../vue/mainmiddle.vue';
import ModalWindow from '../vue/modal.vue';

import FloorPlot from '../vue/floorplot.vue';
import ObjectsGrid from '../vue/objectsgrid.vue';

import FlatInfo from '../vue/flatinfo.vue';

import FITabs from '../vue/fitabs.vue';
import FITab01 from '../vue/fitab01.vue';
import FITab02 from '../vue/fitab02.vue';
import FITab03 from '../vue/fitab03.vue';

import OrderInfo from '../vue/orderinfo.vue';

import OITabs from '../vue/oitabs.vue';
import OITab01 from '../vue/oitab01.vue';
import OITab02 from '../vue/oitab02.vue';
import OITab03 from '../vue/oitab03.vue';
import OITab04 from '../vue/oitab04.vue';


import CellTest from '../vue/celltest.vue';

import NewObject from '../vue/newobject.vue';
import NewFloor from '../vue/newfloor.vue';
import NewContract from '../vue/newcontract.vue';


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
    this.states = await this.getStates();
    console.log('app.states', this.states)
    return p2;
};

// .............................................................................

application.prototype.getStates = async function() {
    var rd = [];
    var pci = new Promise((resolve, reject) =>
        BX24.callMethod("crm.status.list",
        {
            order: { "SORT": "ASC" },
            filter: {"ENTITY_ID": "DEAL_STAGE"}
        },
        function(result) {
                if(result.error()) {
                    console.error(result.error());
                    reject(result.error());
                }
                else
                {
                    var d = result.data();
                    var n = 0;
                    var m = result.more();
                    var t = result.total();
                    console.log('mstat: ', m);
                    rd = Utils.array_merge(rd, d);

                    if(m) {
                        n = result.next();
                    } else {
                        console.log('states: ', rd);
                        resolve(rd);
                    }
                }
        }));
    return pci;
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
                resolve(data['result']);
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

application.prototype.getSquares = async function(id) {
    var params = Utils.array_merge(
        {
            'operation': 'getSquares',
            flatid: id,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
    $.ajax({url:'cntr/maincntr.php', type:'POST',data:params, dataType:'json'}).
        done(function(data) {

            if(data.status === 'success') {
                console.log('ajax getSq', data.result);
                resolve(data['result'])
            } else {
                console.log('ajax getSq error', data.status);
                reject([data.status, data.result]);
            }
        }).
        fail(function(e){
                console.log('ajax getSq error',e );
                reject(['error', e]);
            }
        );
    });
};

// .............................................................................

application.prototype.getParts = async function(id) {
    var params = Utils.array_merge(
        {
            'operation': 'getParts',
            flatid: id,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
    $.ajax({url:'cntr/maincntr.php', type:'POST',data:params, dataType:'json'}).
        done(function(data) {

            if(data.status === 'success') {
                console.log('ajax getPr', data.result);
                resolve(data['result'])
            } else {
                console.log('ajax getPr error', data.status);
                reject([data.status, data.result]);
            }
        }).
        fail(function(e){
                console.log('ajax getPr error',e );
                reject(['error', e]);
            }
        );
    });
};

// .............................................................................

application.prototype.getOrderData = async function(id) {
    var params = Utils.array_merge(
        {
            'operation': 'getOrderData',
            flatid: id,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
    $.ajax({url:'cntr/maincntr.php', type:'POST',data:params, dataType:'json'}).
        done(function(data) {

            if(data.status === 'success') {
                //console.log('ajax getOD', data.result);
                resolve(data['result'])
            } else {
                console.log('ajax getOD error', data.status);
                reject([data.status, data.result]);
            }
        }).
        fail(function(e){
                console.log('ajax getOD error',e );
                reject['error', e];
            }
        );
    });
};

// .............................................................................

application.prototype.getPshedData = async function(id) {
    var params = Utils.array_merge(
        {
            'operation': 'getPshedData',
            orderid: id,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
    $.ajax({url:'cntr/maincntr.php', type:'POST',data:params, dataType:'json'}).
        done(function(data) {

            if(data.status === 'success') {
                console.log('ajax getPSD', data.result);
                resolve(data['result'])
            } else {
                console.log('ajax getPSD error', data.status);
                reject([data.status, data.result]);
            }
        }).
        fail(function(e){
                console.log('ajax getPSD error',e );
                reject['error', e];
            }
        );
    });
};

// .............................................................................
/*
UF_CRM_PB_PRICE": "3652000", "UF_CRM_PB_PROJECT": "ЖК Демо", "UF_CRM_PB_HOUSE": "Демо дом",
"UF_CRM_PB_SECTION": "Секция 1", "UF_CRM_PB_FLOOR": "25",
"UF_CRM_PB_NUMBER": "98", "UF_CRM_PB_ROOMS": "2", "UF_CRM_PB_AREA": "71.20",
"UF_CRM_PB_BALCONY": "", "UF_CRM_PB_PRICE_METR": "51292", "UF_CRM_PB_PROP_ID": "1740049"
*/
application.prototype.createDeal = async function(finfo, ob) {
    var pci = new Promise((resolve, reject) =>
        BX24.callMethod("crm.deal.add",
        {
            fields: {
                TITLE: ob + ' кв. ' + finfo.fnumb,
                UF_CRM_PB_PROJECT: ob,
                UF_CRM_PB_PRICE: finfo.price,
                UF_CRM_PB_FLOOR: finfo.floornum,
                UF_CRM_PB_NUMBER: finfo.fnumb,
                UF_CRM_PB_ROOMS: finfo.nrooms,
                UF_CRM_PB_PRICE_METR: finfo.meterprice,
                UF_CRM_PB_AREA: finfo.gensquare
            },
            params: { "REGISTER_SONET_EVENT": "N" }
        }
        ,
        function(result) {
                if(result.error()) {
                    console.error(result.error());
                    reject(result);
                } else {
                    var r = result.data();
                    console.log("new deal", r);
                    resolve(r)
                }
        })
        )

    var id = await pci;
    console.log("new deal id", id);
    return pci;

};

// .............................................................................

application.prototype.deleteDeal = async function(id) {
    var pci = new Promise((resolve, reject) =>
        BX24.callMethod("crm.deal.delete",
        {
            id: id
        }
        ,
        function(result) {
                if(result.error()) {
                    console.error(result.error());
                    reject(result);
                } else {
                    var r = result.data();
                    console.log("del deal", r);
                    resolve(r)
                }
        })
        )

    var i = await pci;
    console.log("del deal id", i);
    return pci;

};

// .............................................................................

application.prototype.getDeals = async function() {
    var rd = [];

    var pci = new Promise((resolve, reject) =>
        BX24.callMethod("crm.dealcategory.list",
        {
            order: { "ID": "ASC" },
            filter: {},
            select: ["ID", "NAME"]
        },
        function(result) {
                if(result.error()) {
                    console.error(result.error());
                    reject( {
                            data:  [result.error()],
                            nxt: 0,
                            total: 0
                        });
                }
                else
                {
                    var d = result.data();
                    var n = 0;
                    var m = result.more();
                    var t = result.total();
                    console.log('mpci: ', m);
                    rd = Utils.array_merge(rd, d);

                    if(m) {
                        n = result.next();
                    } else {
                        resolve({
                            data: rd,
                            nxt: n,
                            total: t
                        });
                    }
                }
        }));
    var dcl = await pci;
    console.log("pci", pci, dcl);

    return new Promise((resolve, reject) =>
        BX24.callMethod("crm.deal.list",
            {
        order: { "ID": "ASC" },
        filter: {"CATEGORY_ID": 0},
        select: [ "ID", "TITLE", "STAGE_ID"]
            }, function(result) {
                if(result.error()) {
                    console.error(result.error());
                    reject( {
                            data:  [result.error()],
                            nxt: 0,
                            total: 0
                        });
                }
                else
                {
                    var d = result.data();
                    var n = 0;
                    var m = result.more();
                    var t = result.total();
                    console.log('m: ', m);
                    rd = Utils.array_merge(rd, d);

                    if(m) {
                        n = result.next();
                    } else {
                        resolve({
                            data: rd,
                            nxt: n,
                            total: t
                        });
                    }
                }
        })
    );
};

// .............................................................................

application.prototype.getDealData = async function(id) {
    return new Promise((resolve, reject) =>
        BX24.callMethod("crm.deal.get",
            {
                id: id
            }, function(result) {
                if(result.error()) {
                    console.log('error(dd)', result.error());
                    //reject
                    resolve( {
                        success: false,
                        data:  result.error(),
                    });
                }
                else
                {
                    resolve({
                        success: true,
                        data: result.data()
                    });
                }
        })
    )
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

application.prototype.saveNewObject = async function(nob_name) {
    var c1c = Utils.makeid(10);
    console.log('sno', nob_name, c1c);
    var params = Utils.array_merge(
        {
            'operation': 'saveNewObject',
            objectname: nob_name,
            c1c: c1c,
            dbname: this.dbname
        }, BX24.getAuth());
    var self = this;
    return  new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                async function (data) {
                    console.log('resolve saveNewObject', data, data.result);
                    if(data.status === 'success') {
                        await self.loadObjects(self.dbname);
                        resolve(data.result);
                    }
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('SNO', e);
                    reject(['error', e]);
                });
    });
};

// .............................................................................

application.prototype.delObject = async function(id) {
    console.log('del', id);
    var params = Utils.array_merge(
        {
            'operation': 'delObject',
            objectid: id,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                function (data) {
                    console.log('resolve delObject', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('dO', e);
                    reject(['error', e]);
                });
    });
};

// .............................................................................

application.prototype.delFloor = async function(id) {
    console.log('del floor', id);
    var params = Utils.array_merge(
        {
            'operation': 'delFloor',
            floorid: id,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                function (data) {
                    console.log('resolve delFloor', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('dF', e);
                    reject(['error', e]);
                });
    });
};

// .............................................................................

application.prototype.delEmptyFloors = async function(id) {
    console.log('delEF', id);
    var params = Utils.array_merge(
        {
            'operation': 'delEmptyFloors',
            objectid: id,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                function (data) {
                    console.log('resolve delED', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('dEF', e);
                    reject(['error', e]);
                });
    });
};

// .............................................................................

application.prototype.saveNewFloor = async function(objectid, f_num, flat_numb) {
    console.log('snf', objectid, f_num, flat_numb);
    var params = Utils.array_merge(
        {
            'operation': 'saveNewFloor',
            objectid: objectid,
            f_num: f_num,
            flat_numb: flat_numb,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                function (data) {
                    console.log('resolve snf', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('snf err', e);
                    reject(['error', e]);
                });
    });
};

// .............................................................................

application.prototype.saveNewContract = async function(flatid, odata) {
    console.log('snc', flatid, odata);
    var params = Utils.array_merge(
        {
            'operation': 'saveNewContract',
            flatid: flatid,
            odata: odata,
            dbname: this.dbname
        }, BX24.getAuth());
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                function (data) {
                    console.log('resolve snc', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('snc err', e);
                    reject(['error', e]);
                });
    });
};

// .............................................................................

application.prototype.saveF01 = async function(finfo, squares) {
    console.log('sF01', finfo, squares);

    if(finfo.deal_id) {
        // update deal with finfo fields
        var pci = new Promise((resolve, reject) =>
            BX24.callMethod("crm.deal.update",
            {
                id: finfo.deal_id,
                fields: {
                    UF_CRM_PB_PRICE: finfo.price,
                    UF_CRM_PB_FLOOR: finfo.floornum,
                    UF_CRM_PB_NUMBER: finfo.fnumb,
                    UF_CRM_PB_ROOMS: finfo.nrooms,
                    UF_CRM_PB_PRICE_METR: finfo.meterprice,
                    UF_CRM_PB_AREA: finfo.gensquare
                },
                params: { "REGISTER_SONET_EVENT": "N" }
            },
            function(result) {
                if(result.error()) {
                    console.error(result.error());
                    reject(result);
                } else {
                    var r = result.data();
                    console.log("upd deal", r);
                    resolve(r)
                }
            })
        )

        var r = await pci;
    }

    var params =
        {
            'operation': 'saveFlatData',
            finfo: finfo,
            squares: squares,
            dbname: this.dbname,
            ...BX24.getAuth()
        };
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            type: 'POST',
            data: params}).done(
                function (data) {
                    console.log('resolve sFD', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        console.log('reject sFD', data, data.result);
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('sFD err', e);
                    reject(['error', e]);
                });
    });
}

// .............................................................................

application.prototype.saveO01 = async function(odata) {
    console.log('sO01', odata);
    var params =
        {
            'operation': 'updateContract',
            odata: odata,
            dbname: this.dbname,
            ...BX24.getAuth()
        };

    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            type: "POST",
            data: params}).done(
                function (data) {
                    console.log('resolve saveO01', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('saveO01 err', e);
                    reject(['error', e]);
                });
    });
}

// .............................................................................

application.prototype.delPshed = async function(id) {
    console.log('delPshed', id);
    var params =
        {
            'operation': 'delPshed',
            id: id,
            dbname: this.dbname,
            ...BX24.getAuth()
        };

    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            data: params}).done(
                function (data) {
                    console.log('resolve delPshed', data, data.result);
                    if(data.status === 'success')
                        resolve(data.result);
                    else {
                        reject([data.status, data.result]);
                    }
                }).fail(
                function (e) {
                    console.log('delPshed err', e);
                    reject(['error', e]);
                });
    });
}

// .............................................................................

application.prototype.saveFloorPlot = async function(floorid, files) {
    console.log('sFP', floorid,files);
    var params = {
            'operation': 'saveFloorPlot',
            floorid: floorid,
            dbname: this.dbname,
            ...BX24.getAuth()
        };

    var fdata = new FormData();
    $.each(params, function (k, v) {
        fdata.append(k, v);
    });
    fdata.append('floorplot', files.item(0))

//    for (var key of fdata.keys()) {
//          console.log(key);
//    }
    var emitter = {};

    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'cntr/maincntr.php',
            type: 'POST',
            dataType: 'json',
            processData: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            data: fdata, // params,
            xhr:  () => Utils.xhrHandler(emitter)
        }).done(x =>
            resolve(x)
        ).fail(e => reject(e)
        );
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


Vue.component('fi-tab-01', FITab01);
Vue.component('fi-tab-02', FITab02);
Vue.component('fi-tab-03', FITab03);

Vue.component('fi-tabs', FITabs);
Vue.component('modal-window', ModalWindow);
Vue.component('flat-info', FlatInfo);

Vue.component('oi-tabs', OITabs);
Vue.component('order-info', OrderInfo);

Vue.component('oi-tab-01', OITab01);
Vue.component('oi-tab-02', OITab02);
Vue.component('oi-tab-03', OITab03);
Vue.component('oi-tab-04', OITab04);

Vue.component('app-main-middle', MainMiddle);
Vue.component('objects-grid', ObjectsGrid);
Vue.component('cell-test', CellTest);

Vue.component('floor-plot', FloorPlot);
Vue.component('new-object', NewObject);
Vue.component('new-floor', NewFloor);
Vue.component('new-contract', NewContract);

new Vue({
  el: '#app-main-top',
  components: {
    'app-main-top': MainTop
  }
});

export /*default*/ {app, bus, Vue};
