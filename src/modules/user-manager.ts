import { DataStorage } from './data-storage.js';
import type { Profile as User } from '../types/user.js';

export const UserManager = (() => {
  let user: User | null = DataStorage.loadUser();

  function getUser(): User | null {
    return user;
  }

  function setUser(newUser: User): void {
    user = newUser;
    DataStorage.saveUser(user);
  }

  return {
    getUser,
    setUser
  };
})();