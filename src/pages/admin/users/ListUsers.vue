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
                    <router-link class="btn btn-primary" :to="{ name: 'admin-user-create' }">Create</router-link>
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
                                    <router-link class="btn btn-success"
                                        :to="{ name: 'admin-user-edit', params: { id: value.id } }">
                                        Edit
                                    </router-link>
                                </td>
                                <td>
                                    <div class="btn btn-danger" @click="onDelete(value.id)">Delete</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <nav class="mt-4">
                        <ul class="pagination pagination-rounded mb-0" id="paginate">
                            <li @click.prevent="changePage(value.url)" v-for="(value, index) in users.pagination"
                                :key="index" class="page-item" :class="{ active: value.active }">
                                <a class="page-link" :href="value.url">
                                    {{ value.label }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { notification } from 'ant-design-vue';
export default {
    data() {
        return {
            q: this.$route.query.q || '',
            field: this.$route.query.field || 'name',
            page: this.$route.query.page || 1
        }
    },
    computed: {
        ...mapGetters(['users'])
    },
    methods: {
        ...mapActions(['getAllUsers', 'deleteUser']),
        changePage(url) {
            if (url !== null) {
                this.page = url.split('page=')[1]
                this.$router.push({ name: 'admin-users', query: { page: this.page, q: this.q, field: this.field } })
            }
        },
        searchSubmit() {
            this.getAllUsers({
                q: this.q,
                field: this.field,
            })
        },
        onDelete(e) {
            this.deleteUser(e).then(() => {
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
        this.getAllUsers({
            q: this.q,
            field: this.field,
            page: this.page,
        })
    },
    watch: {
        page: function () {
            this.getAllUsers({
                q: this.q,
                field: this.field,
                page: this.page,
            })
        }
    }
}
</script>

<style scoped>
.img {
    width: 80px;
}
</style>