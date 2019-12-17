import uuid from 'uuid/v1';
import pickBy from 'lodash/pickBy';
import { User } from './types';

const usersStore: Record<string, User> = {
    '1bd11de0-20f4-11ea-b8c6-7591b2898f10': {
        id: '1bd11de0-20f4-11ea-b8c6-7591b2898f10',
        login: 'Alex',
        password: '123',
        age: 24,
        isDeleted: false
    }
};


function create({ login, password, age }: {login: string; password: string; age: number}): User {
    const id = uuid();

    usersStore[id] = {
        id,
        login,
        password,
        age,
        isDeleted: false
    };
    return usersStore[id];
}

function update(user: {id: string} & Partial<User>): User | undefined {
    if (!usersStore[user.id]) return;

    usersStore[user.id] = {
        ...usersStore[user.id],
        ...user
    };

    return usersStore[user.id];
}

function findById(id: string): User | undefined {
    return usersStore[id];
}

function findAll(): typeof usersStore {
    return usersStore;
}

function deleteUser(id: string): boolean {
    const user = usersStore[id];

    if (!user || user.isDeleted) return false;

    usersStore[id].isDeleted = true;

    return true;
}

function getActiveUsers(): typeof usersStore {
    return pickBy(findAll(), ({ isDeleted }) => !isDeleted);
}

export default {
    create,
    findById,
    update,
    findAll,
    deleteUser,
    getActiveUsers
};
