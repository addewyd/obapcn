<template>
<div class="tabs">
   <ul class="nav nav-tabs">
      <li role="presentation" @click="oitabxx = '01'">
        <span :class="tabclass('01')">Tab 01</span></li>
      <li role="presentation" @click="oitabxx = '02'">
        <span :class="tabclass('02')">Tab 02</span></li>
      <li role="presentation" @click="oitabxx = '03'">
        <span :class="tabclass('03')">Tab 03</span></li>
      <li role="presentation" @click="oitabxx = '04'">
        <span :class="tabclass('04')">Tab 04</span></li>
   </ul>
{{orderdata.id}}
   <div class="tab-content">
        <component v-bind:is="'oi-tab-'+oitabxx" 
            :flatid="flatid" 
            :odata="odata"></component>
  </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          flatid: String,
          odata: Array
    },

    data: function() {
        return {
            cb: 'oi tabs',
            oitabxx: '01',
            orderdata: this.odata
        }
    },
    mounted: function () {
        var self = this;
        this.orderdata = this.odata;
    },
    methods: {
        tabclass: function (xx) {            
            if(xx == this.oitabxx) return "tabhead tab-act";
            else return "tabhead tab-pas";
        }
    
    }
}

</script>
