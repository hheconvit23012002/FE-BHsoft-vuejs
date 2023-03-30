<template>
    <div>TEst</div>
</template>

<script>
import {  mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['users'])
    },
    mounted() {
        console.log(this.users)
    },
}
</script>