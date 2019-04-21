<template>
<div>
    <h2>
        tab 02 {{flatid}}
    </h2>
    <div>
        <div v-if="odata.odata.id">
        <div v-if="psheddata.length>0">
            Pay Shedule on {{odata.odata.client}}
            <div style="font-weight: bold">
                Дата Сумма %
            </div>
            <div v-for="rec in psheddata">
                {{rec.pdate}} {{rec.psumm}} {{rec.percent}}
            </div>
        </div>
        <div v-else="">

            <div v-if="showCPS">

            <modal-window>
                <div slot="header"></div>
                <div slot="body">
                График платежей по {{odata.odata.regnum}}
                <div>Общая сумма {{price}}</div>

        <div>
            <label class="fi01" for="cps1">Первый взнос</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="cps1" class="content-input" type="number"
                    min="0" :max="price"
                   name="cps1" v-model="cps1" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('cps1')"
                class="help is-danger">{{ errors.first('cps1') }}</span>
            </span>
       </div>
        <div>
            <label class="fi01" for="cpsdate">Дата</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="cpsdate" type="date" class="content-input"
                   name="cpsdate" v-model="cpsdate" placeholder=""
                v-validate="'required'"/>
            <span v-show="errors.has('cpsdate')"
                class="help is-danger">{{ errors.first('cpsdate') }}</span>
            </span>
       </div>
        <div>
            <label class="fi01" for="cpsnum">Количество</label>
            <span style="color: rgb(255, 0, 0);">*</span>
            <span :class="{ 'control': true }" class="field">
                <input id="cpsnum" type="number"
                        min="1"
                       class="content-input"
                   name="cpsnum" v-model="cpsnum" placeholder="1"
                v-validate="'required'"/>
            <span v-show="errors.has('cpsnum')"
                class="help is-danger">{{ errors.first('cpsnum') }}</span>
            </span>
       </div>



                <button class="btn btn-primary" @click="saveCPS()">
                    OK
                </button>
                <button class="btn btn-primary" @click="closeCPS()">
                    Cancel
                </button>
                </div>
            </modal-window>
            </div>
            <div v-else="">
                <button class="btn btn-primary" @click="createps(odata.odata.id)">
                    Сформировать график платежей</button>
            </div>

        </div>
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
          price: undefined,
          saving: Object
    },

    data: function() {
        return {
            //orderdata: this.odata,
            psheddata: [],
            showCPS: false,
            psChanged: false,
            dSave: this.saving,
            cps1: undefined,
            cpsdate: undefined,
            cpsnum: undefined
        }
    },
    watch : {
        dSave: {
            handler: function(val) {
                console.log('watched(oi02)', val.state);
                if(val.state) {
                    // send back
                    console.log('watched(oi02) - SAVE');
                    val.state = false;
                } else {
                    console.log('watched(oi02) - nothing to do');
                }
            },
            deep:true
        }
    },
    methods: {
        createps: function(id) {
            this.showCPS = true;
        },
        saveCPS: function(id) {
            var n = parseInt(this.cpsnum);
            var p = parseFloat(this.price);
            var p1 = parseFloat(this.cps1);
            var rest = p - p1;
            var pay = rest / n;

            this.showCPS = false;
        },
        closeCPS: function(id) {
            this.psheddata = [];
            this.odata.odata.psheddata = [];
            this.showCPS = false;
        }
    },
    asyncComputed: {
        psheddataAsync: async function() {
            var pd = [];
            if(this.odata.odata.id) {
    console.log('odid', this.odata.odata.id);
                pd = await app.getPshedData(this.odata.odata.id);
            } else {

            }
            this.psheddata = pd;
            this.odata.odata.psheddata = pd;
            return pd;
        }
    },

    created: function() {
    },
    beforeDestroy: function() {
    }

}

</script>
