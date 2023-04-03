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
                    <!-- <router-link class="btn btn-primary" :to="{ name: 'admin-course-create' }">Create</router-link> -->
                    <button class="btn btn-primary" @click="showCreate = true">Create</button>
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
                                    <button class="btn btn-success" @click="edit(value.id)">Edit</button>
                                    <!-- <router-link class="btn btn-success"
                                        :to="{ name: 'admin-course-edit', params: { id: value.id } }">
                                        Edit
                                    </router-link> -->
                                </td>
                                <td>
                                    <div class="btn btn-danger" @click="onDelete(value.id)">Delete</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a-pagination class="mt-4" :pageSize="15" @change="getCourses" v-model:current="currentPage"
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
    <CreateCourse v-if="showCreate" @close="closeCreatePopup"></CreateCourse>
    <EditCourse v-if="showEdit" :id="id" @close="closeEditPopup"></EditCourse>
</template>
<script >
import { mapActions, mapGetters } from 'vuex';
import { notification } from 'ant-design-vue';
import CreateCourse from './CreateCourse.vue';
import EditCourse from './EditCourse.vue';
import axios from 'axios'
export default {
    data() {
        return {
            q: this.$route.query.q || '',
            field: this.$route.query.field || 'name',
            file: null,
            showCreate: false,
            showEdit: false,
            id: 0,
            currentPage: 1,
            totalCourses: 0,
            pageSize: ['15']
        }
    },
    components: {
        CreateCourse,
        EditCourse
    },
    computed: {
        ...mapGetters(['courses'])
    },
    methods: {
        ...mapActions(['getAllCourses', 'deleteCourse', 'importCsv', 'exportCsv']),
        edit(e) {
            this.id = e
            this.showEdit = true
        },
        closeCreatePopup(){
            this.showCreate = false;
            this.currentPage = 1;
        },
        closeEditPopup(){
            this.showEdit = false;
            this.currentPage = 1;
            console.log("ok")
        },
        searchSubmit() {
            this.currentPage = 1
            this.getCourses()
        },
        importFile(event) {
            this.getCourses()
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
        getCsv() {
            axios({
                url: 'http://laravel_bhsoft_v1.test/api/export-csv',
                method: 'GET',
                responseType: 'blob',
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("token")
                }
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    notification['success']({
                        message: 'Notification Access',
                        description: 'Export thanh cong',
                    });
                })
                .catch((error) => {
                    notification['error']({
                        message: 'Notification Error',
                        description: 'Export that bai',
                    });
                    console.log(error);
                });
            // window.location.href = "http://laravel_bhsoft_v1.test/api/export-csv"
        },
        getCourses() {
            this.getAllCourses({
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
            this.deleteCourse(e).then(() => {
                this.getCourses()
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
        this.getCourses()
    },
    watch: {
        page: function () {
            this.getCourses()
        }
    }
}
</script>
<style scoped>
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