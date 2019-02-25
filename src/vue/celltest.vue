<template>
    <div>
    <table class="chess">
    <tr>
    <td class="chess" style="background-color: yellow;">
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
    </div>
</template>

<script>
import {app, bus} from '../app/app';
export default {  
    props: {
        d: Object
    }
}
</script>
