<template>
<div>
    <h3>
        New
    </h3>
    <button class="btn btn-primary" @click="close">Close</button>

</div>
</template>
<script>
import {app, bus, Vue} from '../app/app';
export default {
    data: function() {
        return {
        }
    },
    methods: {
        close: function() {
            bus.$emit('close-newobject');
        }
    }
}

</script>
