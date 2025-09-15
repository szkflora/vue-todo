import { defineStore } from 'pinia';
import { URL } from '@/config';
import { User } from '@/types/User';
import { HttpResponse } from '@/types/api'

export const useAuthStore = defineStore('authstore', () => {
  async function signIn(email: string, password: string): Promise<HttpResponse> {
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

  async function signUp(user: User): Promise<HttpResponse> {
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
