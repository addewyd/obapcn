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
          odata: Array,
          saving: Object
    },

    data: function() {
        return {
            dSave: this.saving
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(oi03)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(oi03) - SAVE');
                    val.state = false;
                } else {
                    console.log('watched(oi03) - nothing to do');
                }
            },
            deep:true
        }
    },
    
    created: function() {
    },
    beforeDestroy: function() {
    }
}

</script>
