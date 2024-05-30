import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    })
  ],
});