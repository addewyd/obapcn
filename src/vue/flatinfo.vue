<template>
    <div>
        id {{flatid}} <br />
        Общая площадь {{gensquare}}  <br />
        {{finfo}}
        <button @click="close">Close</button>
    </div>
</template>
<script>
import {app, bus} from '../app/app';

    export default {
        props: {
            flatid: String,
            gensquare: String,
            finfo: Object
        },
        methods: {
            close: function() {
                bus.$emit('close-fi');
            }
        }
    }
</script>

