<template>
    <div>
        <div style="font-size: 8pt">
            id {{flatid}} = {{finfo.id}} {{finfo.deal_id}}<br />
            Общая площадь {{gensquare}}  <br />
        </div>
        <button class="btn btn-primary" @click="save">Сохранить</button>
        <button class="btn btn-secondary" @click="close">Отмена</button>
    </div>
</template>
<script>
import {app, bus} from '../app/app';

    export default {
        props: {
            flatid: String,
            gensquare: String,
            finfo: Object
        },
        data: function() {
            return {
                flatinfo: this.finfo
            }
        },
        methods: {
            close: function() {
    // modal-window -> celltest
                this.$parent.$parent.$emit('close-fi');
            },
            save: function() {
            }
        }
    }
</script>

