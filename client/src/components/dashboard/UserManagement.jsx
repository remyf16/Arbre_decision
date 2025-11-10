import React from 'react';

const users = [
    { id: 1, name: 'Jeanne Dupont', email: 'jeanne.dupont@example.com', role: 'Admin', status: 'Actif', dateAdded: '12/01/2023' },
    { id: 2, name: 'Marc Lavoie', email: 'marc.lavoie@example.com', role: 'Éditeur', status: 'Actif', dateAdded: '10/11/2023' },
    { id: 3, name: 'Sophie Martin', email: 'sophie.martin@example.com', role: 'Éditeur', status: 'Inactif', dateAdded: '05/09/2023' },
];

const UserManagement = () => {
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
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-900 dark:text-white h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-2 text-sm font-normal leading-normal" placeholder="Rechercher par nom ou email..." value="" />
                                </div>
                            </label>
                        </div>
                        {/* Chips/Filters */}
                        <div className="flex items-center gap-3">
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-gray-300 bg-white px-3 dark:border-gray-700 dark:bg-gray-800">
                                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-normal">Rôle: Tous</p>
                                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 text-base">expand_more</span>
                            </button>
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-gray-300 bg-white px-3 dark:border-gray-700 dark:bg-gray-800">
                                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-normal">Statut: Tous</p>
                                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 text-base">expand_more</span>
                            </button>
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
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6" scope="col">Nom</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white" scope="col">Email</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white" scope="col">Rôle</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white" scope="col">Statut</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white" scope="col">Date d'ajout</th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6" scope="col">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{user.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${user.status === 'Actif' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400'}`}>{user.status}</span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.dateAdded}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-1.5 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
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
