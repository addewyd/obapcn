﻿<template>
<div>
Договор  {{odata.odata.id ? (odata.odata.regnum + ' от ' + odata.odata.regdate) : 'Нет'}}
<div v-if="!odata.odata.id">
    <button class="btn btn-primary fi02" @click="addContract(flatid)">Добавить договор</button>
</div>
<div class="tabs">
   <ul class="nav nav-tabs">
      <li role="presentation" @click="oitabxx = '01'">
        <span :class="tabclass('01')">Общее</span></li>
      <li role="presentation" @click="oitabxx = '02'">
        <span :class="tabclass('02')">График платежей</span></li>
      <!--
      <li role="presentation" @click="oitabxx = '03'">
        <span :class="tabclass('03')">Tab 03</span></li>
      <li role="presentation" @click="oitabxx = '04'">
        <span :class="tabclass('04')">Tab 04</span></li>
      -->
   </ul>
   <div class="tab-content">
        <component v-bind:is="'oi-tab-'+oitabxx"
            :price="finfo.price"
            :flatid="flatid"
            :odata="odata" :saving="dSave2"></component>
  </div>
</div>

    <modal-window v-if="showAddContract" @close="showAddContract = false">
        <div slot="body">
           <new-contract :flatid="flatid"></new-contract>
        </div>
    </modal-window>



</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          flatid: String,
          finfo: Object,
          odata: Object,
          saving: Object
    },

    data: function() {
        return {
            cb: 'oi tabs',
            oitabxx: '01',
            dSave: this.saving,
            dSave2: {state: false},
            showAddContract: false
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(oi)', val.state);
                if(val.state) {
                    // send back
                    val.state = false;
                    this.dSave2.state = true;
                } else {
                    console.log('watched(oi) - nothing to do');
                }
            },
            deep:true
        }
    },
    mounted: function () {
        var self = this;
        bus.$on('close-addcontract', function () {

            console.log('got cac');
            self.showAddContract = false;
        });
        bus.$on('save-newcontract', function (o) {
            console.log('got sac', o);
            self.odata.odata = o;
            self.showAddContract = false;
        });

    },
    beforeDestroy: function() {
        bus.$off('close-addcontract');
        bus.$off('save-addcontract');
    },
    methods: {
        tabclass: function (xx) {
            if(xx == this.oitabxx) return "tabhead tab-act";
            else return "tabhead tab-pas";
        },

        addContract: function(flatid) {
            this.showAddContract = true;
        }

    }
}

</script>
