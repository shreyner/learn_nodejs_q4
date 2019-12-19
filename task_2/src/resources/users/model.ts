import uuid from 'uuid/v1';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import take from 'lodash/take';
import { User } from './types';

const usersStore: Record<string, User> = {
    '1bd11de0-20f4-11ea-b8c6-7591b2898f10': {
        id: '1bd11de0-20f4-11ea-b8c6-7591b2898f10',
        login: 'Alex',
        password: '123',
        age: 24,
        isDeleted: false
    },
    'fae7f7e0-21cd-11ea-99c2-ab261878cd56': {
        id: 'fae7f7e0-21cd-11ea-99c2-ab261878cd56',
        login: 'Саша',
        password: 'sad123sadw1',
        age: 20,
        isDeleted: false
    },
    'fe45c8e0-21cd-11ea-99c2-ab261878cd56': {
        id: 'fe45c8e0-21cd-11ea-99c2-ab261878cd56',
        login: 'Сашашаа',
        password: 'sad123sadw1',
        age: 20,
        isDeleted: false
    },
    '01cfda00-21ce-11ea-99c2-ab261878cd56': {
        id: '01cfda00-21ce-11ea-99c2-ab261878cd56',
        login: 'Александр',
        password: 'sad123sadw1',
        age: 20,
        isDeleted: false
    },
    '059c2440-21ce-11ea-99c2-ab261878cd56': {
        id: '059c2440-21ce-11ea-99c2-ab261878cd56',
        login: 'Алек',
        password: 'sad123sadw1',
        age: 20,
        isDeleted: false
    },
    '080b9da0-21ce-11ea-99c2-ab261878cd56': {
        id: '080b9da0-21ce-11ea-99c2-ab261878cd56',
        login: 'АлекБлы',
        password: 'sad123sadw1',
        age: 20,
        isDeleted: false
    }
};


const create = ({ login, password, age }: {login: string; password: string; age: number}): User => {
    const id = uuid();

    usersStore[id] = {
        id,
        login,
        password,
        age,
        isDeleted: false
    };
    return usersStore[id];
};

const update = (user: {id: string} & Partial<User>): User | undefined => {
    if (!usersStore[user.id]) return;

    usersStore[user.id] = {
        ...usersStore[user.id],
        ...user
    };

    return usersStore[user.id];
};

const findById = (id: string): User | undefined => usersStore[id];

const findAll = (): typeof usersStore => usersStore;

const deleteUser = (id: string): boolean => {
    const user = usersStore[id];

    if (!user || user.isDeleted) return false;

    usersStore[id].isDeleted = true;

    return true;
};

const getActiveUsers = (): ReadonlyArray<User> => filter(findAll(), ({ isDeleted }) => !isDeleted);

const getAutoSuggestUsers = (loginSubstring?: string, limit = 5) => take(orderBy(
    filter(usersStore, ({ login }) => new RegExp(`^${loginSubstring}.+`, 'g').test(login)),
    ['login']
), limit);

export default {
    create,
    findById,
    update,
    findAll,
    deleteUser,
    getActiveUsers,
    getAutoSuggestUsers
};
