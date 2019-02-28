<template>
<div>
    <table>
        <tr v-for="rec in records" >
            <td style="font-size: 120%; font-weight:bold">{{ rec[0].floornum}}</td>
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
import ogrid from '../app/objectgrid';    
export default ogrid;    
</script>
