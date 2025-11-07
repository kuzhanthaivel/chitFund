import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user.type';
import { toast } from 'react-hot-toast';
import baseUri from '../utils/baseUri';

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            console.log("ammadi athadi inga thanda adi");
            if (!token) {
                return rejectWithValue('No token found');
            }

            const response = await fetch(
                `${baseUri}/api/auth/userData`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                console.log("thakkali responce illa");
                if (response.status === 401 || response.status === 403 || response.status === 404) {
                    localStorage.removeItem("token");
                    toast.error("Unauthorized");
                    return rejectWithValue('Unauthorized');
                }
                const errorData = await response.json();
                toast.error(errorData.message || `HTTP error! status: ${response.status}`);
                return rejectWithValue(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("ammadi athadi inga thanda adi");
            console.log("manada soodu ",data);
            return data.user;
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch user data');
            return rejectWithValue(error.message || 'Failed to fetch user data');
        }
    }
);

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
        },
                setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.user = null;
            });
    }
})

export const { logout, clearError } = authenticationSlice.actions;
export default authenticationSlice.reducer;