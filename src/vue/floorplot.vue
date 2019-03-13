<template>
<div>
    <h3>
{{floorplot}}
    </h3>
    {{floorid}} <br />
    <button class="btn btn-primary" @click="close">Close</button>
    <div v-if="floorplot">
        <img :src="'img/'+floorplot" alt="no image" width="800"/>
    </div>
    <div v-else>
        No image
    </div>

</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          floorid: String,
          floorplot: String
    },

    data: function() {
        return {
        }
    },
    methods: {
        close: function() {
            bus.$emit('close-floorplot');
        }
    }
}

</script>
