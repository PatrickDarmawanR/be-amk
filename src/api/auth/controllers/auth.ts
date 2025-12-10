import { Context } from 'koa';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmailForgotPassword } from '../../../utils/sendMailForgotPassword';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const authController = {
  async register(ctx: Context) {
    const { username, email, password, confirmPassword, phoneNumber } = ctx.request.body;

    if (!email || !password || !confirmPassword) {
      return ctx.badRequest('Email, password, and confirmPassword are required');
    }

    if (!EMAIL_REGEX.test(email)) {
      return ctx.badRequest('Email is not valid');
    }

    if (password !== confirmPassword) {
      return ctx.badRequest('Password and confirmPassword do not match');
    }

    const exist = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email },
    });
    if (exist) return ctx.badRequest('Email already registered');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await strapi.db.query('plugin::users-permissions.user').create({
      data: {
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        confirmed: true,
      },
    });

    return ctx.send({
      message: 'Register success',
      user: { id: user.id, email: user.email, username: user.username },
    });
  },

  async login(ctx: Context) {
    const { email, password } = ctx.request.body;
    if (!email || !password) return ctx.badRequest('Email & password required');

    if (!EMAIL_REGEX.test(email)) {
      return ctx.badRequest('Email is not valid');
    }

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email },
    });
    if (!user) return ctx.unauthorized('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return ctx.unauthorized('Wrong Password');

    const jwt = await strapi.service('plugin::users-permissions.jwt').issue({ id: user.id });

    return ctx.send({
      jwt,
      user: { id: user.id, email: user.email, username: user.username },
    });
  },

  async forgotPassword(ctx: Context) {
    const { email } = ctx.request.body;
    if (!email) return ctx.badRequest('Email required');

    if (!EMAIL_REGEX.test(email)) {
      return ctx.badRequest('Email is not valid');
    }

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email },
    });
    if (!user) return ctx.notFound('User not found');

    const token = crypto.randomBytes(32).toString('hex');

    const salt = await bcrypt.genSalt(10);
    const hashedToken = await bcrypt.hash(token, salt);

    await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: { resetPasswordToken: hashedToken },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;

    await sendEmailForgotPassword({
      to: email,
      subject: 'Reset Password',
      html: `<p>Klik link untuk reset password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    return ctx.send({ message: 'Reset password email sent' });
  },

  async resetPassword(ctx: Context) {
    const { email, token, password, confirmPassword } = ctx.request.body;

    if (!email || !token || !password || !confirmPassword)
      return ctx.badRequest('Missing fields');

    if (!EMAIL_REGEX.test(email)) {
      return ctx.badRequest('Email is not valid');
    }

    if (password !== confirmPassword)
      return ctx.badRequest('Password mismatch');

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email },
    });
    if (!user) return ctx.badRequest('Invalid email or token');

    const validToken = await bcrypt.compare(token, user.resetPasswordToken || '');
    if (!validToken) return ctx.badRequest('Invalid token');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: { password: hashedPassword, resetPasswordToken: null },
    });

    return ctx.send({ message: 'Password updated successfully' });
  },
};

export default authController;
