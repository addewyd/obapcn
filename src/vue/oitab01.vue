﻿<template>
<div>
    <h2>
   Id {{flatid}}
    </h2>
    <div v-if="odata.odata.id">

        <div>
            <label class="fi01" for="regnum">Номер</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="regnum" class="content-input"
                   name="regnum" v-model="odata.odata.regnum" placeholder=""
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
                   name="regdate" v-model="odata.odata.regdate" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('regdate')"
                class="help is-danger">{{ errors.first('regdate') }}</span>
            </span>
       </div>
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
                    var res = app.saveO01(this.odata.odata);
                    if(res.status === 'success') {
                    }
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
