<template>
    <div class="navbar-custom">
        <ul class="list-unstyled topbar-right-menu float-right mb-0">
            <li class="notification-list">
                <a class="nav-link right-bar-toggle">
                    <i class="mdi mdi-logout noti-icon"></i>
                    <span class="btn" @click="processLogout">Logout</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods : {
        processLogout(){
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            this.$router.push({ name: 'homepage' })
        }
    }
}
</script>