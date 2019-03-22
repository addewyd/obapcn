<template>
<div>
    <h2>

   <span style="color:green">tab 04 {{flatid}} </span><br />
№4
    </h2>

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
        }
    },
    
    created: function() {
    },
    beforeDestroy: function() {
    }
}

</script>
