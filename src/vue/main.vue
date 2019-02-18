<template>
<div>
    main template

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
    }
}
</script>