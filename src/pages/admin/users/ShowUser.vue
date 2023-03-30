<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12">
            <div class="card text-center">
                <div class="card-body" id="profile">
                    <img src="" class="rounded-circle avatar-lg img-thumbnail" alt="profile-image">
                    <h4 class="mb-0 mt-2">
                        {{user.name}}
                    </h4>
                    <div class="text-left mt-3">

                        <p class="text-muted mb-2 font-13"><strong>Full Name :</strong>
                            <span class="ml-2">
                                {{user.name}}
                            </span>
                        </p>

                        <p class="text-muted mb-2 font-13"><strong>Mobile :</strong>
                            <span class="ml-2">
                                {{user.phone_number}}
                            </span>
                        </p>

                        <p class="text-muted mb-2 font-13"><strong>Email :</strong>
                            <span class="ml-2 ">
                                {{user.email}}
                            </span>
                        </p>

                        <p class="text-muted mb-1 font-13"><strong>Birthdate</strong> <span class="ml-2">
                                {{user.birthdate}}
                            </span>
                        </p>
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
                                        Course</h5>
                                    <div class="table-responsive">
                                        <table class="table table-borderless table-nowrap mb-0" id="table-course">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Course</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(course,index) in courses" :key="index">
                                                    <td>{{ course.courses.id }}</td>
                                                    <td>{{ course.courses.name }}</td>
                                                    <td>{{ course.courses.start_date }}</td>
                                                    <td>{{ course.courses.end_date }}</td>
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
    data(){
        return {
            user : {},
            courses : []
        }
    },
    methods: {
        ...mapActions(['getUser'])
    },
    mounted() {
        if (typeof this.$route.params.id !== "undefined") {
            this.getUser(this.$route.params.id).then((res)=>{
                this.user = res.data.data.user
                this.courses = res.data.data.course
                console.log(this.courses[0].courses)
            })
        }
    },
}
</script>