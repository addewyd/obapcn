<template>
<div>
    <h1>{{finfo.id}}</h1>
    <h3>
   <!-- tab 02 {{finfo}} -->
    </h3>
    dlen {{deals.length}}
<!--
    <div v-for="rec in deals">
        {{rec}}
    </div>
    -->
    <div v-if="dealdata">
    <div>
    Price {{dealdata.UF_CRM_PB_PRICE}}
    </div>
    <div>
    Project {{dealdata.UF_CRM_PB_PROJECT}}
    </div>
    <div>
    House {{dealdata.UF_CRM_PB_HOUSE}}
    </div>
    <div>
    Floor {{dealdata.UF_CRM_PB_FLOOR}}
    </div>
    <div>
    Number {{dealdata.UF_CRM_PB_NUMBER}}
    </div>
    </div>


    <select id="select-deal" v-model="finfo.deal_id">
        <option v-for="option in deals" v-bind:value="option.ID">
            {{ option.TITLE }}
        </option>
    </select>

    <div>
        Deal: <span style="font-size:50%">{{dealdata}}</span>
    </div>
    <div v-if="!dealdata">
        <button class="btn btn-primary" @click="createDeal()">Создать сделку</button>
    </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          finfo: Object,
          saving: Object,
          psquares: Array,
            objectid: String,
            objectname: String
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
                    var res = app.saveF01(this.finfo);
                    console.log(res);
                    if(res.status === 'success') {
                        this.finfo.squares_changed = this.squares_changed;
                    }

                    val.state = false;
                } else {
                    console.log('watched(Fi02) - nothing to do');
                }
            },
            deep:true
        }
    },

    methods: {
        createDeal: async function() {
            this.finfo.deal_id = await app.createDeal(this.finfo, this.objectname);
            console.log("new deal id in vue", this.finfo.deal_id);

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
