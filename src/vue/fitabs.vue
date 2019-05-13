<template>
    <div>
        flat id {{finfo.id}}
<div class="tabs">
   <ul class="nav nav-tabs">
      <li role="presentation" @click="fitabxx = '01'">
        <span :class="tabclass('01')">Общие</span></li>
      <li role="presentation" @click="fitabxx = '02'">
        <span :class="tabclass('02')">Tab 02</span></li>
      <li role="presentation" @click="fitabxx = '03'">
        <span :class="tabclass('03')">Tab 03</span></li>
   </ul>

   <div class="tab-content">

    <component v-bind:is="'fi-tab-'+fitabxx"
        v-bind:finfo="finfo"   :objectid="objectid" :objectname="objectname" :saving="dSave2" :psquares="[]"></component>

  </div>
  </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
    export default {
    props: {
        finfo: Object,
        saving: Object,
            objectid: String,
            objectname: String
    },

    data: function() {
        return {
            cb: 'fi tabs',
            fitabxx: '01',
            dSave: this.saving,
            dSave2: {state: false}
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched', val.state);
                if(val.state) {
                    // send back
                    val.state = false;
                    this.dSave2.state = true;
                } else {
                    console.log('watched - nothing to do');
                }
            },
            deep:true
        }
    },
    methods: {
        tabclass: function (xx) {
            if(xx == this.fitabxx) return "tabhead tab-act";
            else return "tabhead tab-pas";
        }
    }
}

</script>
