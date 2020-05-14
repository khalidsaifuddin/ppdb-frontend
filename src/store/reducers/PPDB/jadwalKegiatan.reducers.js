import * as Actions from '../../actions';

const initialState = {
    entities: {
        rows: [],
        count: 0,
        countAll: 0
    },
    perJadwalkegiatan : [],
    ref_jalur: [],
    ref_wilayah: [],
    beranda: []
}

const JadwalKegiatanReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_JADWAL_KEGIATAN:
        {
            return {
                ...state,
                entities: action.payload
            };
        }
        case Actions.REF_JALUR_JADWAL_KEGIATAN:
        {
            return {
                ...state,
                ref_jalur: action.payload
            }
        }
        case Actions.REF_MST_WILAYAH_JADWAL_KEGIATAN:
        {
            return {
                ...state,
                ref_wilayah: action.payload.rows
            }
        }
        case Actions.PER_JADWAL_KEGIATAN:
        {
            return {
                ...state,
                perJadwalkegiatan: action.payload
            }
        }
        case Actions.GET_JADWAL_KEGIATAN_BERANDA:
        {
            return {
                ...state,
                beranda: action.payload.rows 
            }
        }
        default:
        {
            return state;
        }
    }
}

export default JadwalKegiatanReducer;