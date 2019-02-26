<template>
    <div>
    <table :class="status">
    <tr>
    <td v-on:click="click(true)" class="chess" style="background-color: yellow;">
        N:{{d.fnumb}}
    </td>
    <td class="chess"   style="background-color: #bbbbbb;">
        {{d.square}} M<span style="font-size:60%; vertical-align: super">2</span> 
    </td>
    </tr>
    <tr>
        <td class="chess" >NR: {{d.nrooms}}</td>
        <td class="chess" style="background-color: #bbcbfb;"> 
            {{d.price}}
        </td>
    </tr>
    </table>

    <!-- flat info modal dialog -->
    <modal-window v-if="showFI" @close="showFI = false">
        <div slot="body">                
           <fi-tabs :finfo="d"></fi-tabs>
           <flat-info  :flatid="d.id" :gensquare="d.gensquare" :finfo="d"></flat-info>
        </div>
        <div slot="footer">
            -- Footer
        </div>
    </modal-window>

    </div>
</template>

<script>
import {app, bus} from '../app/app';
export default {  
    props: {
        d: Object
    },
    data: function() {
        return {
            showFI: false
        }
    },
    methods: {
        click: function(c) {
            this.showFI = c;
        }
    },
    computed: {
        status: function() {
            if(parseInt(this.d.sold) > 0) return "chess f-sold";
            return "chess"
        }
    },
    mounted: function () {
        var self = this;
        bus.$on('close-fi', function () {
            self.showFI = false;
        });
    }
}
</script>
