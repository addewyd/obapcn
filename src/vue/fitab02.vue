﻿<template>
<div>

<!--
    <div v-for="rec in deals">
        {{rec}}
    </div>
    -->

    <div v-if="dealdata">
        Стадия {{deal_stage?deal_stage.NAME : ""}}

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


    <select id="select-deal" v-model="d_finfo.deal_id">
        <option v-for="option in deals" v-bind:value="option.ID">
            {{ option.TITLE }}
        </option>
    </select>

    <div v-if="debugout">
        Deal: <span style="font-size:50%">{{dealdata}}</span>
    </div>

    <div v-if="!dealdata">
        <button class="btn btn-primary fi02" @click="createDeal()">Создать сделку</button>
    </div>
    <div v-if="dealdata">
        <button class="btn btn-info fi02" @click="unlinkDeal()">Открепить сделку</button>
    </div>
    <div v-if="dealdata">
        <button class="btn btn-warning fi02" @click="deleteDeal()">Удалить сделку</button>
    </div>
    <div v-if="dealdata">
        <button class="btn btn-success fi02" @click="updateFromDeal()">Обновить данные из сделки</button>
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
            d_finfo: this.finfo,
            deals: [],
            deal: undefined,
            //deal_id: this.finfo.deal_id,
            dSave: this.saving,
            deals_changed: false,
            deal_stage: null,
            debugout: false
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
            this.d_finfo.deal_id = this.finfo.deal_id;
            console.log("new deal id in vue", this.finfo.deal_id);
            var d = await app.getDealData(this.finfo.deal_id);
            this.deal = d.data;
// not finished, refresh needed
            this.saving.state = true;
// now is
        },
        deleteDeal: async function() {
            var s = this;
            this.$dialog
                .confirm({
                    title: "Действительго удалить?",
                })
                .then(async function(dialog) {

                    await app.deleteDeal(s.finfo.deal_id);
                    s.finfo.deal_id = null;
                    s.d_finfo.deal_id = s.finfo.deal_id;
                    s.deal = undefined;
                    s.deals = this.deallist;
                    //console.log("new deal id in vue", s.finfo.deal_id);
                    s.saving.state = true;

                })
                .catch(() => {
                    // resolve(false);
                });
        },
        unlinkDeal: function() {
            this.finfo.deal_id = null;
            this.d_finfo.deal_id = this.finfo.deal_id;
            this.deal = undefined;
            this.deals = this.deallist;
            this.saving.state = true;
        },

        updateFromDeal: function() {
            if(this.deal) {
                this.finfo.price = this.deal.UF_CRM_PB_PRICE;
                this.finfo.floornum = this.deal.UF_CRM_PB_FLOOR;
                this.finfo.fnumb = this.deal.UF_CRM_PB_NUMBER;
                this.finfo.nrooms = this.deal.UF_CRM_PB_ROOMS;
                this.finfo.meterprice = this.deal.UF_CRM_PB_PRICE_METR;
                this.finfo.gensquare = this.deal.UF_CRM_PB_AREA;
                this.saving.state = true;
            }
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
                this.deal_stage =
                app.states.find( (e) => {
                    return e.STATUS_ID == this.deal.STAGE_ID
                } );
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
