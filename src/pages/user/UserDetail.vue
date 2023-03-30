<template>
    <div></div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    methods : {
        ...mapActions(['getUserDetail'])
    },
    mounted(){
        this.getUserDetail()
    }
}
</script>