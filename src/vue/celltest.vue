<template>
    <div>
    
    <div class="fcell">
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
    <div v-if="isSold" class="fcell-over">
        Sold!!!
    </div>
    </div>

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
import celltest from '../app/celltest';
export default celltest;
</script>
