<template>

<div>
    <table>
        <tr v-for="rec in records" >
            <td style="font-size: 120%; font-weight:bold">{{rec[0].floornum}}</td>
            <td v-for="cell in rec">                
                <component v-bind:is="cellcomp" 
                    v-bind:d="cell">
                </component>
            </td>
        </tr>
    </table>
</div>

</template>

<script>
import {app, bus} from '../app/app';
export default {    
    props: {
        cellcomp: String
    },
    data: function(){
        return {
            objectid: 0,
            records: [
                [
                    {floor: 'f1', fnumb:'1-1', square: 22.5, price:0, nrooms:0},
                    {floor: 'f1', fnumb:'1-2', square: 27.5, price:0, nrooms:0}
                ],
                [
                    {floor: 'f2', fnumb:'2-1', square: 22.5, price:0, nrooms:0},
                    {floor: 'f2', fnumb:'2-3', square: 27.5, price:0, nrooms:0},
                    {floor: 'f2', fnumb:'2-4', square: 24.5, price:0, nrooms:0}
                ]
            ],
            app: undefined,
            cellComponent: this.cellcomp
        };
    },
    
    methods: {
        refreshdata: async function(id) {    
            var floors = await app.refreshdata(id);
            var d = await Promise.all(
                floors.map( (f) => {
                var ret = app.getFloorData(f.id);
                return ret;
            }));
            this.records = d;
        }
    },
    
    mounted: function () {
        var self = this;
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
        });
        bus.$on('refresh-data', function (n) {
            console.log('got refresh-data', n);
            self.objectid = n;
            self.refreshdata(n);
        });
    }
}
</script>
