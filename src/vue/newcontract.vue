<template>
<div>
    <h3>
        New
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
    props: {
        flatid: String
    },
    methods: {
        save: async function() {
            var res = await app.saveNewContract(this.flatid);
            bus.$emit('save-newcontract');
            console.log('SNC res', res);
        },
        cancel: function() {
            bus.$emit('close-addcontract');
        }
    }
}

</script>
