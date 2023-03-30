let findIndex = (list,id) =>{
    let result =-1;
    list.forEach((item,index)=> {
        if(item.id === id) {
            result = index
        }
    });
    return result
}
export default {
    setAllUsers(state, data){
        state.users = data
    },
    setAllCourseSelect2(state,data){
        state.courseSelect2 = data
    },
    deleteUser(state,data){
        let index = findIndex(state.users.data,data)
        let tmp = state.users.data
        tmp.splice(index,1)
        state.users.data = tmp
    },
    setAllCourses(state, data){
        state.courses = data
    },
    deleteCourse(state,data){
        let index = findIndex(state.courses.data,data)
        let tmp = state.courses.data
        tmp.splice(index,1)
        state.courses.data = tmp
    },
}