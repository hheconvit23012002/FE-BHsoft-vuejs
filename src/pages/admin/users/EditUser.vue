<template>
    <div class="modal" @click="$emit('close')"></div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <span class="close" @click="$emit('close')">X</span>
                    <form class="form-horizontal form-create" id="form-user" method="post" enctype="multipart/form-data"
                        @submit.prevent="onSubmitForm">
                        <div class="form-group">
                            <div class="d-inline-flex">
                                <label for="name">Name </label>
                                <div class="invalid-feedback d-block ml-1" v-if="error.name">{{ error.name }}</div>
                            </div>
                            <input class="form-control" @blur="validate()" type="text" name="name" v-model="data.name"
                                :class="{ 'is-invalid': error.name }">
                        </div>
                        <div class="form-group">
                            <div class="d-inline-flex">
                                <label for="email">Email</label>
                                <div class="invalid-feedback d-block ml-1" v-if="error.email">{{ error.email }}</div>
                            </div>
                            <input class="form-control" @blur="validate()" type="email" name="email" v-model="data.email"
                                :class="{ 'is-invalid': error.email }">
                        </div>
                        <div class="form-group">
                            <div class="d-inline-flex">
                                <label for="birthday">Birthday</label>
                                <div class="invalid-feedback d-block ml-1" v-if="error.birthdate">{{ error.birthdate }}
                                </div>
                            </div>
                            <input class="form-control" @blur="validate()" type="date" name="birthdate"
                                v-model="data.birthdate" :class="{ 'is-invalid': error.birthdate }">
                        </div>
                        <div class="form-group">
                            <div class="d-inline-flex">
                                <label for="phone_number">Phone Number</label>
                                <div class="invalid-feedback d-block ml-1" v-if="error.phone_number">{{ error.phone_number
                                }}</div>
                            </div>
                            <input class="form-control" @blur="validate()" type="text" name="phone_number"
                                v-model="data.phone_number" :class="{ 'is-invalid': error.phone_number }">
                        </div>
                        <div class="form-group">
                            <div class="d-inline-flex">
                                <label for="logo">Avatar</label>
                                <div class="invalid-feedback d-block ml-1" v-if="error.logo">{{ error.logo }}</div>
                            </div>
                            <input class="form-control" @blur="validate()" id="input-logo" type="file" name="logo"
                                @change="onFileChange" :class="{ 'is-invalid': error.logo }">
                            <img v-if="imageUrl" class="mt-2 " style="width: 200px; border-radius: 50%;" :src="imageUrl" alt="Uploaded image">
                        </div>
                        <div class="form-group">
                            <div class="d-inline-flex">
                                <label>Course</label>
                                <div class="invalid-feedback d-block ml-1" v-if="error.course">{{ error.course }}</div>
                            </div>
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
            },
            error: {
                name: '',
                email: '',
                birthdate: '',
                phone_number: '',
                logo: '',
                course: '',
            },
            submited: false,
            imageUrl: null
        }
    },
    computed: {
        ...mapGetters(['courseSelect2'])
    },
    emits: ['close'],
    methods: {
        ...mapActions(['getCourseSelect2', 'getUser', 'editUser', 'getAllUsers']),
        validate() {
            let flag = true
            if (this.submited) {
                this.error = {
                    name: '',
                    email: '',
                    birthdate: '',
                    phone_number: '',
                    logo: '',
                    course: '',
                }
                if (Validate.isEmpty(this.data.name).status === false) {
                    flag = false
                    this.error.name = Validate.isEmpty(this.data.name).text
                }
                if (Validate.isEmpty(this.data.email).status === false) {
                    flag = false
                    this.error.email = Validate.isEmpty(this.data.email).text
                } else if (Validate.isEmail(this.data.email).status === false) {
                    flag = false
                    this.error.email = Validate.isEmpty(this.data.email).text
                }
                if (Validate.isEmpty(this.data.birthdate).status === false) {
                    flag = false
                    this.error.birthdate = Validate.isEmpty(this.data.birthdate).text
                } else if (Validate.isDate(this.data.birthdate).status === false) {
                    flag = false
                    this.error.email = Validate.isDate(this.data.birthdate).text
                } else if (Validate.isBirthDate(this.data.birthdate).status === false) {
                    flag = false
                    this.error.birthdate = Validate.isBirthDate(this.data.birthdate).text
                }
                if (Validate.isEmpty(this.data.phone_number).status === false) {
                    flag = false
                    this.error.phone_number = Validate.isEmpty(this.data.phone_number).text
                } else if (Validate.isPhoneNumber(this.data.phone_number).status === false) {
                    flag = false
                    this.error.phone_number = Validate.isDate(this.data.phone_number).text
                }
            }

            return flag;
        },
        onSubmitForm() {
            this.submited = true
            let flag = this.validate()
            if (flag) {
                this.editUser({ data: this.data, id: this.id }).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
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
            this.data.logo_new = event.target.files[0];
            this.imageUrl = URL.createObjectURL(this.data.logo_new)
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
                this.imageUrl = 'http://laravel_bhsoft_v1.test/storage/'+user.logo
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
    overflow: auto;
    height: 574px;
}
.card {
    margin-bottom: 0;
}
.close {
    color: #aaaaaa;
    float: right;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}
.col-12 {
    padding: 0;
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