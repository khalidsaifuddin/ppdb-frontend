import * as Actions from '../actions';

const initialState = {
    notifikasi: {
        rows: [],
        total: 0
    },
    simpan_notifikasi: {}
};

const NotifikasiReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SIMPAN_NOTIFIKASI:
        {
            return {
                ...state,
                simpan_notifikasi: action.payload
            };
        }
        case Actions.GET_NOTIFIKASI:
        {
            return {
                ...state,
                notifikasi: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default NotifikasiReducer;