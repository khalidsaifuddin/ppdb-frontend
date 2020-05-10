import * as Actions from '../../actions';

const initialState = {
    ppdb_sekolah: {
        rows: [],
        total: 0
    },
    sekolah_calonpd : {
        rows: [],
        count: 0,
        countAll: 0
    },
    calonpd_sekolah : {
        rows: [],
        count : 0,
        countAll: 0
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
        case Actions.GET_SEKOLAH_CALON_PD:
        {
            return {
                ...state,
                sekolah_calonpd: {
                    rows: action.payload.rows,
                    count: action.payload.count,
                    countAll: action.payload.countAll
                }
            }
        }
        case Actions.GET_CALON_DB_SEKOLAH:
        {
            return {
                ...state,
                calonpd_sekolah: {
                    rows: action.payload.rows,
                    count: action.payload.count,
                    countAll: action.payload.countAll
                }
            }
        }
        default:
        {
            return state;
        }
    }
}

export default PPDBSekolahReducer;