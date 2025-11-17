import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/users/${userId}`);
                // Refresh the list of users after deletion
                fetchUsers();
            } catch (err) {
                setError('Failed to delete user.');
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (loading) return <main className="flex-1 p-6 lg:p-8"><p>Loading users...</p></main>;
    if (error) return <main className="flex-1 p-6 lg:p-8"><p className="text-red-500">{error}</p></main>;

    return (
        <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* PageHeading */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex min-w-72 flex-col gap-2">
                        <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Gestion des Utilisateurs</p>
                        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Ajoutez, modifiez et gérez les accès des utilisateurs à vos arbres de décision.</p>
                    </div>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-base">add</span>
                        <span className="truncate">Ajouter un utilisateur</span>
                    </button>
                </div>

                {/* Toolbar: Search and Filters */}
                <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        {/* SearchBar */}
                        <div className="flex-1">
                            <label className="flex flex-col min-w-40 h-10 w-full">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div className="text-gray-400 flex border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 items-center justify-center pl-3 rounded-l-lg">
                                        <span className="material-symbols-outlined text-xl">search</span>
                                    </div>
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-900 dark:text-white h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-2 text-sm font-normal leading-normal"
                                        placeholder="Rechercher par email..."
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="mt-6 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6" scope="col">Email</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white" scope="col">Rôle</th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6" scope="col">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
                                        {filteredUsers.map((user) => (
                                            <tr key={user._id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{user.email}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-1.5 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button
                                                            className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                                            onClick={() => handleDelete(user._id)}
                                                        >
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserManagement;
