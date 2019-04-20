<template>
<div>
    <h2>
   tab 01 {{flatid}}
    </h2>
    <div v-if="odata.id">

        <div>
            <label class="fi01" for="regnum">Номер</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="regnum" class="content-input"
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
                <input id="regdate" type="date" class="content-input"
                   name="regdate" v-model="odata.regdate" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('regdate')"
                class="help is-danger">{{ errors.first('regdate') }}</span>
            </span>
       </div>


        order {{odata}}
    </div>
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          flatid: String,
          odata: Object,
          saving: Object
    },

    data: function() {
        return {
            //orderdata: this.odata,
            dSave: this.saving
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(oi01)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(oi01) - SAVE');
                    val.state = false;
                } else {
                    console.log('watched(oi01) - nothing to do');
                }
            },
            deep:true
        }
    },

    created: function() {
    },
    beforeDestroy: function() {
    }
}

</script>
