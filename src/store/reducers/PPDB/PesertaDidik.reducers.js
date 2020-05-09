import * as Actions from '../../actions';

const initialState = {
    peserta_didik: {
        rows: [],
        total: 0
    },
    calon_peserta_didik: {
        rows: [],
        total: 0
    },
    sekolah_pilihan: {
        rows: [],
        total: 0
    },
    berkas_calon: {
        rows: [],
        total: 0
    },
    cek_nik: {
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
        case Actions.GET_CALON_PESERTA_DIDIK:
        {
            return {
                ...state,
                calon_peserta_didik: action.payload
            };
        }
        case Actions.GET_SEKOLAH_PILIHAN:
        {
            return {
                ...state,
                sekolah_pilihan: action.payload
            };
        }
        case Actions.GET_BERKAS_CALON:
        {
            return {
                ...state,
                berkas_calon: action.payload
            };
        }
        case Actions.CEK_NIK:
        {
            return {
                ...state,
                cek_nik: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default PPDBPesertaDidikReducer;