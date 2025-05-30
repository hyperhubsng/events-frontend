import { apiSlice } from '../api/apiSlice';
import {
	CreateRolePayload,
	PermissionsData,
	RolesData,
	UpdateRolePayload,
} from './types';

const rolesPermissionsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query<RolesData, PaginationParams>({
			query: (params) => ({
				url: '/roles',
				params,
			}),
			providesTags: ['roles-and-permissions'],
		}),
		getPermissions: builder.query<PermissionsData, PaginationParams>({
			query: (params) => ({
				url: '/permissions',
				params,
			}),
			providesTags: ['roles-and-permissions'],
		}),
		createRole: builder.mutation({
			query: (body: CreateRolePayload) => ({
				url: '/roles',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['roles-and-permissions'],
		}),
		updateRole: builder.mutation({
			query: (body: UpdateRolePayload) => ({
				url: `/roles/${body.id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['roles-and-permissions'],
		}),
		deleteRole: builder.mutation({
			query: (id: string) => ({
				url: `/roles/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['roles-and-permissions'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetRolesQuery,
	useGetPermissionsQuery,
	useCreateRoleMutation,
	useUpdateRoleMutation,
	useDeleteRoleMutation,
} = rolesPermissionsApi;
