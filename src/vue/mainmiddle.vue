<template>
<div>
    <div class="topmenu">
        <button id="new_object" class="btn btn-primary" @click="newObject()">New object</button>
        <button class="btn btn-primary">Button</button>
        <button class="btn btn-primary">Button</button>
    </div>
    
    <h3>Objects</h3>
    <table>
    <tr v-for="record in objects">
       <td class="objitem" v-on:click="refreshdata(record.id,record.name)" >
           {{record.id}}
       </td>
       <td class="objitem" v-on:click="refreshdata(record.id,record.name)" >
           {{record.name}}
       </td>
       <td><button :id="'del-object-'+record.id" @click="delObject(record.id)">Del</button></td>
    </tr>
    </table>
    
    <modal-window v-if="showNewObject" @close="showNewObject = false">
        <div slot="body">                
           <new-object></new-object>
        </div>
        <div slot="footer">
        </div>
    </modal-window>    
    
</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {    
    data: function(){
        return {
            app: undefined,
            objects: [],
            showNewObject: false,
            currentid: 0
        };
    },
    mounted: function () {
        var self = this;
        bus.$on('objects-ready', function (n) {
            console.log('on', n, app);
            self.app = app;
            self.objects = app.objects;
        });
        bus.$on('close-newobject', function () {
            self.showNewObject = false;
        });
        bus.$on('save-newobject', function () {
            self.showNewObject = false;
        });
    
    },
    methods: {
        refreshdata: function(id, name) {
            this.currentid = id;
            bus.$emit('refresh-data', id, name);
        },
        newObject: function() {
            this.showNewObject = true;
            
        },
        delObject: async function(id) {
            console.log('del', id);
    
                this.$dialog
                .confirm({
                    title: "Really delete?",
                })
                .then(dialog => {
                     Promise.all([
                        app.delObject(id),
                        this.refreshdata(0, '')
                    ]);
                })
                .catch(() => { 
                    // resolve(false);
                });            
           
        }
    }
}
</script>
