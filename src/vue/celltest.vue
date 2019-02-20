<template>

    <div>
        <h1>cell test<br/>{{d}}</h1>
    </div>
</template>

<script>
import {app, bus} from '../app/app';
export default {  
    props: {
        d: String
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
