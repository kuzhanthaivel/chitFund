import { createSlice } from '@reduxjs/toolkit'

export interface PopUpState {
    addTransactionPopUp: boolean;
    addNotePopUp: boolean;
    updateProfilePopUp: boolean;
    sideBarOpen: boolean;
}
const initialState: PopUpState = {
    addTransactionPopUp: false,
    addNotePopUp: false,
    updateProfilePopUp: false,
    sideBarOpen: false,
}
export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        setAddTransactionPopUp: (state, action) => {
            state.addTransactionPopUp = action.payload;
            if (action.payload) {
                state.addNotePopUp = false;
                state.updateProfilePopUp = false;
            }
        },
        setAddNotePopUp: (state, action) => {
            state.addNotePopUp = action.payload;
            if (action.payload) {
                state.addTransactionPopUp = false;
                state.updateProfilePopUp = false;
            }
        },
        setUpdateProfilePopUp: (state, action) => {
            state.updateProfilePopUp = action.payload;
            if (action.payload) {
                state.addTransactionPopUp = false;
                state.addNotePopUp = false;
            }
        },
        setSideBarOpen: (state, action) => {
            state.sideBarOpen = action.payload;
        },
        closeAllPopups: (state) => {
            state.addTransactionPopUp = false;
            state.addNotePopUp = false;
            state.updateProfilePopUp = false;
            state.sideBarOpen = false;
        },
    },
})

export const { setAddTransactionPopUp, setAddNotePopUp, setUpdateProfilePopUp, setSideBarOpen, closeAllPopups } = popUpSlice.actions
export default popUpSlice.reducer