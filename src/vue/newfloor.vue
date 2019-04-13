<template>
<div>
    <h3>
        New floor
    </h3>
    <div>
    <button class="btn btn-primary" @click="save">Save</button>
    <button class="btn btn-primary" @click="cancel">Cancel</button>
    </div>

</div>
</template>
<script>
import {app, bus, Vue} from '../app/app';
export default {
    props: {
        object_id: String
    },
    data: function() {
        return {
            nf_num: '',
            objectid: this.object_id
        }
    },
    methods: {
        save: async function() {
            var res = await app.saveNewFloor(this.objectid, this.nf_num);
            bus.$emit('close-newfloor');
        },
        cancel: function() {
            bus.$emit('close-newfloor');
        }
    }
}

</script>
