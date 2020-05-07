import * as Actions from '../../actions';

const initialState = {
    peserta_didik: {
        rows: [],
        total: 0
    }
}

const PPDBPesertaDidikReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PESERTA_DIDIK:
        {
            return {
                ...state,
                peserta_didik: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default PPDBPesertaDidikReducer;