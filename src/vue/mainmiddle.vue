<template>
<div>
    <h3>Objects</h3>
    <div v-for="record in objects">
       <span class="objitem" v-on:click="refreshdata(record.id)" >
           {{record.id}}  {{record.name}}
       </span>
    </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {    
    data: function(){
        return {
            app: undefined,
            objects: [],
            currentid: 0
        };
    },
    mounted: function () {
        var self = this;
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
            self.objects = app.objects;
        });
    },
    methods: {
        refreshdata: function(id) {
            this.currentid = id;
            bus.$emit('refresh-data', id);
        }
    }
}
</script>
