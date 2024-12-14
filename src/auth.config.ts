import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/login'
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token.id) {
				session.user.id = token.id as string;
			}
			return session;
		},
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;
			const isOnPublicPage = ['/login', '/register'].includes(nextUrl.pathname);

			if (!isLoggedIn && !isOnPublicPage) {
				return Response.redirect(new URL('/login', nextUrl));
			}

			if (
				isLoggedIn &&
				(nextUrl.pathname === '/login' || nextUrl.pathname === '/register')
			) {
				return Response.redirect(new URL('/', nextUrl));
			}

			return true;
		},
		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith(baseUrl)) {
				return url;
			}
			return baseUrl;
		}
	},
	providers: []
} satisfies NextAuthConfig;
