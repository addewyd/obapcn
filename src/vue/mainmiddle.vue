<template>
<div>
    middle
    {{app}}
    <div></div>
    <div v-for="record in objects">
      id      {{record.id}} name  {{record.name}}
     </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {    
    data: function(){
        return {
            app: undefined,
            objects: []
        };
    },
    mounted: function () {
        var self = this;
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
            self.objects = app.objects;
        });
    }

}
</script>
