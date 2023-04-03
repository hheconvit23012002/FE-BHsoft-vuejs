import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
const routes = [
    {
        name: 'homepage', path: '/', component: HomePage
    },
    {
        name: 'test', path: '/test', component: () => import("../pages/admin/users/TestTe.vue")
    },
    {
        name: 'signin', path: '/signin', component: () => import("../pages/auth/SignIn.vue")
    },
    {
        name: 'signup', path: '/signup', component: () => import("../pages/auth/SignUp.vue")
    },
    {
        name: 'user', path: '/user', component: () => import("../pages/user/UserDetail.vue")
    },
    {
        name: 'admin', path: '/admin', component: () => import("../pages/admin/AdminPage.vue"),
        children: [
            {
                path: "users",
                name: "admin-users",
                component: () => import("../pages/admin/users/ListUsers.vue")
            },
            // {
            //     path: "users/create",
            //     name: "admin-user-create",
            //     component: () => import("../pages/admin/users/CreateUser")
            // },
            {
                path: "users/show/:id",
                name: "admin-user-show",
                component: () => import("../pages/admin/users/ShowUser")
            },
            // {
            //     path: "users/edit/:id",
            //     name: "admin-user-edit",
            //     component: () => import("../pages/admin/users/EditUser")
            // },
            {
                path: "courses",
                name: "admin-courses",
                component: () => import("../pages/admin/courses/ListCourses.vue")
            },
            {
                path: "courses/show/:id",
                name: "admin-course-show",
                component: () => import("../pages/admin/courses/ShowCourse.vue")
            },
            // {
            //     path: "courses/create",
            //     name: "admin-course-create",
            //     component: () => import("../pages/admin/courses/CreateCourse.vue")
            // },
            // {
            //     path: "courses/edit/:id",
            //     name: "admin-course-edit",
            //     component: () => import("../pages/admin/courses/EditCourse.vue")
            // },
            {
                path: "dashboard",
                name: "admin-dashboard",
                component: () => import("../pages/admin/dashboard/DashBoard.vue")
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.name != "signin" && !token) {
        next("/signin");
    } else {
        if (localStorage.getItem("role") !== "0") {
            for (let i = 0; i < to.matched.length; i++) {
                if (to.matched[i].name === "admin") {
                    next("/signin")
                }
            }
        }
        next();
    }
    next()
});
export default router