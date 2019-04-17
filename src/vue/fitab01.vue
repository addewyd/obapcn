<template>
<div>
    <!--
    <h2>
   tab 01 {{finfo}}
    </h2>

   -->
   <div class="fi01 left">
       <div>
            <label class="fi01" for="floornum">Этаж</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="floornum" class="content-input" disabled="true"
                   name="floornum" v-model="flatinfo.floornum" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('floornum')"
                class="help is-danger">{{ errors.first('floornum') }}</span>
            </span>
       </div>

       <div>
            <label class="fi01" for="fcode">Код</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="fcode" class="content-input" disabled="true"
                   name="floornum" v-model="flatinfo.code" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('fcode')"
                class="help is-danger">{{ errors.first('fcode') }}</span>
            </span>
       </div>

       <div>
        <label class="fi01" for="fnumb">Номер</label>
        <span style="color: rgb(255, 0, 0);">*</span>
        <span :class="{ 'control': true }" class="field">
            <input id="fnumb" class="content-input" name="fnumb" v-model="flatinfo.fnumb" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('fnumb')"
                class="help is-danger">{{ errors.first('fnumb') }}</span>
        </span>
       </div>

       <div>
        <label class="fi01" for="gensquare">Общая площадь</label>
        <span :class="{ 'control': true }" class="field">
            <input id="gensquare" class="content-input" name="gensquare"
                   v-model="flatinfo.gensquare" placeholder=""
                />
            <span v-show="errors.has('gensquare')"
                class="help is-danger">{{ errors.first('gensquare') }}</span>
        </span>
       </div>

       <div>
        <label class="fi01" for="nrooms">Комнат</label>
        <span :class="{ 'control': true }" class="field">
            <input id="nrooms" class="content-input" name="nrooms" type="number"
                min="1"
                   v-model="flatinfo.nrooms" placeholder="1"
                />
            <span v-show="errors.has('nrooms')"
                class="help is-danger">{{ errors.first('nrooms') }}</span>
        </span>
       </div>

       <div>
        <label class="fi01" for="price">Цена</label>
        <span :class="{ 'control': true }" class="field">
            <input id="price" class="content-input" name="price" type="number"
                    min="0"
                   v-model="flatinfo.price" placeholder=""
                />
            <span v-show="errors.has('price')"
                class="help is-danger">{{ errors.first('price') }}</span>
        </span>
       </div>

    </div>
    <div class="fi01 right">
        Помещения <button class="btn btn-success" @click="addPart(flatinfo.id)"> + </button>
        <table>
        <tr v-for="rec in squares">
            <td>
           {{rec.code1c}}
                </td>
                <td>
            {{rec.name}}
                </td>
                <td>
            {{rec.square}}
                </td>
                <td>
            <button style="font-size:75%">Del</button>
                </td>
        </tr>
        </table>
        <div v-if="showParts" class="selectparts">
                <select id="select-part" v-model="part_id">
                    <option v-for="option in parts" v-bind:value="option.id">
                {{ option.name }}
                    </option>
                </select>
                <button @click="showParts=false">save</button>
        </div>
        <span style="font-size:50%">{{parts}}</span>
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
            parts: [],
            part_id: 0,
            flatinfo: this.finfo,
            dSave: this.saving,
            showParts: false
        };
    },
    methods: {
        addPart: function(id) {
            this.showParts = true;
            console.log(id);
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(Fi01)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(Fi01) - SAVE');
                    val.state = false;
                    var res = app.saveF01(this.finfo);
                    console.log(res);
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
        },
        mparts: async function() {
            console.log('mp');
            this.parts = await app.getParts(this.finfo.id);
            return this.parts;
        }
    },

    created: function() {
    },
    beforeDestroy: function() {
    }
}

</script>
