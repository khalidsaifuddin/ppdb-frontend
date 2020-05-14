import axios from 'axios/index';

export const GET_JADWAL_KEGIATAN = '[JADWAL_KEGIATAN] GET JADWAL KEGIATAN';
export const SAVE_JADWAL_KEGIATAN = '[JADWAL_KEGIATAN] SAVE JADWAL KEGIATAN';
export const DELETE_JADWAL_KEGIATAN = '[JADWAL_KEGIATAN] DELETE JADWAL KEGIATAN';
export const REF_JALUR_JADWAL_KEGIATAN = '[JADWAL_KEGIATAN] REF JALUR JADWAL KEGIATAN';
export const REF_MST_WILAYAH_JADWAL_KEGIATAN = '[JADWAL KEGIATAN] REF MST WILAYAH JADWAL KEGIATAN';
export const PER_JADWAL_KEGIATAN = '[JADWAL KEGIATAN] PER JADWAL KEGIATAN';
export const GET_JADWAL_KEGIATAN_BERANDA = '[JADWAL_KEGIATAN] GET JADWAL KEGIATAN BERANDA';

export function getJadwalKegiatan(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/JadwalKegiatan/get', {
        ...routeParams,
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_JADWAL_KEGIATAN,
                payload: response.data,
                routeParams
            })
        );
}

export function saveJadwalKegiatan(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/JadwalKegiatan/save', {
        ...routeParams,
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SAVE_JADWAL_KEGIATAN,
                payload: response.data,
            })
        );
}

export function deleteJadwalKegiatan(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/JadwalKegiatan/delete/' + routeParams);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : DELETE_JADWAL_KEGIATAN,
                payload: response.data,
            })
        );
}

export function getRefJalurJk(params)
{
    const request = axios.get(localStorage.getItem('api_base') + '/api/Ref/getJalur');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : REF_JALUR_JADWAL_KEGIATAN,
                payload: response.data,
            })
        );
}

export function getRefmstwilayahJK(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Ref/mst_wilayah', {
        ...routeParams,
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : REF_MST_WILAYAH_JADWAL_KEGIATAN,
                payload: response.data,
            })
        );
}

export function perJadwalkegiatan(params) {
    return {
        type: PER_JADWAL_KEGIATAN,
        payload: params,
    }
}

export function getJKberanda(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/JadwalKegiatan/beranda');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_JADWAL_KEGIATAN_BERANDA,
                payload: response.data,
                routeParams
            })
        );
}