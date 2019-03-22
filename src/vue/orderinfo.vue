<template>
    <div>
        <div style="font-size: 8pt">
            id {{flatid}} <br />
        </div>
        <button class="btn btn-primary" @click="save">Сохранить</button>
        <button class="btn btn-secondary" @click="close">Отмена</button>
    </div>
</template>
<script>
import {app, bus} from '../app/app';

    export default {
        props: {
            flatid: String
        },
        data: function() {
            return {
        //        orderdata: undefined
            };
        },
        methods: {
            close: function() {
                this.$parent.$parent.$emit('close-oi');
            },
            save: function() {
            }
        },
    
    created: function() {
    },
    beforeDestroy: function() {
    }
}
</script>

