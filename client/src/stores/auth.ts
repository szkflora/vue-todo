import { defineStore } from 'pinia';
import { URL } from '@/config';
import { User } from '@/types/User';

export const useAuthStore = defineStore('authstore', () => {
  async function signIn(email: string, password: string) {
    const res = await fetch(`${URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const status = res.status;

    if (status === 200) {
      const data = await res.json();
      localStorage.setItem('authToken', data.token);
    }

    return status;
  }

  async function signUp(user: User) {
    const res = await fetch(`${URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user),
    });

    const status = res.status;

    if (status === 201) {
      const data = await res.json();
      localStorage.setItem('authToken', data.token);
    }

    return status;
  }

  return {
    signIn,
    signUp
  };
});
