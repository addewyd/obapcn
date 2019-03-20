<template>
<div>
    <h1>{{finfo.id}}</h1>
    <h3>
   tab 02 {{finfo}}
    </h3>
    dlen {{deals.length}}
    <div v-for="deal in deals">
        {{deal}}
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
            deals: []
        }
    },
    
    asyncComputed: {
        deallist: async function() {
            var d = await app.getDeals();
            this.deals = d.data;
            console.log('next, total: ', d.nxt, d.total);
            return this.deals;
        }
    }
}

</script>
