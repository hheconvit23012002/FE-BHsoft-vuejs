<template>
    <div class="modal" @click="$emit('close')">
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <span class="close" @click="$emit('close')">X</span>
                    <form class="form-horizontal form-create" id="form-user" method="post" enctype="multipart/form-data"
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
    emits: ['close'],
    methods: {
        ...mapActions(['getCourseSelect2', 'createUser','getAllUsers']),
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
            validate.push({ rg: Validate.isEmpty(this.data.logo), title: "logo" });
            validate.push({ rg: Validate.isEmpty(this.data.course), title: "course" });
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
                this.createUser(this.data).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title : 'Success',
                        text: 'Thanh Cong',
                    })
                    this.getAllUsers()
                    this.$emit('close')
                }).catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data,
                    })
                })
            }

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