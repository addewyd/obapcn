<template>
    <div>
        <div style="font-size: 8pt">
            id {{flatid}} <br />
        </div>
        <button class="btn btn-primary" @click="close">Close</button>
    </div>
</template>
<script>
import {app, bus} from '../app/app';

    export default {
        props: {
            flatid: String
        },
        methods: {
            close: function() {
                bus.$emit('close-oi');
            }
        }
    }
</script>

