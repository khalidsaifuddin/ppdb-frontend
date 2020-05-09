import * as Actions from '../../actions';

const initialState = {
    ppdb_sekolah: {
        rows: [],
        total: 0
    }
}

const PPDBSekolahReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PPDB_SEKOLAH:
        {
            return {
                ...state,
                ppdb_sekolah: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default PPDBSekolahReducer;