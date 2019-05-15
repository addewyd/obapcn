<template>
<div>
    <h2>
        tab 02 {{flatid}}
    </h2>
    <div>
        <div v-if="odata.odata.id">
        <div v-if="psheddata.length>0">
            Pay Shedule on {{odata.odata.client}}
            <table>
                <thead>
                    <tr>
                        <th style="border-bottom:1px solid;border-right:1px solid; padding: 0 3px">Дата</th>
                        <th style="border-bottom:1px solid;border-right:1px solid; padding: 0 3px"> Сумма</th>
                        <th style="border-bottom:1px solid;"> % </th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="rec in psheddata">
                <td style="border-right:1px solid; padding: 0 3px">{{rec.pdate}}</td>
                <td style="border-right:1px solid; padding: 0 3px"> {{rec.psumm}}</td>
                <td> {{rec.percent}}</td>
                </tr>
                </tbody>
            </table>
            <div>
            <button class="btn btn-warning fi02" @click="delpshed()">Удалить график</button>
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
                        min="1" value="1"
                       class="content-input"
                   name="cpsnum" v-model="cpsnum" placeholder="кол-во платежей"
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
            </div>  <!-- showCPS -->
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
import * as Utils  from '../app/utils';
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
                    var res = app.saveO01(this.odata.odata);
                    if(res.status === 'success') {
                    }
                } else {
                    console.log('watched(oi02) - nothing to do');
                }
            },
            deep:true
        }
    },
    methods: {
        delpshed: async function() {
            await app.delPshed(this.odata.odata.id);
            this.psheddata = [];
            this.odata.odata.psheddata = [];
        },
        createps: function(id) {
            this.showCPS = true;
        },
/*
"psheddata": [ { "id": "2915", "contractid": "731", "pdate": "2019-04-22",
    "psumm": "1822000", "percent": "0", "pmethod": "" } ]
 */
        saveCPS: function(id) {
            this.psheddata = [];
            this.odata.odata.psheddata = [];

            var n = parseInt(this.cpsnum);
            if(n < 1) {
                return;
            }

            if(!this.cpsdate) {
                this.cpsdate = (new Date()).toISOString().slice(0,10);
            }
            if(!this.cps1) {
                this.cps1 = '1';
            }

            var p = parseFloat(this.price);
            var p1 = parseFloat(this.cps1);
            var rest = p - p1;
            var pay = Math.floor(rest / n);
            console.log('sums', p, p1, rest, pay);
            //var dd = Date.parse(this.cpsdate);

            if(n == 1) {
                this.psheddata.push(
                {
                    id: null,
                    contractid: this.odata.odata.id,
                    pdate: this.cpsdate,
                    psumm: p,
                    percent: "0",
                    pmethod: ""
                }
                );
            }
            if(n == 2) {
                this.psheddata.push(
                {
                    id: null,
                    contractid: this.odata.odata.id,
                    pdate: this.cpsdate,
                    psumm: p1,
                    percent: "0",
                    pmethod: ""
                }
                );
                this.psheddata.push(
                {
                    id: null,
                    contractid: this.odata.odata.id,
                    pdate: Utils.addmon(this.cpsdate, 1),  // + 1 month
                    psumm: rest,
                    percent: "0",
                    pmethod: ""
                }
                );
            }
            if(n > 2) {
                this.psheddata.push(
                    {
                        id: null,
                        contractid: this.odata.odata.id,
                        pdate: this.cpsdate,
                        psumm: p1,
                        percent: "0",
                        pmethod: ""
                    }
                );
                for(var i = 0; i < n - 1; i ++) {
                    this.psheddata.push(
                    {
                        id: null,
                        contractid: this.odata.odata.id,
                        pdate: Utils.addmon(this.cpsdate, i + 1),  // + month
                        psumm: pay,
                        percent: "0",
                        pmethod: ""
                    }
                    );
                }
            }
            this.odata.odata.psheddata = this.psheddata;
            this.saving.state = true;

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
