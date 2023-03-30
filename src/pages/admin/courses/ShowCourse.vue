<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <div class="card text-center">
                <div class="card-body" id="info-course">
                    <h4 class="mb-0 mt-2">{{ course.name }}</h4>
                    <div class="text-left mt-3">
                        <h4 class="font-13 text-uppercase">About Course :</h4>
                        <p class="text-muted font-13 mb-3">
                            {{ course.description }}
                        </p>
                        <p class="text-muted mb-2 font-13"><strong>Course Name :</strong>
                            <span class="ml-2">{{ course.name }}</span>
                        </p>
                        <p class="text-muted mb-2 font-13"><strong>Start date :</strong>
                            <span class="ml-2">{{ course.start_date }}</span>
                        </p>
                        <p class="text-muted mb-2 font-13"><strong>End date :</strong> <span
                                class="ml-2 ">{{ course.end_date }}</span></p>
                    </div>
                </div> <!-- end card-body -->
            </div> <!-- end card -->
        </div> <!-- end col-->
        <div class="col-xl-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane active" id="aboutme">

                            <div class="timeline-alt pb-0">
                                <h5 class="mb-3 mt-4 text-uppercase"><i class="mdi mdi-cards-variant mr-1"></i>
                                    Student</h5>
                                <div class="table-responsive">
                                    <table class="table table-borderless table-nowrap mb-0" id="table-user">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(user, index) in users" :key="index">
                                                <td>{{ user.users.id }}</td>
                                                <td>{{ user.users.name }}</td>
                                                <td>{{ user.users.email }}</td>
                                                <td>{{ user.users.phone_number }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> <!-- end tab-content -->
                    </div> <!-- end card body -->
                </div> <!-- end card -->
            </div> <!-- end col -->
        </div>
    </div>
</template>
<script >
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            course: {},
            users: []
        }
    },
    methods: {
        ...mapActions(['getCourse'])
    },
    mounted() {
        if (typeof this.$route.params.id !== "undefined") {
            this.getCourse(this.$route.params.id).then((res) => {
                this.course = res.data.data.course
                this.users = res.data.data.users
                console.log(res.data.data.users)
            })
        }
    },
}
</script>