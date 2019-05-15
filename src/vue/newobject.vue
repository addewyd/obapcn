<template>
<div>
    <h3>
      Намменование
        <span :class="{ 'control': true }" class="field">
        <input type = "text" name="nob_name" id="nob_name" v-model="nob_name"
            v-validate="'required'"/>
            <span v-show="errors.has('nob_name')"
                class="help is-danger">{{ errors.first('nob_name') }}</span>
        </span>
    </h3>
    <div>
    <button class="btn btn-primary" @click="save()">Сохранить</button>
    <button class="btn btn-primary" @click="cancel()">Отмена</button>
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
            console.log('SNO res', res);

            bus.$emit('refresh-data', res.id, res.name);
        },
        cancel: function() {
            bus.$emit('close-newobject');
        }
    }
}

</script>
