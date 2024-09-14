import axios from "./Axios";

export async function getAllUsers() {
    return await axios.get("/admin/list-user", {
        withCredentials: true
    })
}

export async function assignRole(userId: string) {
    return await axios.get(`/admin/assign-role-to-user/${userId}`, {
        withCredentials: true
    })
}
