<template>
<div>
    <h2>
   tab 01 {{flatid}}
    </h2>
    <div>
        order {{odata}}
    </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          flatid: String,
          odata: Object,
          saving: Object
    },

    data: function() {
        return {
            //orderdata: this.odata,
            dSave: this.saving
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(oi01)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(oi01) - SAVE');
                    val.state = false;
                } else {
                    console.log('watched(oi01) - nothing to do');
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
