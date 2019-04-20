<template>
<div>
    <h2>
        tab 02 {{flatid}}
    </h2>
    <div>
        <div v-if="odata.odata.id">
        Pay Shedule on {{odata.odata.client}}
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
          odata: Object,
          saving: Object
    },

    data: function() {
        return {
            //orderdata: this.odata,
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
            if(this.odata.odata.id) {
    console.log('odid', this.odata.odata.id);
                pd = await app.getPshedData(this.odata.odata.id);
            } else {

            }
            this.psheddata = pd;
            this.odata.odata.psheddata = pd;
            return pd;
        }
    },

    created: function() {
    },
    beforeDestroy: function() {
    }

}

</script>
