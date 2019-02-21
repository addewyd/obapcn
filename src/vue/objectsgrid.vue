<template>

<div>
    <table>
        <tr v-for="rec in records" >
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
            records: [
                [
                    {floor: 'f1', number:'1-1', square: 22.5},
                    {floor: 'f1', number:'1-2', square: 27.5},
                    {floor: 'f1', number:'1-4', square: 24.5}
                ],
                [
                    {floor: 'f2', number:'2-1', square: 22.5},
                    {floor: 'f2', number:'2-2', square: 27.5},
                    {floor: 'f2', number:'2-3', square: 27.5},
                    {floor: 'f2', number:'2-4', square: 24.5}
                ],
                [
                    {floor: 'f2', number:'3-1', square: 23.5},
                    {floor: 'f2', number:'3-2', square: 67.5},
                    {floor: 'f2', number:'3-3', square: 67.0},
                    {floor: 'f2', number:'3-4', square: 67.0},
                    {floor: 'f2', number:'3-5', square: 24.5}
                ],
                [
                    {floor: 'f2', number: '4-1', square: 32.5},
                    {floor: 'f2', number: '4-2', square: 47.5},
                    {floor: 'f2', number: '4-4', square: 26.2}
                ]
            ],
            app: undefined,
            cellComponent: this.cellcomp
        };
    },
    mounted: function () {
        var self = this;
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
        });
    }

}
</script>
