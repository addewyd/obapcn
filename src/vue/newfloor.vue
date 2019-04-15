<template>
<div>
    <h3>
        New floor
    </h3>
    <div>
        <label for="floor_num">Floor Number</label> 
        <input type="number" id="floor_num" name="floor_num" min="-11"  max="200"
        v-model="floor_num" />
    </div>
    <div>
        <label for="flat_number">Number of flats</label> 
        <input type="number" id="flat_number" name="flat_number"  min="1"  max="200"
        v-model="flat_number" />
        
    </div>
    <div>
    <button class="btn btn-primary" @click="save">Save</button>
    <button class="btn btn-primary" @click="cancel">Cancel</button>
    </div>

</div>
</template>
<script>
import {app, bus, Vue} from '../app/app';
export default {
    props: {
        object_id: String
    },
    data: function() {
        return {
            floor_num: 0, //floor number
            flat_number: 1, // num of flats
            objectid: this.object_id
        }
    },
    methods: {
        save: async function() {
            bus.$emit('close-newfloor');
            var res = await app.saveNewFloor(this.objectid, this.floor_num, this.flat_number);
            bus.$emit('refresh-data');
            console.log('sno res', res);
        },
        cancel: function() {
            bus.$emit('close-newfloor');
        }
    }
}

</script>
