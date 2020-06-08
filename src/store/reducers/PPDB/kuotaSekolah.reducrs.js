import * as Actions from '../../actions';

const initialState = {
    sekolah : {
        rows: [],
        count: 0,
        countAll: 0
    },
    sekolah_detail : []
}

const KuotaSekolahReducres = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.KUOTA__GET_SEKOLAH:
        {
            return {
                ...state,
                sekolah: {
                    ...state.sekolah,
                    ...action.payload
                }
            };
        }
        case Actions.KUOTA__GET_SEKOLAH_DETAIL:
        {
            return {
                ...state,
                sekolah_detail: action.payload.count === 1 ? action.payload.rows[0] : []
            }
        }
        default:
        {
            return state;
        }
    }
}

export default KuotaSekolahReducres;