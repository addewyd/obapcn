<template>
<div>
    <h3>
{{floorplot}}
    </h3>
    {{floorid}}
    <button class="btn btn-primary" @click="close">Close</button>
</div>
</template>
<script>

module.exports = {
    props: {
          floorid: String,
            floorplot: String
    },

    data: function() {
        return {
        }
    }
}

</script>
