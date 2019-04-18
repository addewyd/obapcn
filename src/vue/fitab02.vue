<template>
<div>
    <h1>{{finfo.id}}</h1>
    <h3>
   tab 02 {{finfo}}
    </h3>
    dlen {{deals.length}}
<!--
    <div v-for="rec in deals">
        {{rec}}
    </div>
    -->>
    <select id="select-deal" v-model="finfo.deal_id">
        <option v-for="option in deals" v-bind:value="option.ID">
            {{ option.TITLE }}
        </option>
    </select>

    <div>
        Deal: <span style="font-size:50%">{{dealdata}}</span>
    </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          finfo: Object,
          saving: Object,
          psquares: Array
    },

    data: function() {
        return {
            deals: [],
            deal: undefined,
            //deal_id: this.finfo.deal_id,
            dSave: this.saving
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(Fi02)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(Fi02) - SAVE');
                    var res = app.saveF01(this.finfo, this.psquares);
                    console.log(res);

                    val.state = false;
                } else {
                    console.log('watched(Fi02) - nothing to do');
                }
            },
            deep:true
        }
    },

    asyncComputed: {
        deallist: async function() {
            var d = await app.getDeals();
            this.deals = d.data;
            console.log('next, total: ', d.nxt, d.total);
            return this.deals;
        },
        dealdata: async function() {
            if(this.finfo.deal_id) {
                var d = await app.getDealData(this.finfo.deal_id);
                if(d.success)
                    this.deal = d.data;
                else
                    console.log('error(ft)',d.data);

                this.deal = d.data;
            }
            return this.deal;
        }
    },

    created: function() {
    },
    beforeDestroy: function() {
    }

}

</script>
