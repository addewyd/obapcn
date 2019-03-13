<template>
<div>
    <table>
        <tr v-for="rec in records" >
            <!-- assumed that there are NOT empty floors! -->
            <td v-on:click="clickFloor(rec[0].floorid,rec[0].floorplot)"
                style="font-size: 120%; font-weight:bold;cursor: pointer">{{ rec[0].floornum}}</td>
            <td v-for="cell in rec">                
                <component v-bind:is="cellcomp" 
                    v-bind:d="cell">
                </component>
            </td>
        </tr>
    </table>
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
