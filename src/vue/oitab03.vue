<template>
<div>
    <h2>
   tab №03  ИД кв {{flatid}}
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
