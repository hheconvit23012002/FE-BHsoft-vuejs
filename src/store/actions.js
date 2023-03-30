import ApiCaller from "@/utills/ApiCaller";
export default {
    async getAllUsers( {commit},data ){
        const res = await ApiCaller('users','GET',data)
        commit('setAllUsers',res.data.data)
    },
    async getCourseSelect2({commit}){
        const res = await ApiCaller('coursesSelect2','GET',null)
        commit('setAllCourseSelect2',res.data.data)
    },
    async createUser(state,data){
        let courses = data.course.map((value)=>{
            return parseInt(value.split(" id : ")[1])
        })
        const formData = new FormData();
        formData.append('name',data.name);
        formData.append('email',data.email);
        formData.append('birthdate',data.birthdate);
        formData.append('phone_number',data.phone_number);
        formData.append('logo',data.logo);
        for(let i=0;i<courses.length;i++){
            formData.append('course[]',courses[i])
        }
        return await ApiCaller('users','POST',formData).then((res)=>{
            console.log(res)
            return res;
        })
        // console.log(res)
    },
    async getUser(state,data){
        return await ApiCaller(`users/${data}`,'GET',null)
    },
    async deleteUser({commit},data){
        return await ApiCaller(`users/${data}`,'DELETE',null).then((res)=>{
            commit('deleteUser',data)
            return res
        })
    },
    async editUser(state,data){
        // console.log(data.data.courses)
        let courses = data.data.courses.map((value)=>{
            console.log(value)
            return parseInt(value.split(" id : ")[1])
        })
        const formData = new FormData();
        formData.append('name',data.data.name);
        formData.append('email',data.data.email);
        formData.append('birthdate',data.data.birthdate);
        formData.append('phone_number',data.data.phone_number);
        formData.append('logo_new',data.data.logo_new);
        for(let i=0;i<courses.length;i++){
            formData.append('course[]',courses[i])
        }
        return await ApiCaller(`users/${data.id}?_method=PUT`,'POST',formData).then((res)=>{
            
            return res
        })
    },
    async getAllCourses({commit},data){
        const res = await ApiCaller('courses','GET',data)
        console.log(res.data.data)
        commit('setAllCourses',res.data.data)
    },
    async deleteCourse({commit},data){
        return await ApiCaller(`courses/${data}`,'DELETE',null).then((res)=>{
            commit('deleteCourse',data)
            return res
        })
    },
    async getCourse(state,data){
        return await ApiCaller(`courses/${data}`,'GET',null)
    },
    async createCourse(state,data){
        return await ApiCaller('courses','POST',data).then((res)=>{
            console.log(res)
            return res
        })
    },
    async editCourse(state,data){
        return await ApiCaller(`courses/${data.id}?_method=PUT`,'POST',data.data).then((res)=>{
            return res
        })
    },
    async importCsv(state,data){
        const formData = new FormData();
        formData.append('file',data);
        return await ApiCaller(`import-csv`,'POST',formData).then((res)=>{
            return res
        })
    },
    async getDashBoard(){
        return await ApiCaller(`dashboard`,'GET',null).then((res)=>{
            return res
        })
    },
    async login(state,data){
        return await ApiCaller(`login`,'POST',data).then((res)=>{
            return res
        })
    },
}