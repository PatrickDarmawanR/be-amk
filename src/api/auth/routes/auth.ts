import authController from '../controllers/auth';

export default {
  routes: [
    {
      method: 'POST',
      path: '/auth/register',
      handler: authController.register,
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/auth/login',
      handler: authController.login,
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/auth/forgot-password',
      handler: authController.forgotPassword,
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/auth/reset-password',
      handler: authController.resetPassword,
      config: { auth: false },
    },
  ],
};
