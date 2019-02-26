<template>
<div>
    <h1>{{finfo.id}}</h1>
    <h3>
   tab 02 {{finfo}}
    </h3>
</div>
</template>
<script>

module.exports = {
    props: {
          finfo: Object
    },

    data: function() {
        return {
        }
    }
}

</script>
