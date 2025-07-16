import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const axios = require('axios')
          const res = await axios.post('http://localhost:5000/login', {
            email: credentials.email,
            password: credentials.password
          })
          if (res.data && res.data.email) {
            return {
              id: res.data.email,
              email: res.data.email,
              role: res.data.role,
              selfie_path: res.data.selfie_path
            }
          }
          return null
        } catch (err) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role
      }
      return session
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  }
})
