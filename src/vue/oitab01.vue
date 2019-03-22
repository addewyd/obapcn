<template>
<div>
    <h2>
   tab 01 {{flatid}}
    </h2>
    <div v-if="orderdata.length>0">
    order {{orderdata[0]}}
    </div>
    <div v-else>
        Нет договора
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
            orderdata: this.odata
        }
    },
    
    created: function() {
        //console.log('P', this.$parent);
    },
    beforeDestroy: function() {
    }
}

</script>
