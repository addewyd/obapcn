<template>
<div>
    <p>
    <label for="app-id">app id</label>
    <input id="app-id" v-model="app_id"/>
    </p>
    <p>
    <label for="app-secret-code">app secret code</label>
    <input id="app-secret-code" v-model="app_secret_code"/>
    </p>
    <div id="inst-i-b">        
        <button v-on:click="install">Установить</button>
    </div>
    <div id="inst-i-b">        
        <button v-on:click="delopts">Delete options</button>
    </div>
</div>
</template>
<script>
import app from '../app/insts';
export default {
    data: function() {
        return {
            app: null,
            app_id: "",
            app_secret_code: ""
        }
    },
    methods: {
        install: function(event) {
            app.install(this.app_id, this.app_secret_code);
        },
        delopts: function(event) {
            app.delopts();
        }
    }
}

</script>

