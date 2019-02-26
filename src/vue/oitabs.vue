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

   <div class="tab-content">
    <component v-bind:is="'oi-tab-'+oitabxx" v-bind:flatid="flatid"></component>
  </div>
</div>
</template>
<script>

module.exports = {
    props: {
          flatid: String
    },

    data: function() {
        return {
            cb: 'oi tabs',
            oitabxx: '01'
        }
    },
    methods: {
        tabclass: function (xx) {            
            if(xx == this.oitabxx) return "tabhead tab-act";
            else return "tabhead tab-pas";
        }
    }
}

</script>
