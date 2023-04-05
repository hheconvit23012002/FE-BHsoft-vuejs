<template>
    <div class="modal" @click="$emit('close')"></div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <span class="close" @click="$emit('close')">X</span>
                    <form class="form-horizontal form-create" id="form-course" method="post" enctype="multipart/form-data"
                        @submit.prevent="onSubmitForm">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" @blur="validate()" type="text" name="name" v-model="data.name"
                                :class="{ 'is-invalid': error.name }">
                            <div class="invalid-feedback d-block" v-if="error.name">{{ error.name }}</div>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control textarea" name="description" rows="12" v-model="data.description"
                                :class="{ 'is-invalid': error.description }" @blur="validate()"></textarea>
                            <div class="invalid-feedback d-block" v-if="error.description">{{ error.description }}</div>
                        </div>
                        <div class="form-group">
                            <label for="start_date">Start date</label>
                            <input class="form-control" type="date" name="start_date" v-model="data.start_date"
                                @blur="validate()" :class="{ 'is-invalid': error.start_date }">
                            <div class="invalid-feedback d-block" v-if="error.start_date">{{ error.start_date }}</div>
                        </div>
                        <div class="form-group">
                            <label for="end_date">End date</label>
                            <input class="form-control" type="date" name="end_date" v-model="data.end_date"
                                @blur="validate()" :class="{ 'is-invalid': error.end_date }">
                            <div class="invalid-feedback d-block" v-if="error.end_date">{{ error.end_date }}</div>
                        </div>
                        <button class="btn btn-primary">submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
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
                description: '',
                start_date: '',
                end_date: '',
            },
            error: {
                name: '',
                description: '',
                start_date: '',
                end_date: '',
            },
            submited: false
        }
    },
    emits: ['close'],
    methods: {
        ...mapActions(['getCourse', 'editCourse', 'getAllCourses']),
        validate() {
            let flag = true
            if (this.submited) {
                this.error = {
                    name: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                }
                let flagDate = true
                if (Validate.isEmpty(this.data.name).status === false) {
                    flag = false
                    this.error.name = Validate.isEmpty(this.data.name).text
                }
                if (Validate.lengthMax(this.data.description).status === false) {
                    flag = false
                    this.error.description = Validate.lengthMax(this.data.description).text
                }
                if (Validate.isEmpty(this.data.start_date).status === false) {
                    flag = false
                    flagDate = false
                    this.error.start_date = Validate.isEmpty(this.data.start_date).text
                } else if (Validate.isDate(this.data.start_date).status === false) {
                    flag = false
                    flagDate = false
                    this.error.start_date = Validate.isDate(this.data.start_date).text
                }
                if (Validate.isEmpty(this.data.end_date).status === false) {
                    flag = false
                    flagDate = false
                    this.error.end_date = Validate.isEmpty(this.data.end_date).text
                } else if (Validate.isDate(this.data.end_date).status === false) {
                    flag = false
                    flagDate = false
                    this.error.end_date = Validate.isDate(this.data.end_date).text
                }
                if (flagDate) {
                    if (Validate.checkDateCourse(this.data.start_date, this.data.end_date).status === false) {
                        flag = false
                        console.log("ok")
                        this.error.start_date = Validate.checkDateCourse(this.data.start_date, this.data.end_date).text
                        this.error.end_date = Validate.checkDateCourse(this.data.start_date, this.data.end_date).text
                    }
                }
            }

            return flag;
        },
        onSubmitForm() {
            this.submited = true
            let flag = this.validate()
            if (flag) {
                this.editCourse({ data: this.data, id: this.id }).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Thanh Cong',
                    })
                    this.getAllCourses()
                    this.$emit('close')
                }).catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response,
                    })
                })
            }

        },
    },
    mounted() {
        if (typeof this.id !== "undefined") {
            this.getCourse(this.id).then((res) => {
                let course = res.data.data.course
                this.data.name = course.name
                this.data.description = course.description
                this.data.start_date = course.start_date
                this.data.end_date = course.end_date
                console.log(this.data)
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

.textarea {
    height: 60px;
}

.form-create {
    width: 100%;
}
</style>