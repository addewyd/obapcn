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
          odata: Object,
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
                console.log('watched(oi04)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(oi04) - SAVE');
                    val.state = false;
                    var res = app.saveO01(this.odata.odata);
                    if(res.status === 'success') {
                    }

                } else {
                    console.log('watched(oi04) - nothing to do');
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
