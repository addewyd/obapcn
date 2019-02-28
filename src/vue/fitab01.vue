<template>
<div>
    <h2>
   tab 01 {{finfo}}
    </h2>

   <div v-for="rec in squares">
       {{rec.code1c}} {{rec.name}} {{rec.square}}
   </div>

</div>
</template>
<script>
import {app, bus} from '../app/app';
export default {
    props: {
          finfo: Object
    },

    data: function() {
        return {
            squares: []
        };
    },
    
    asyncComputed: {
        msquares: async function() {
            console.log('ms', this.finfo.id);
            this.squares = await app.getSquares(this.finfo.id);
            return this.squares;
        }
    },
    
    mounted: function() {
        //this.squares = app.getSquares(this.finfo.id);
    }
    
}

</script>
