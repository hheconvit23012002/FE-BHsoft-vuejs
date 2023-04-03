<template>
    <div class="modal" @click="$emit('close')">
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <span class="close" @click="$emit('close')">X</span>
                    <form class="form-horizontal form-create" id="form-course" method="post" enctype="multipart/form-data"
                        @submit.prevent="onSubmitForm">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" type="text" name="name" v-model="data.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control textarea" name="description" rows="12"
                                v-model="data.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="start_date">Start date</label>
                            <input class="form-control" type="date" name="start_date" v-model="data.start_date">
                        </div>
                        <div class="form-group">
                            <label for="end_date">End date</label>
                            <input class="form-control" type="date" name="end_date" v-model="data.end_date">
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
    data() {
        return {
            data: {
                name: '',
                description: '',
                start_date: '',
                end_date: '',
            },
        }
    },
    emits: ['close'],
    methods: {
        ...mapActions(['createCourse', 'getAllCourses']),
        onSubmitForm() {
            let flag = true;
            let validate = [];
            validate.push({ rg: Validate.isEmpty(this.data.name), title: "name" });
            validate.push({ rg: Validate.lengthMax(this.data.description), title: "description" });
            validate.push({ rg: Validate.isEmpty(this.data.start_date), title: "start_date" });
            validate.push({ rg: Validate.isEmpty(this.data.end_date), title: "end_date" });
            validate.push({ rg: Validate.isDate(this.data.start_date), title: "start_date" });
            validate.push({ rg: Validate.isDate(this.data.end_date), title: "end_date" });
            validate.push({ rg: Validate.checkDateCourse(this.data.start_date, this.data.end_date), title: "Date" });
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
                this.createCourse(this.data).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title : 'Success',
                        text: 'Thanh Cong',
                    })
                    this.getAllCourses()
                    this.$emit('close')
                }).catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data,
                    })
                })
            }
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