export default {
    isEmpty: (str) => {
        if (!str || str.length === 0) {
            return {
                status: false,
                text: "is not empty"
            }
        } else {
            return {
                status: true,
                text: "success"
            }
        }
    },
    lengthMax: (str) => {
        if (str.length > 2048) {
            return {
                status: false,
                text: "less than 2048 characters"
            }
        } else {
            return {
                status: true,
                text: "success"
            }
        }
    },
    checkDateCourse: (str1, str2) => {
        const dateObj1 = new Date(str1);
        const dateObj2 = new Date(str2);

        if (dateObj1 > dateObj2) {
            return {
                status: false,
                text: "start_date less than end_date"
            }
        } else {
            return {
                status: true,
                text: "success"
            }
        }
    },
    isEmail: (str) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(str)) {
            return {
                status: true,
                text: "success"
            }
        } else {
            return {
                status: false,
                text: "Email format is incorrect"
            }
        }
    },
    isBirthDate: (str) => {
        const now = new Date();
        const date = now.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
        var dateParts = date.split("/");
        var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        var year = dateObject.getFullYear();
        var month = dateObject.getMonth() + 1;
        var day = dateObject.getDate();
        var formattedDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
        const dateObj1 = new Date(str);
        const dateObj2 = new Date(formattedDate);
        if (dateObj1 > dateObj2) {
            return {
                status: false,
                text: "birthdate less than today"
            }
        } else {
            return {
                status: true,
                text: "success"
            }
        }
    },
    isPhoneNumber: (str) => {
        const regex = /^(03|05|07|08|09)+([0-9]{8})$/;
        if (regex.test(str)) {
            return {
                status: true,
                text: "success"
            }
        } else {
            return {
                status: false,
                text: "PhoneNumber format is incorrect"
            }
        }
    },
    isDate: (str) => {
        var regexDate = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexDate.test(str)) {
            return {
                status: false,
                text: "Date format is incorrect"
            };
        }
        var d = new Date(str);
        if (!isNaN(d.getTime())) {
            return {
                status: true,
                text: "success"
            }
        }
        return {
            status: false,
            text: "Date format is incorrect"
        }
    }
}