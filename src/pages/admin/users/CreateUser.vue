<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form class="form-horizontal" id="form-user" method="post" enctype="multipart/form-data"
                        @submit.prevent="onSubmitForm">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" type="text" name="name" v-model="data.name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input class="form-control" type="email" name="email" v-model="data.email">
                        </div>
                        <div class="form-group">
                            <label for="birthday">Birthday</label>
                            <input class="form-control" type="date" name="birthdate" v-model="data.birthdate">
                        </div>
                        <div class="form-group">
                            <label for="phone_number">Phone Number</label>
                            <input class="form-control" type="text" name="phone_number" v-model="data.phone_number">
                        </div>
                        <div class="form-group">
                            <label for="logo">Avatar</label>
                            <input class="form-control" id="input-logo" type="file" name="logo" @change="onFileChange">
                        </div>
                        <div class="form-group">
                            <label>Course</label>
                            <a-select v-model:value="data.course" mode="multiple" style="width: 100%" 
                                placeholder="Please select" :options="this.courseSelect2.map((res) => {
                                    return {  value: '' + res.name + ' id : ' + res.id }
                                })" @change="handleChange"></a-select>
                        </div>
                        <button class="btn btn-primary">submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            data: {
                name: '',
                email: '',
                birthdate: '',
                phone_number: '',
                logo: null,
                course: [],
            }
        }
    },
    computed: {
        ...mapGetters(['courseSelect2'])
    },
    methods: {
        ...mapActions(['getCourseSelect2', 'createUser']),
        onSubmitForm() {
            this.createUser(this.data).then(() => {
                notification['success']({
                    message: 'Notification Access',
                    description: 'create thanh cong',
                });
                this.$router.push({ name: 'admin-users' })
            }).catch(() => {
                notification['error']({
                    message: 'Notification Access',
                    description: 'create that bai',
                });
            })
        },
        onFileChange(event) {
            this.data.logo = event.target.files[0]
        },
        handleChange() {
            console.log(this.data.course);
        },
    },
    mounted() {
        this.getCourseSelect2()
    },
}
</script>