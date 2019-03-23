<template>
<div>
    <h2>
        tab 02 {{flatid}}
    </h2>
    <div>
        <div v-if="orderdata && orderdata.length > 0">
        Pay Shedule on {{orderdata[0].client}}
        <div style="font-weight: bold">    
            Дата Сумма %
        </div>    
        <div v-for="rec in psheddata">
        {{rec.pdate}} {{rec.psumm}} {{rec.percent}}
        </div>
        </div>
    </div>
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
            orderdata: this.odata,
            psheddata: [],
            dSave: this.saving
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(oi02)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(oi02) - SAVE');
                    val.state = false;
                } else {
                    console.log('watched(oi02) - nothing to do');
                }
            },
            deep:true
        }
    },
    methods: {
        
    },
    asyncComputed: {
        psheddataAsync: async function() {
            var pd = [];
            if(this.orderdata && this.orderdata.length > 0) {
    console.log('odid', this.orderdata[0].id);
                pd = await app.getPshedData(this.orderdata[0].id);
            } else {
            
            }
            this.psheddata = pd;
            return pd;
        }
    },
    
    created: function() {
    },
    beforeDestroy: function() {
    }
    
}

</script>
