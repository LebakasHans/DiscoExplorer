import { useAuthService } from '~/services/authApi';

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const result = await useAuthService().validate();
  if (result.isErr()) {
    return navigateTo('login');
  }
});
