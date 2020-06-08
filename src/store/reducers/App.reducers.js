import * as Actions from '../actions';
import React, {Component} from 'react';

const initialState = {
    judul_panel_kanan: 'Judulnya kanan',
    isi_panel_kanan: (<div>isinya panel kanan dari redux</div>),
    panel_kanan_buka: false,
    window_dimension : {
        height: window.innerHeight,
        width: window.innerWidth
    },
    loading: false,
    keyword: '',
    tabBar:{
        beranda: false,
        kategori: false,
        cari: false,
        materi: false,
        profil: false
    },
    sekolah: {
        rows: [{
            nama: '---',
            npsn: '---',
            bentuk: '---',
            status: '---',
            kecamatan: '---',
            kabupaten: '---',
            provinsi: '---'
        }],
        total: 0
    },
    count_sekolah: {
        total: 0
    },
    rekap_sekolah: {
        rows: [{
            nama: '---'
        }],
        total: 0
    },
    sekolah_individu: {
        rows: [{
            nama: '---',
            npsn: '---',
            bentuk: '---',
            status: '---',
            kecamatan: '---',
            kabupaten: '---',
            provinsi: '---'
        }],
        total: 0
    },
    wilayah: {
        rows: [{
            kode_wilayah: '---',
            nama: '---'
        }],
        total: 0
    },
    provinsi: {
        rows: [{
            kode_wilayah: '---',
            nama: '---'
        }],
        total: 0
    },
    kabupaten: {
        rows: [{
            kode_wilayah: '---',
            nama: '---'
        }],
        total: 0
    },
    kecamatan: {
        rows: [{
            kode_wilayah: '---',
            nama: '---'
        }],
        total: 0
    },
    dummy_rows:{
        rows: [{
            kode_wilayah: '---',
            nama: '---'
        },{
            kode_wilayah: '---',
            nama: '---'
        },{
            kode_wilayah: '---',
            nama: '---'
        }],
        total: 5
    },
    pengguna: {
        rows: [{
            pengguna_id: '---'
        }],
        total: 0
    },
    geojson_basic: [],
    wilayah_klien: {
        rows: [{
            kode_wilayah: '---'
        }],
        count: 0
    },
    berkas_jalur: {
        rows: [{
            jalur_id: '---',
        }],
        count: 0
    },
    geocode: [],
    pendaftar: 0,
    calon: 0
};

const appReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.UPDATE_WINDOW_DIMENSION:
        {
            return {
                ...state,
                window_dimension: action.window_dimension
            };
        }
        case Actions.SET_LOADING:
        {
            return {
                ...state,
                loading: action.loading
            };
        }
        case Actions.SET_KEYWORD:
        {
            return {
                ...state,
                keyword: action.keyword
            };
        }
        case Actions.SET_TAB_ACTIVE:
        {
            // console.log(action.tabBar);

            return {
                ...state,
                tabBar: action.tabBar
            };
        }
        case Actions.GET_SEKOLAH:
        {
            return {
                ...state,
                sekolah: action.payload
            };
        }
        case Actions.GET_COUNT_SEKOLAH:
        {
            return {
                ...state,
                count_sekolah: action.payload
            };
        }
        case Actions.GET_REKAP_SEKOLAH:
        {
            return {
                ...state,
                rekap_sekolah: action.payload
            };
        }
        case Actions.GET_SEKOLAH_INDIVIDU:
        {
            return {
                ...state,
                sekolah_individu: action.payload
            };
        }
        case Actions.GET_WILAYAH:
        {
            return {
                ...state,
                wilayah: action.payload
            };
        }
        case Actions.GET_PROVINSI:
        {
            return {
                ...state,
                provinsi: action.payload
            };
        }
        case Actions.GET_KABUPATEN:
        {
            return {
                ...state,
                kabupaten: action.payload
            };
        }
        case Actions.GET_KECAMATAN:
        {
            return {
                ...state,
                kecamatan: action.payload
            };
        }
        case Actions.SET_JUDUL_KANAN:
        {
            return {
                ...state,
                judul_panel_kanan: action.judul_panel_kanan
            };
        }
        case Actions.SET_ISI_KANAN:
        {
            return {
                ...state,
                isi_panel_kanan: action.isi_panel_kanan
            };
        }
        case Actions.PANEL_KANAN_BUKA:
        {
            return {
                ...state,
                panel_kanan_buka: action.panel_kanan_buka
            };
        }
        case Actions.GET_PENGGUNA:
        {
            return {
                ...state,
                pengguna: action.payload
            };
        }
        case Actions.BUAT_PENGGUNA:
        {
            return {
                ...state,
                pengguna: action.payload
            };
        }
        case Actions.GET_GEOJSON_BASIC:
        {
            return {
                ...state,
                geojson_basic: action.payload
            };
        }
        case Actions.GET_WILAYAH_KLIEN:
        {
            return {
                ...state,
                wilayah_klien: action.payload
            };
        }
        case Actions.GET_BERKAS_JALUR:
        {
            return {
                ...state,
                berkas_jalur: action.payload
            };
        }
        case Actions.GEOCODE:
        {
            return {
                ...state,
                geocode: action.payload
            };
        }
        case Actions.SET_PENDAFTAR:
        {
            return {
                ...state,
                pendaftar: action.pendaftar
            };
        }
        case Actions.SET_CALON:
        {
            return {
                ...state,
                calon: (action.calon ? action.calon : 0)
            };
        }
        default:
        {
            return state;
        }
    }
}

export default appReducer;