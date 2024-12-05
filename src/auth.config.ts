import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/login'
	},
	callbacks: {
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
