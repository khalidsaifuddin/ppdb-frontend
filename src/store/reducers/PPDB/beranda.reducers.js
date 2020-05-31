import * as Actions from '../../actions';

const initialState = {
    beranda_dinas   : {
        jadwal          : [],
        jalur           : {
            rows            : [],
            count_sd        : 0,
            count_smp       : 0
        },
        jalur_chart: {
            label: [],
            data: []
        },
        status_terima : {
            sd : 0,
            smp: 0
        },
        kuota: [],
        kuota_chart: {
            label: [],
            data: []
        },
        pilihan_sekolah: [],
        pilihan_sekolah_chart: {
            label : [],
            data : []
        }
    },
    beranda_sekolah : {
        sekolah: [],
        pendaftar: {
            kuota_0100 : [],
            kuota_0200 : [],
            kuota_0300 : [],
            kuota_0400 : [],
            kuota_0500 : [],
        },
        pilihan_sekolah: []
    }
}

const DaftarPendaftaranReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.BERANDA__GET_BERANDA_DINAS:
        {
            return {
                ...state,
                beranda_dinas: {
                    ...state.beranda_dinas,
                    ...action.payload
                }
            };
        }
        case Actions.BERANDA__GET_BERANDA_SEKOLAH:
        {
            return {
                ...state,
                beranda_sekolah: {
                    ...state.beranda_sekolah,
                    ...action.payload
                }
            };
        }
        default:
        {
            return state;
        }
    }
}

export default DaftarPendaftaranReducer;