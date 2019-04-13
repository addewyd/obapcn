<template>
<div>
    <h3>
        New
        <input type = "text" id="new-object-name" v-model="nob_name" />
    </h3>
    <div>
    <button class="btn btn-primary" @click="save()">Save</button>
    <button class="btn btn-primary" @click="cancel()">Cancel</button>
    </div>

</div>
</template>
<script>
import {app, bus, Vue} from '../app/app';
export default {
    data: function() {
        return {
            nob_name: ''
        }
    },
    methods: {
        save: async function() {
            var res = await app.saveNewObject(this.nob_name);
            bus.$emit('close-newobject');
        },
        cancel: function() {
            bus.$emit('close-newobject');
        }
    }
}

</script>
