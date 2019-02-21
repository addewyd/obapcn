<template>
<div>
    main template (top) 

    <div>
        <app-main-middle />
        <objects-grid cellcomp="cell-test" />
    </div>
        <button class="btn btn-secondary" v-on:click="upddb">Update DB</button>

</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    data: function(){
        return {
            objects: []
        };
    },

    mounted: function () {
        var self = this;
        this.$nextTick(function () {
            console.log('app0', app);
            app.init().then(
                (result) => {
                    console.log('result', result);
                    self.objects = result;
                    app.objects = result;
                    bus.$emit('objects-ready');
                }).catch((err) => { 
                    console.log('err', err)
                });
            console.log('init not done yet');
        })
    },
    methods: {
        upddb: function() {
            app.upddb();
        }
    }
}
</script>