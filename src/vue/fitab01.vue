<template>
<div>
    <!--
    <h2>
   tab 01 {{finfo}}
    </h2>

   -->
   <div class="fi01 left">
       <div>
        <label for="floornum">Этаж</label>
        <span style="color: rgb(255, 0, 0);">*</span>
        <span :class="{ 'control': true }" class="field">        
            <input id="floornum" class="content-input" name="floornum" v-model="flatinfo.floornum" placeholder="" 
                v-validate="'required'"/>
            <span v-show="errors.has('floornum')" 
                class="help is-danger">{{ errors.first('floornum') }}</span>
        </span>
       </div>
       <div>
        <label for="fnumb">Номер</label>
        <span style="color: rgb(255, 0, 0);">*</span>
        <span :class="{ 'control': true }" class="field">        
            <input id="fnumb" class="content-input" name="fnumb" v-model="flatinfo.fnumb" placeholder="" 
                v-validate="'required'"/>
            <span v-show="errors.has('fnumb')" 
                class="help is-danger">{{ errors.first('fnumb') }}</span>
        </span>
       </div>
    </div>
    <div class="fi01 right">
        <div v-for="rec in squares">
           {{rec.code1c}} {{rec.name}} {{rec.square}}
        </div>
       
    </div>
    <div class="clear" />
</div>
</template>
<script>
import {Vue, app, bus} from '../app/app';
export default {
    props: {
          finfo: Object,
          saving: Object
    },

    data: function() {
        return {
            squares: [],
            flatinfo: this.finfo,
            dSave: this.saving
        };
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(Fi01)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(Fi01) - SAVE');
                    val.state = false;
                } else {
                    console.log('watched(Fi01) - nothing to do');
                }
            },
            deep:true
        }
    },
    
    asyncComputed: {
        msquares: async function() {
            console.log('ms', this.finfo.id);
            this.squares = await app.getSquares(this.finfo.id);
            return this.squares;
        }
    },
    
    created: function() {
    },
    beforeDestroy: function() {
    }    
}

</script>
