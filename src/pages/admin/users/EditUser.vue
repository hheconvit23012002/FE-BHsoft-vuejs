<template>
    <div class="modal" @click="$emit('close')"></div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <span class="close" @click="$emit('close')">X</span>
                    <form class="form-horizontal" method="post" id="form-user" enctype="multipart/form-data"
                        @submit.prevent="onSubmitForm">
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
                            <input class="form-control" type="date" name="birthdate" id="birthdate"
                                v-model="data.birthdate">
                        </div>
                        <div class="form-group">
                            <label for="phone_number">Phone Number</label>
                            <input class="form-control" type="text" name="phone_number" id="phone_number"
                                v-model="data.phone_number">
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
                                    return { value: '' + res.name + ' id : ' + res.id }
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
import Swal from 'sweetalert2';
import Validate from '@/validate/index'
export default {
    props: [
        'id'
    ],
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
    emits: ['close'],
    methods: {
        ...mapActions(['getCourseSelect2', 'getUser', 'editUser','getAllUsers']),
        onSubmitForm() {
            let flag = true;
            let validate = [];
            validate.push({ rg: Validate.isEmpty(this.data.name), title: "name" });
            validate.push({ rg: Validate.isEmpty(this.data.email), title: "email" });
            validate.push({ rg: Validate.isEmail(this.data.email), title: "email" });
            validate.push({ rg: Validate.isEmpty(this.data.birthdate), title: "birth_date" });
            validate.push({ rg: Validate.isDate(this.data.birthdate), title: "birth_date" });
            validate.push({ rg: Validate.isBirthDate(this.data.birthdate), title: "birth_date" });
            validate.push({ rg: Validate.isEmpty(this.data.phone_number), title: "phone_number" });
            validate.push({ rg: Validate.isPhoneNumber(this.data.phone_number), title: "phone_number" });
            for (let i = 0; i < validate.length; i++) {
                if (validate[i].rg.status === false) {
                    flag = false;
                    Swal.fire({
                        icon: 'error',
                        title: validate[i].title,
                        text: validate[i].rg.text,
                    })
                    break;
                }
            }
            if (flag) {
                console.log(this.id)
                this.editUser({ data: this.data, id: this.id }).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title : 'Success',
                        text: 'Thanh Cong',
                    })
                    this.getAllUsers()
                    this.$emit('close')
                }).catch((err) => {
                    console.log(err.response.data)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.message,
                    })
                })
            }
        },
        onFileChange(event) {
            this.data.logo_new = event.target.files[0]
        },
        handleChange() {
            console.log(this.data.courses);
        },

    },
    mounted() {
        if (typeof this.id !== "undefined") {
            this.getCourseSelect2()
            this.getUser(this.id).then((res) => {
                let user = res.data.data.user
                this.data.name = user.name
                this.data.email = user.email
                this.data.birthdate = user.birthdate
                this.data.phone_number = user.phone_number
                this.data.courses = res.data.data.course.map((res) => {
                    return res.courses.name + ' id : ' + res.courses.id
                })
            })
        }
    },
}
</script>
<style scoped>
.modal {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.row {
    position: fixed;
    z-index: 4;
    top: 100px;
    display: flex;
    left: 40%;
}

.close {
    color: #aaaaaa;
    float: right;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    background-color: red;
}

.row {
    width: 40%;
}

.card-body {
    /* padding: 20px 50px; */
    width: 100%;
}

.form-create {
    width: 100%;
}
</style>