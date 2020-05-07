import * as Actions from '../actions';

const initialState = {
    kuis: {
        rows: [],
        total: 0
    },
    pengguna_kuis: {
        rows: [],
        total: 0
    },
    kuis_diikuti: {
        rows: [],
        total: 0
    },
    kuis_ruang: {
        rows: [],
        total: 0
    },
    jawaban_kuis: {
        rows: [],
        total: 0
    },
    pertanyaan_kuis: {
        rows: [],
        total: 0
    },
    fe_kuis: {
        rows: [],
        total: 0,
        jenjang_id: 0
    },
    uuid_kuis: ''
};

const KuisReducers = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GENERATE_UUID:
        {
            return {
                ...state,
                uuid_kuis: action.payload
            };
        }
        case Actions.SIMPAN_KUIS:
        {
            return {
                ...state,
                kuis: action.payload
            };
        }
        case Actions.GET_KUIS:
        {
            return {
                ...state,
                kuis: action.payload
            };
        }
        case Actions.GET_PENGGUNA_KUIS:
        {
            return {
                ...state,
                pengguna_kuis: action.payload
            };
        }
        case Actions.GET_PERTANYAAN_KUIS:
        {
            return {
                ...state,
                pertanyaan_kuis: action.payload
            };
        }
        case Actions.SET_KUIS:
        {
            return {
                ...state,
                fe_kuis: action.payload
            };
        }
        case Actions.GET_KUIS_DIIKUTI:
        {
            return {
                ...state,
                kuis_diikuti: action.payload
            };
        }
        case Actions.GET_KUIS_RUANG:
        {
            return {
                ...state,
                kuis_ruang: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default KuisReducers;