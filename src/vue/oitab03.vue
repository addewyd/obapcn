<template>
<div>
    <h2>
   tab №03  ИД кв {{flatid}}
    </h2>
    cntr all
    <div>
        {{odata}}
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
                    var res = app.saveO01(this.odata.odata);
                    if(res.status === 'success') {
                    }

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
