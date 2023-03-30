<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form class="form-horizontal" method="post" id="form-user" enctype="multipart/form-data" @submit.prevent="onSubmitForm">
                        <meta name="csrf-token" content="{{ csrf_token() }}" />
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" type="text" name="name" id="name" v-model="data.name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input class="form-control" type="email" name="email" id="email" v-model="data.email">
                        </div>
                        <div class="form-group">
                            <label for="birthday">Birthday</label>
                            <input class="form-control" type="date" name="birthdate" id="birthdate" v-model="data.birthdate">
                        </div>
                        <div class="form-group">
                            <label for="phone_number">Phone Number</label>
                            <input class="form-control" type="text" name="phone_number" id="phone_number" v-model="data.phone_number">
                        </div>
                        <div class="form-group">
                            <label for="logo">Avatar</label>
                            <input class="form-control" type="file" name="logo_new" @change="onFileChange" ref="inputFile">
                            <label for="logo">Use avatar old</label>
                            <img height="100" id="img-old" src="" alt="">
                            <br>
                        </div>
                        <div class="form-group">
                            <label>Course</label>
                            <a-select v-model:value="data.courses" mode="multiple" style="width: 100%" 
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
                logo_new: null,
                courses: [],
            }
        }
    },
    computed: {
        ...mapGetters(['courseSelect2'])
    },
    methods: {
        ...mapActions(['getCourseSelect2', 'getUser','editUser']),
        onSubmitForm() {
            this.editUser({data : this.data, id : this.$route.params.id}).then(()=>{
                notification['success']({
                    message: 'Notification Access',
                    description: 'update thanh cong',
                });
                this.$router.push({name : 'admin-users'})
            }).catch(()=>{
                notification['error']({
                    message: 'Notification Access',
                    description: 'update that bai',
                });
            })
        },
        onFileChange(event) {
            this.data.logo_new = event.target.files[0]
        },
        handleChange() {
            console.log(this.data.courses);
        },
        
    },
    mounted() {
        if (typeof this.$route.params.id !== "undefined") {
            this.getCourseSelect2()
            this.getUser(this.$route.params.id).then((res)=>{
                let user = res.data.data.user
                this.data.name = user.name
                this.data.email = user.email
                this.data.birthdate = user.birthdate
                this.data.phone_number = user.phone_number
                this.data.courses = res.data.data.course.map((res)=>{
                    return  res.courses.name + ' id : ' + res.courses.id
                })
            })
        }
    },
}
</script>