<template>
    <div class="auth-fluid">
        <!--Auth fluid left content -->
        <div class="auth-fluid-form-box">
            <div class="align-items-center">
                <div class="card-body">
                    <!-- title-->
                    <h4 class="mt-0">Sign In</h4>
                    <form method="POST" id="form-login" @submit.prevent="submitLogin">
                        <div class="form-group">
                            <label for="emailaddress">Email address</label>
                            <input class="form-control" type="email" name="email" required="" v-model="email"
                                placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input class="form-control" type="password" name="password" required="" id="password" v-model="password"
                                placeholder="Enter your password">
                        </div>
                        <div class="form-group mb-0 text-center">
                            <button class="btn btn-primary btn-block"><i class="mdi mdi-login"></i> Log In</button>
                        </div>
                    </form>
                    <!-- end form-->
                    <!-- Footer-->
                    <footer class="footer footer-alt">
                        <p class="text-muted">Don't have an account? <a href="#"
                                class="text-muted ml-1"><b>Sign Up</b></a></p>
                    </footer>
                </div> <!-- end .card-body -->
            </div> <!-- end .align-items-center.d-flex.h-100-->
        </div>
        <!-- end auth-fluid-form-box-->
    </div>
</template>

<script >
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            email : '',
            password : '',
        }
    },
    methods : {
        ...mapActions(['login']),
        submitLogin(){
            this.login({email : this.email, password : this.password}).then((res)=>{
                localStorage.setItem("token",res.data.data._token)
                if(res.data.data.route.length >1){
                    localStorage.setItem("role",0)
                    this.$router.push({ name: 'admin-users' })
                }else{
                    localStorage.setItem("role",1)
                }
            }).catch(()=>{
                alert("Sai tai khoan hoac mat khau")
            })
        }
    }
}
</script>