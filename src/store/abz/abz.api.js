import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const abzApi = createApi({
	reducerPath: 'abz/api',
	tagTypes: ['Users'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://frontend-test-assignment-api.abz.agency/api/v1/',
	}),
	endpoints: build => ({
		getUsers: build.query({
			query: (page = 1) => ({
				url: 'users',
				params: {
					page,
					count: 6,
				},
			}),
			providesTags: result =>
				result
					? [
							...result.users.map(({ id }) => ({ type: 'Users', id })),
							{ type: 'Users', id: 'LIST' },
					  ]
					: [{ type: 'Users', id: 'LIST' }],
		}),

		getPositions: build.query({
			query: () => ({
				url: 'positions',
			}),
			transformResponse: response => response.positions,
		}),

		getToken: build.query({
			query: () => ({
				url: 'token',
			}),
		}),

		addUser: build.mutation({
			query: ({ token, formData }) => {
				return {
					url: 'users',
					method: 'POST',
					headers: {
						Token: token,
					},
					body: formData,
				};
			},
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
	}),
});

export const {
	useLazyGetUsersQuery,
	useGetPositionsQuery,
	useLazyGetTokenQuery,
	useAddUserMutation,
} = abzApi;
