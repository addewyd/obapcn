<template>
    <div>
    
    <div class="fcell" :style="cellstyle">
        <table :class="status">
        <tr>
        <td v-on:click="clickFI(true)" class="chess">
            N:{{fdata.fnumb}}
            <span style="font-size: 40%">D: {{deal?deal.STAGE_ID:""}}</span>
        </td>
        <td class="chess">
            {{fdata.square}} M<span style="font-size:60%; vertical-align: super">2</span> 
        </td>
        </tr>
        <tr>
            <td class="chess" v-on:click="clickOI(true)" >NR: {{d.nrooms}}</td>
            <td class="chess"> 
                {{fdata.price}}
            </td>
        </tr>
        </table>
    <div v-if="isSold" class="fcell-over">
        Sold!!!
    </div>
    </div>

    <!-- flat info modal dialog -->
    <modal-window v-if="showFI" @close="showFI = false">
        <div slot="body">                
           <fi-tabs :finfo="fdata" :saving="saving"></fi-tabs>
           <flat-info  :flatid="d.id" :gensquare="d.gensquare" :finfo="d"></flat-info>
        </div>
        <div slot="footer">
            -- Footer
        </div>
    </modal-window>

    <!-- order info modal dialog -->
    <modal-window v-if="showOI" @close="showOI = false">
        <div slot="body">                
           <oi-tabs :flatid="d.id" :odata="orderdata" :saving="saving"></oi-tabs>
           
           Договор на {{d}}
           
           <order-info  :flatid="d.id"></order-info>
        </div>
        <div slot="footer">
        </div>
    </modal-window>

    </div>
</template>

<script>
import celltest from '../app/celltest';
export default celltest;
</script>
