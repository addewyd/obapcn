<template>
<div>
    middle
    <!--{{app}}-->
    <div></div>
    <div v-for="record in objects">
       <span v-on:click="refreshdata(record.id)" >id  {{record.id}} name  {{record.name}}</span>
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
