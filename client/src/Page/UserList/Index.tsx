import { useEffect, useState } from 'react';
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { getAllUsers, assignRole as assignUserRole } from '../../services/AdminService';
import Table from '../../components/Table/Table';

export interface IUser {
    _id: string;
    username: string;
    email: string;
    role: string;
}

interface UserFetchResponse {
    Users: IUser[];
    message: string;
    success: boolean;
}

const UserList = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    async function fetchUsers() {
        const { data }: { data: UserFetchResponse } = await getAllUsers();
        setUsers(data.Users);
    }

    async function handleAssignRole(userId: string) {
        try {
            const data = await assignUserRole(userId);
            
            fetchUsers();
            toast.success(data?.data?.message)
        } catch (error: AxiosError) {
            const { data } = error.response
            if (data?.errors?.length > 0) {
                return toast.error(data.errors.map((err) => err.msg).join(", "));
            }
            let errorMessage = "Account Created Failed";
            errorMessage = data.message || 'Internal Server error';
            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <div className="relative overflow-x-auto p-20 rounded-xl font-sans font-semibold">
                <Table Users={users} handleAssignRole={handleAssignRole} />
            </div>
        </div>
    );
};

export default UserList;
