<template>

<div>
    <table>
        <tr>
            <td>
                <component v-bind:is="cellComponent" v-bind:d="'A'"></component> 
            </td>
            <td>
                <component v-bind:is="cellcomp" v-bind:d="cc"></component> 
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
            app: undefined,
            cc: "B",
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
