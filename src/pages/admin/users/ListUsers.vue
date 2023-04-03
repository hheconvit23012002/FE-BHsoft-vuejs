<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form class="form-inline mb-4" id="form-search" method="GET">
                        <input v-model="q" type="text" class="form-control mr-4" id="ip-search" placeholder="Search...">
                        <select v-model="field" class="form-control mr-4" id="id-field">
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="birthdate">Birthdate</option>
                            <option value="phone_number">PhoneNumber</option>
                            <option value="number_courses">NumberCourse</option>
                        </select>
                        <button class="btn btn-success" type="submit" @click.prevent="searchSubmit">Search</button>
                    </form>
                    <button class="btn btn-primary" @click="showCreate = true">Create</button>
                    <!-- <router-link class="btn btn-primary" :to="{ name: 'admin-user-create' }">Create</router-link> -->
                    <table class="table table-striped table-centered mb-0" id="table-data">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>logo</td>
                                <td>info</td>
                                <td>birthdate</td>
                                <td>sum course</td>
                                <td>edit</td>
                                <td>delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="value in users.data" :key="value.id">
                                <td>
                                    <router-link :to="{ name: 'admin-user-show', params: { id: value.id } }">
                                        {{ value.id }}
                                    </router-link>
                                </td>
                                <td>
                                    <img :src="value.logo" alt="" class="img">
                                </td>
                                <td>
                                    <span>{{ value.name }}</span>
                                    <br>
                                    <a :href="'mailto:' + value.email">{{ value.email }}</a>
                                    <br>
                                    <a :href="'tel:' + value.phone_number">{{ value.phone_number }}</a>
                                </td>
                                <td>
                                    {{ value.birthdate }}
                                </td>
                                <td>
                                    {{ value.number_courses }}
                                </td>
                                <td>
                                    <button class="btn btn-success" @click="edit(value.id)">Edit</button>
                                    <!-- <router-link class="btn btn-success"
                                        :to="{ name: 'admin-user-edit', params: { id: value.id } }">
                                        Edit
                                    </router-link> -->
                                </td>
                                <td>
                                    <div class="btn btn-danger" @click="onDelete(value.id)">Delete</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a-pagination class="mt-4" :pageSize="15" @change="getUsers" v-model:current="currentPage"
                        v-model:pageSizeOptions="pageSize" :total="totalCourses">
                        <template #itemRender="{ type, originalElement }">
                            <a class="page" v-if="type === 'prev'">Previous</a>
                            <a class="page" v-else-if="type === 'next'">Next</a>
                            <component :is="originalElement" v-else></component>
                        </template>
                    </a-pagination>
                </div>
            </div>
        </div>
    </div>
    <CreateUser v-if="showCreate" @close="closeCreatePopup"></CreateUser>
    <EditUser v-if="showEdit" :id="id" @close="closeEditPopup"></EditUser>
</template>
<script >
import { mapActions, mapGetters } from 'vuex'
import { notification } from 'ant-design-vue';
import CreateUser from './CreateUser.vue';
import EditUser from './EditUser.vue';
export default {
    data() {
        return {
            q: this.$route.query.q || '',
            field: this.$route.query.field || 'name',
            showCreate: false,
            showEdit: false,
            id: 0,
            currentPage: 1,
            totalCourses: 0,
            pageSize: ['15']
        }
    },
    computed: {
        ...mapGetters(['users'])
    },
    components: {
        CreateUser,
        EditUser
    },
    methods: {
        ...mapActions(['getAllUsers', 'deleteUser']),
        closeCreatePopup(){
            this.showCreate = false;
            this.currentPage = 1;
        },
        closeEditPopup(){
            this.showEdit = false;
            this.currentPage = 1;
        },
        edit(e) {
            this.id = e
            this.showEdit = true
        },
        searchSubmit() {
            this.getAllUsers({
                q: this.q,
                field: this.field,
            })
        },
        getUsers() {
            this.getAllUsers({
                q: this.q,
                field: this.field,
                page: this.currentPage,
            }).then((res) => {
                this.currentPage = res.current_page,
                this.totalCourses = res.total
                console.log(res)
            })
        },
        onDelete(e) {
            this.deleteUser(e).then(() => {
                this.getUsers()
                notification['success']({
                    message: 'Notification Access',
                    description: 'delete thanh cong',
                });
            }).catch(() => {
                notification['error']({
                    message: 'Notification Error',
                    description: 'delete that bai',
                });
            })
        }
    },
    mounted() {
        this.getUsers()
    },
    watch: {
        page: function () {
            this.getUsers()
        },
    }
}
</script>

<style scoped>
.img {
    width: 80px;
}
.page {
    display: block;
    background-color: white;
    padding: 0 10px;
}

.page:hover {
    background-color: rgb(54, 114, 232);
    color: white;
}
</style>