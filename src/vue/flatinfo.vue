<template>
    <div>
        <div style="font-size: 8pt">
            id {{flatid}} = {{finfo.id}}<br />
            Общая площадь {{gensquare}}  <br />
        </div>
        <button class="btn btn-primary" @click="close">Close</button>
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

