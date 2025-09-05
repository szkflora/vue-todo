import { defineStore } from 'pinia';
import { URL } from '@/config';
import { User } from '@/types/User';
import { error } from 'console';

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

    const data = await res.json();
    if (status === 200) {
      localStorage.setItem('authToken', data.token);
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
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
    const data = await res.json();
    if (status === 201) {
      localStorage.setItem('authToken', data.token);
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  return {
    signIn,
    signUp,
  };
});
