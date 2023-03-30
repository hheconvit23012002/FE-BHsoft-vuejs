<template>
    <div class="cover">
        Hello
        <div class="content">
            <h3>Home Page</h3>
                <div class="nav">
                    <router-link :to="{name : 'signin'}">SignIn</router-link>
                    <router-link :to="{name : 'signup'}">Signup</router-link>
                </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.cover{
    padding-top: 20%;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
.content{
    display: flex;
    flex-direction: column;
    width: 384px;
    align-items: center;
    justify-content: center;
}
.nav{
    gap: 12px;
    flex-direction: row;
    display: flex;
}
.nav a {
    padding: 12px;
    background-color: green;
    border: none;
    color: aliceblue;
    border-radius: 4px;
}
</style>
