<template>
    <div class="wrapper mm-active">
        <SideBar />
        <div class="content-page">
            <div class="content">
                <HeaderElement></HeaderElement>
                <!-- Start Content-->
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box">
                                <h4 class="page-title">Test</h4>
                            </div>
                        </div>
                    </div>
                    <ListUsers />
                    <!-- <router-view></router-view> -->
                </div>
            </div>
            <FooterElement></FooterElement>
        </div>
    </div>
</template>

<script>
import SideBar from './SideBar.vue';
import HeaderElement from './HeaderElement.vue';
import FooterElement from './FooterElement.vue';
import ListUsers from './../../pages/admin/users/ListUsers.vue';
export default {
    components : {
        SideBar,
        HeaderElement,
        FooterElement,
        ListUsers
    }
}
</script>
