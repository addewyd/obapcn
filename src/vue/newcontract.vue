<template>
<div>
    <h3>
        New
    </h3>

        <div>
            <label class="fi01" for="regnum">Номер</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="n-regnum" class="content-input"
                   name="regnum" v-model="odata.regnum" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('regnum')"
                class="help is-danger">{{ errors.first('regnum') }}</span>
            </span>
       </div>
        <div>
            <label class="fi01" for="regdate">Дата</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="n-regdate" type="date" class="content-input"
                   name="regdate" v-model="odata.regdate" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('regdate')"
                class="help is-danger">{{ errors.first('regdate') }}</span>
            </span>
       </div>


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
    data: function() {
        return {
            odata: {
                regnum: undefined,
                regdate: undefined
            }
        }
    },
    methods: {
        save: async function() {
            var res = await app.saveNewContract(this.flatid, this.odata);
            bus.$emit('save-newcontract');
            console.log('SNC res', res);
        },
        cancel: function() {
            
            bus.$emit('close-addcontract');
        }
    }
}

</script>
