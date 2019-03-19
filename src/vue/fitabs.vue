<template>
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
    <component v-bind:is="'fi-tab-'+fitabxx" v-bind:finfo="finfo"></component>
  </div>
</div>
</template>
<script>

module.exports = {
    props: {
          finfo: Object
    },

    data: function() {
        return {
            cb: 'fi tabs',
            fitabxx: '01'
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
