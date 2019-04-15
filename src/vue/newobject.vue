<template>
<div>
    <h3>
        New
        <span :class="{ 'control': true }" class="field">
        <input type = "text" name="nob_name" id="nob_name" v-model="nob_name"
            v-validate="'required'"/>
            <span v-show="errors.has('nob_name')" 
                class="help is-danger">{{ errors.first('nob_name') }}</span>
        </span>
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
            bus.$emit('save-newobject');
            bus.$emit('refresh-data');
        },
        cancel: function() {
            bus.$emit('close-newobject');
        }
    }
}

</script>
