<template>
<div>
    <h2>{{objectname}}</h2>
    <table>
        <tr v-for="rec in records" >
            <!-- assumed that there are NOT empty floors! -->

            <td  v-if="rec.length>0" v-on:click="clickFloor(rec[0].floorid,rec[0].floorplot)"
                style="font-size: 120%; font-weight:bold;cursor: pointer">{{ rec[0].floornum}}</td>
            <td v-for="cell in rec">
                <component v-bind:is="cellcomp"
                    v-bind:d="cell" :objectid="objectid" :objectname="objectname">
                </component>
            </td>
            <td v-if="rec.length>0">
                <button @click="delFloor(rec[0].floorid)">Del</button>
            </td>
            <td v-if="rec.length<1">
                <button @click="delEmptyFloors()">X</button>
            </td>


        </tr>
    </table>
    <button id="add-floor" class="btn btn-primary" @click="newFloor()">Add floor</button>

    <modal-window v-if="showNewFloor" @close="showNewFloor = false">
        <div slot="body">
           <new-floor :object_id="objectid" :objectname="objectname"></new-floor>
        </div>

    </modal-window>

    <modal-window v-if="showFloorPlan" @close="showFloorPlan = false">
        <div slot="body">
           <floor-plot :floorid="c_floorid" :floorplot="c_floorplot"></floor-plot>
        </div>
        <div slot="footer">
        </div>
    </modal-window>

</div>
</template>

<script>
import ogrid from '../app/objectgrid';
export default ogrid;
</script>
