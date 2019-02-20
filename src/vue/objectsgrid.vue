<template>

<div>
    grid
</div>

</template>

<script>
import {app, bus} from '../app/app';
export default {    
    data: function(){
        return {
            app: undefined

        };
    },
    mounted: function () {
        var self = this;
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
        });
    }

}
</script>
