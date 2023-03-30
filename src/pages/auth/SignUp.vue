<template>
    <div class="account-pages mt-5 mb-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center w-75 m-auto">
                                <h4 class="text-dark-50 text-center mt-0 font-weight-bold">Free Sign Up</h4>
                            </div>
                            <form action="#" method="POST" id="form-signup">
                                <div class="form-group">
                                    <label for="fullname">Full Name</label>
                                    <input class="form-control" type="text" name="name" 
                                        id="fullname" placeholder="Enter your name" required>
                                </div>
                                <div class="form-group">
                                    <label for="emailaddress">Email address</label>

                                    <input class="form-control" name="email" type="email" 
                                        id="emailaddress" required placeholder="Enter your email">
                                </div>

                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <div class="input-group input-group-merge">
                                        <input type="password" name="password" id="password" 
                                            class="form-control" placeholder="Enter your password">
                                        <div class="input-group-append" data-password="false">
                                            <div class="input-group-text">
                                                <span class="password-eye"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group mb-0 text-center">
                                    <button class="btn btn-primary"> Sign Up</button>
                                </div>

                            </form>
                        </div> <!-- end card-body -->
                    </div>
                    <!-- end card -->

                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <p class="text-muted">Already have account? <a href="#"
                                    class="text-muted ml-1"><b>Log In</b></a></p>
                        </div> <!-- end col-->
                    </div>
                    <!-- end row -->
                </div> <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->

    <footer class="footer footer-alt">
        2018 - 2020 © Hyper - Coderthemes.com
    </footer>
</template>
<script>

</script>