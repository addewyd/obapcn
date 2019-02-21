<template>
    <div style="border:1px solid blue; width: 200px">
    <div style="background-color: yellow; width: 90px">
        {{d.number}}
    </div>
    <div  style="background-color: #bbbbbb; width: 90px">
        {{d.square}}
    </div>
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
