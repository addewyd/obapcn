<template>
<div>
    main template (top) 
        <button class="btn btn-secondary" v-on:click="upddb">Update DB</button>

</div>
</template>
<script>
import app from '../app/app';
export default {
    mounted: function () {
        this.$nextTick(function () {
            console.log('app0', app);
            app.init().then(
                (result) => {
                    console.log('result', result);
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