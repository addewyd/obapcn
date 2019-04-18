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
                <input :id="'psq_'+rec.code1c" :name="'psq_'+rec.code1c"
                    type="number" v-model.lazy="rec.square" @change="sq_change()"/>
                </td>
                <td>
            <button @click="delSquare(rec.id)" style="font-size:75%">Del</button>
                </td>
        </tr>
        </table>
        <div v-if="showParts" class="selectparts">
                <select id="select-part" v-model="part_id">
                    <option v-for="option in parts_sp()" v-bind:value="option.id">
                {{ option.name }}
                    </option>
                </select>
                <button class="btn btn-brimary" @click="addNewPart()">OK</button>
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
          saving: Object,
          psquares:  Array
    },

    data: function() {
        return {
            squares: this.psquares,
            parts: [],
            part_id: 0,
            flatinfo: this.finfo,
            dSave: this.saving,
            showParts: false,
            squares_changed: false
        };
    },
    methods: {
        addPart: function(id) {
            this.showParts = true;
            console.log(id);
        },
        parts_sp: function() {
            return this.parts.filter(e => {
                var f = this.squares.find(s => {
                    if (s.parttypeid == e.id) return s;
                    return false;
                });
                return !f;
            });
        },
        addNewPart: function() {
            if(this.part_id > 0) {
                var f = this.parts.find(s => {
                    if (s.id == this.part_id) return s;
                    return false;
                });
                if(f) {
                    var sq = this.squares;
                    sq.push(f);
                    this.squares_changed = true;
                    this.flatinfo.squares_changed = true;
                    this.squares = sq;
                    this.flatinfo.squares = sq;
                    //console.log('parts', this.parts);
                }
            }
            this.part_id = 0;
            this.showParts = false;

        },
        delSquare: function(id) {
            var f = this.squares.filter(e => {
                return e.id !== id;
            });
            this.squares = f;
            this.flatinfo.squares = f;
            this.flatinfo.squares_changed = true;
            this.squares_changed = true;
        },
        sq_change: function() {
            console.log('SQCH');
            this.flatinfo.squares = this.squares;
            this.flatinfo.squares_changed = true;
            this.squares_changed = true;
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
                    if(res.status === 'success') {
                        this.squares_changed = false;
                        this.flatinfo.squares_changed = this.squares_changed;
                    }
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
            if(!this.flatinfo.squares_changed) {
                this.squares = await app.getSquares(this.finfo.id);
                this.finfo.squares = this.squares;
            }
            return this.squares;
        },
        mparts: async function() {
            console.log('mp');
            this.parts = await app.getParts(this.finfo.id);
            return this.parts;
        }
    },

    created: function() {
        if(this.flatinfo.squares_changed) {
            this.squares_changed = this.flatinfo.squares_changed;
            this.squares = this.flatinfo.squares;
        }
    },
    beforeDestroy: function() {
        this.flatinfo.squares_changed = this.squares_changed;
        this.flatinfo.squares = this.squares;
    }
}

</script>
