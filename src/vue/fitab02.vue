<template>
<div>
    <h1>{{finfo.id}}</h1>
    <h3>
   tab 02 {{finfo}}
    </h3>
    dlen {{deals.length}}
    <div v-for="rec in deals">
        {{rec}}
    </div>
    <div>
    Deal: {{dealdata}}
    </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          finfo: Object
    },

    data: function() {
        return {
            deals: [],
            deal: undefined
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
    }
}

</script>
