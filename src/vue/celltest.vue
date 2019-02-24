<template>
    <div>
    <table style="border:1px solid blue; width: 200px">
    <tr>
    <td style="background-color: yellow; width: 90px">
        {{d.number}}
    </td>
    <td  style="background-color: #bbbbbb; width: 90px">
        {{d.square}}
    </td>
    </tr>
    <tr>
        <td>floor {{d.floor.floornum}}</td>
        <td style="background-color: #bbcbfb; width: 90px"> empty yet</td>
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
