<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { useToastService } from '~/composables/useToastService';
import { useAuthService } from '~/services/authApi';

const { authenticate, validate } = useAuthService();
const { showToast } = useToastService();

const password = ref('');

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function submitLogin() {
  if (!password.value) {
    showToast({ message: 'Please enter your password.', severity: 'error' });
    return;
  }
  const plainPassword = password.value;
  const hashedPassword = await sha256(plainPassword);
  const result = await authenticate(hashedPassword);
  result.match(
    (authResponse) => {
      const tokenCookie = useCookie('token');
      tokenCookie.value = authResponse.token;
      navigateTo('/');
    },
    (error) => {
      showToast({ message: error.message || 'Login failed.', severity: 'error' });
    },
  );
}

onMounted(async () => {
  const result = await validate();
  result.match(
    () => {
      navigateTo('/');
    },
    () => {
      // User is not authenticated, do nothing
    },
  );
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700">
      <div class="text-center">
        <LockClosedIcon class="mx-auto h-12 w-auto text-blue-600 dark:text-blue-500" />
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Secure Authentication
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Enter your password to access your account
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="submitLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your password"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-slate-800"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400 dark:text-blue-300 dark:group-hover:text-blue-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg>
            </span>
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
