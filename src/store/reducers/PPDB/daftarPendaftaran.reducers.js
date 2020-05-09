import * as Actions from '../../actions';

const initialState = {
    entities: {
        rows: [],
        count: 0,
        countAll: 0
    }
}

const DaftarPendaftaranReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CALON_PESERTA_DIDIK_DAFTAR:
        {
            return {
                ...state,
                entities: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default DaftarPendaftaranReducer;