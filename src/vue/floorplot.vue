<template>
<div>
    <h3>
{{floorplot}}
    </h3>
    {{floorid}} <br />
    <button class="btn btn-primary" @click="close">Close</button>
    <div v-if="floorplot">
        <img :src="'img/'+floorplot" alt="no image" width="800"/>
    </div>
    <div v-else="">
        No image
        <label for="somefile1">План этажа</label>
            <div v-for="fname in somefile1_obj">
            <div
                class="file-name">{{fname.name}},
                    {{fname.size}}</div>
            </div>

        <p :class="{ 'control': true }" class="field file" >
            <span class="file-input">Добавить файл</span>
            <input class="file-input" type="file" id="somefile1" name="somefile1"
                accept="image/jpeg,image/png,image/gif"
                @change="filesChange($event.target.name, $event.target.files)"
                  />
            <span v-show="errors.has('somefile1')"
                class="help is-danger">{{ errors.first('somefile1') }}</span>
        </p>
        <button class="btn btn-primary" @click="save()">Save</button>

    </div>

</div>
</template>
<script>
import {app, bus, Vue} from '../app/app';
export default {
    props: {
          floorid: String,
          floorplot: String
    },

    data: function() {
        return {
            somefile1: '',
            somefile1_obj: []

        }
    },
    methods: {
        close: function() {
            bus.$emit('close-floorplot');
        },
        filesChange(name, files) {
            console.log('FileC', name);
            console.log('Files:', files, files.length);
            if (name === 'somefile1') {
                this.somefile1_obj = files;
                this.somefile1 = 'somefile1';
            } else {
                console.log('FC?');
            }
        },
        save: async function() {
            if(this.somefile1_obj.length > 0) {
                var res = await app.saveFloorPlot(this.floorid, this.somefile1_obj);
                // refresh
                console.log(res);
            }
        }
    }
}

</script>
