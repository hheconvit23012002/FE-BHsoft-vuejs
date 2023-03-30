<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form class="form-horizontal" id="form-course" method="post" enctype="multipart/form-data" @submit.prevent="onSubmitForm">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" type="text" name="name" v-model="data.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" name="description" rows="12" v-model="data.description"></textarea>
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
        ...mapActions(['createCourse']),
        onSubmitForm() {
            this.createCourse(this.data).then(() => {
                notification['success']({
                    message: 'Notification Access',
                    description: 'create thanh cong',
                });
                this.$router.push({ name: 'admin-courses' })
            }).catch(() => {
                notification['error']({
                    message: 'Notification Access',
                    description: 'create that bai',
                });
            })
        }
    },
}
</script>