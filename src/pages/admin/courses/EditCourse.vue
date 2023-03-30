<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form class="form-horizontal" method="post" id="form-course" enctype="multipart/form-data" @submit.prevent="onSubmitForm">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" type="text" id="name" name="name" v-model="data.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="description" name="description" rows="12" v-model="data.description">
                                    </textarea>
                        </div>
                        <div class="form-group">
                            <label for="start_date">Start date</label>
                            <input class="form-control" type="date" id="start_date" name="start_date" v-model="data.start_date">
                        </div>
                        <div class="form-group">
                            <label for="end_date">End date</label>
                            <input class="form-control" type="date" id="end_date" name="end_date" v-model="data.end_date">
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
import { notification } from 'ant-design-vue';
export default {
    data() {
        return {
            data: {
                name: '',
                description: '',
                start_date: '',
                end_date: '',
            }
        }
    },
    methods: {
        ...mapActions(['getCourse', 'editCourse']),
        onSubmitForm() {
            this.editCourse({ data: this.data, id: this.$route.params.id }).then(() => {
                notification['success']({
                    message: 'Notification Access',
                    description: 'update thanh cong',
                });
                this.$router.push({ name: 'admin-courses' })
            }).catch(() => {
                notification['error']({
                    message: 'Notification Access',
                    description: 'update that bai',
                });
            })
        },
    },
    mounted() {
        if (typeof this.$route.params.id !== "undefined") {
            this.getCourse(this.$route.params.id).then((res) => {
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