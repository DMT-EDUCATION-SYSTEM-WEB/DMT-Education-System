import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../types';

interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    role: Role | null;
    status?: 'active' | 'locked';
    lastLogin?: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    role: null,
    status: 'active',
    lastLogin: undefined,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ id: string; name: string; email: string; role: Role; status?: 'active' | 'locked'; lastLogin?: string }>) {
            const { id, name, email, role, status, lastLogin } = action.payload;
            state.id = id;
            state.name = name;
            state.email = email;
            state.role = role;
            state.status = status || 'active';
            state.lastLogin = lastLogin;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.id = null;
            state.name = null;
            state.email = null;
            state.role = null;
            state.status = 'active';
            state.lastLogin = undefined;
            state.isAuthenticated = false;
        },
        updateUser(state, action: PayloadAction<{ name?: string; email?: string; role?: Role; status?: 'active' | 'locked'; lastLogin?: string }>) {
            const { name, email, role, status, lastLogin } = action.payload;
            if (name) state.name = name;
            if (email) state.email = email;
            if (role) state.role = role;
            if (status) state.status = status;
            if (lastLogin) state.lastLogin = lastLogin;
        },
    },
});

export const { login, logout, updateUser } = userSlice.actions;

export const selectCurrentUser = (state: any) => state.user;
export const selectUserRole = (state: any) => state.user.role;

export default userSlice.reducer;