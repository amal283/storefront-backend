import { UserStore } from '../models/user';

const store = new UserStore();

describe('User Model', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create should return a defined value', async () => {
        const result = await store.create({firstName: 'firstName', lastName: 'lastName', password: 'password123'});
        expect(result).toBeDefined();
    });

    it('should have an authenticate user method', () => {
        expect(store.autenticateUser).toBeDefined();
    });

    it('authenticate user should return null if the user is invalid', async () => {
        const result = await store.autenticateUser('firstName','lastName', '');
        expect(result).toBeNull();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('show should return a undefined value if user id does not exist', async () => {
        const result = await store.show('-1');
        expect(result).toBeUndefined;
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index should return a list', async () => {
        const result = await store.index();
        expect(result).toBeInstanceOf(Array);
    });
})
