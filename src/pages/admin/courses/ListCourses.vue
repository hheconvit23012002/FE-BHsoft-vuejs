<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form class="form-inline mb-4" id="form-search" method="GET">
                        <input v-model="q" type="text" class="form-control mr-4" id="ip-search" name="q"
                            placeholder="Search...">
                        <select v-model="field" class="form-control mr-4" id="ip-field" name="field">
                            <option value="name">Name</option>
                            <option value="description">Description</option>
                        </select>
                        <button class="btn btn-success" type="submit" @click.prevent="searchSubmit">Search</button>
                    </form>
                    <router-link class="btn btn-primary" :to="{ name: 'admin-course-create' }">Create</router-link>
                    <form action="#" class="d-inline">
                        <label class="btn btn-info ml-2 mb-0" for="csv">Import CSV</label>
                        <input type="file" name="csv" id="csv" class="d-none" @change="importFile"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                    </form>
                    <form action="#" class="d-inline">
                        <button class="btn btn-info ml-2 mb-0" @click.prevent="getCsv">Export CSV</button>
                    </form>
                    <table class="table table-striped table-centered mb-0" id="table-data">

                        <thead>
                            <tr>
                                <td>#</td>
                                <td>name</td>
                                <td>start date</td>
                                <td>end date</td>
                                <td>edit</td>
                                <td>delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="value in courses.data" :key="value.id">
                                <td>
                                    <router-link :to="{ name: 'admin-course-show', params: { id: value.id } }">
                                        {{ value.id }}
                                    </router-link>
                                </td>
                                <td>
                                    <span>{{ value.name }}</span>
                                </td>
                                <td>
                                    {{ value.start_date }}
                                </td>
                                <td>
                                    {{ value.end_date }}
                                </td>
                                <td>
                                    <router-link class="btn btn-success"
                                        :to="{ name: 'admin-course-edit', params: { id: value.id } }">
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
                            <li @click.prevent="changePage(value.url)" v-for="(value, index) in courses.pagination"
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
<script >
import { mapActions, mapGetters } from 'vuex';
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            q: this.$route.query.q || '',
            field: this.$route.query.field || 'name',
            page: this.$route.query.page || 1,
            file: null,
        }
    },
    computed: {
        ...mapGetters(['courses'])
    },
    methods: {
        ...mapActions(['getAllCourses', 'deleteCourse', 'importCsv','exportCsv']),
        changePage(url) {
            if (url !== null) {
                this.page = url.split('page=')[1]
                this.$router.push({ name: 'admin-courses', query: { page: this.page, q: this.q, field: this.field } })
            }
        },
        searchSubmit() {
            this.getAllCourses({
                q: this.q,
                field: this.field,
            })
        },
        importFile(event) {
            this.importCsv(event.target.files[0]).then(() => {
                notification['success']({
                    message: 'Notification Access',
                    description: 'import thanh cong',
                });
            }).catch(() => {
                notification['error']({
                    message: 'Notification Error',
                    description: 'import that bai',
                });
            })
        },
        getCsv(){
            window.location.href = "http://laravel_bhsoft_v1.test/api/export-csv"
        },
        onDelete(e) {
            this.deleteCourse(e).then(() => {
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
        this.getAllCourses({
            q: this.q,
            field: this.field,
            page: this.page,
        })
    },
    watch: {
        page: function () {
            this.getAllCourses({
                q: this.q,
                field: this.field,
                page: this.page,
            })
        }
    }
}
</script>
<style scoped></style>