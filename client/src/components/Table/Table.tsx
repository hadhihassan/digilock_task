import React from 'react';
import { IUser } from '../../Page/UserList/Index';

interface TableProps {
    Users: IUser[];
    handleAssignRole: (userId: string) => void;
}

const Table: React.FC<TableProps> = ({ Users, handleAssignRole }) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900 border-2 border-gray-700">
            <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-200 dark:text-gray-900">
                <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {Users.map((user: IUser, index: number) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-200 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {user.username}
                        </th>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">
                            <button
                                onClick={() => handleAssignRole(user._id)}
                                className="bg-violet-800 text-white text-xs p-2 rounded-md">
                                Change to {user.role === "admin" ? "member" : "admin"}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;