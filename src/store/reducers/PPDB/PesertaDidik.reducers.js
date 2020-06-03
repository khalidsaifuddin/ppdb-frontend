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
    },
    cek_nisn: {
        rows: [],
        total: 0
    },
    validasi_berkas: {
        rows: [],
        total: 0
    },
    rekap_total: {},
    calon_pd_sekolah: {
        rows: [],
        count : 0,
        countAll: 0
    },
    calon_pd_sekolah_list: {
        rows: [],
        count: 0,
        countAll: 0
    },
    peringkat_peserta_didik: {
        rows: [],
        count : 0,
        countAll: 0
    },
    rekap_kuota_sekolah: {
        rows: [],
        count : 0,
        countAll: 0
    }
}

const PPDBPesertaDidikReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_REKAP_TOTAL:
        {
            return {
                ...state,
                rekap_total: action.payload
            };
        }
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
        case Actions.CEK_NISN:
        {
            return {
                ...state,
                cek_nisn: action.payload
            };
        }
        case Actions.VALIDASI_BERKAS:
        {
            return {
                ...state,
                validasi_berkas: action.payload
            };
        }
        case Actions.GET_CALON_PD_SEKOLAH:
        {
            return {
                ...state,
                calon_pd_sekolah: action.payload
            };
        }
        case Actions.GET_CALON_PD_SEKOLAH_LIST:
        {
            return {
                ...state,
                calon_pd_sekolah_list: action.payload
            }
        }
        case Actions.PERINGKAT_PESERTA_DIDIK:
        {
            return {
                ...state,
                peringkat_peserta_didik: action.payload
            };
        }
        case Actions.REKAP_KUOTA_SEKOLAH:
        {
            return {
                ...state,
                rekap_kuota_sekolah: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default PPDBPesertaDidikReducer;