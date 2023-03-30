<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12" id="dashboard-total">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card widget-flat">
                                        <div class="card-body">
                                            <div class="float-right">
                                                <i
                                                    class="mdi mdi-concourse-ci widget-icon bg-success-lighten text-success"></i>
                                            </div>
                                            <h5 class="text-muted font-weight-normal mt-0" title="Number of Customers">Total
                                                Course</h5>
                                            <h3 class="mt-3 mb-3" id="total-course">{{ totalCourse }}</h3>
                                        </div> <!-- end card-body-->
                                    </div> <!-- end card-->
                                </div> <!-- end col-->

                                <div class="col-lg-12">
                                    <div class="card widget-flat">
                                        <div class="card-body">
                                            <div class="float-right">
                                                <i
                                                    class="uil-chat-bubble-user widget-icon bg-danger-lighten text-danger"></i>
                                            </div>
                                            <h5 class="text-muted font-weight-normal mt-0" title="Number of Orders">Total
                                                User</h5>
                                            <h3 class="mt-3 mb-3" id="total-user">{{ totalUser }}</h3>
                                        </div> <!-- end card-body-->
                                    </div> <!-- end card-->
                                </div> <!-- end col-->
                                <div class="col-lg-12">
                                    <div class="card widget-flat">
                                        <div class="card-body">
                                            <div class="float-right">
                                                <i class="mdi mdi-currency-usd widget-icon bg-info-lighten text-info"></i>
                                            </div>
                                            <h5 class="text-muted font-weight-normal mt-0" title="Average Revenue">The
                                                course has been registered</h5>
                                            <h3 class="mt-3 mb-3" id="course-signuped">{{  courseRegister }}</h3>
                                        </div> <!-- end card-body-->
                                    </div> <!-- end card-->
                                </div> <!-- end col-->
                            </div>
                        </div> <!-- end col -->
                    </div>
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-borderless table-nowrap mb-0" id="table-top-user">
                                <thead class="thead-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Number Course</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(value,index) in rankUserRegisterCourse" :key="index">
                                        <th>{{ value.id }}</th>
                                        <th>{{ value.rank }}</th>
                                        <th>{{ value.name }}</th>
                                        <th>{{ value.number_courses }}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    data () {
        return {
            totalCourse : 0,
            totalUser : 0,
            courseRegister : 0,
            rankUserRegisterCourse : [],
        }
    },
    methods : {
        ...mapActions(['getDashBoard'])
    },
    mounted(){
        this.getDashBoard().then((res)=>{
            this.totalCourse = res.data.data.courses[0].total
            this.totalUser = res.data.data.users[0].total
            this.courseRegister = res.data.data.courses_signup
            this.rankUserRegisterCourse = res.data.data.top_user
        })
    }
}
</script>