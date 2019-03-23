<template>
<div>
   tab 03 {{finfo}}
</div>
</template>
<script>

import {app, bus} from '../app/app';
export default {
    props: {
          finfo: Object,
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
                console.log('watched(Fi03)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(Fi03) - SAVE');
                    val.state = false;
                } else {
                    console.log('watched(Fi03) - nothing to do');
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
