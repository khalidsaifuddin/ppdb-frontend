import axios from 'axios/index';

export const GENERATE_UUID = '[KUIS] GENERATE UUID';
export const SIMPAN_KUIS = '[KUIS] SIMPAN KUIS';
export const GET_KUIS = '[KUIS] GET KUIS';
export const GET_PERTANYAAN_KUIS = '[KUIS] GET PERTANYAAN KUIS';
export const SET_KUIS = '[KUIS] SET KUIS';
export const GET_PENGGUNA_KUIS = '[KUIS] GET PENGGUNA KUIS';
export const SIMPAN_PENGGUNA_KUIS = '[KUIS] SIMPAN PENGGUNA KUIS';
export const SIMPAN_JAWABAN_KUIS = '[KUIS] SIMPAN JAWABAN KUIS';
export const GET_KUIS_DIIKUTI = '[KUIS] GET KUIS DIIKUTI';
export const GET_KUIS_RUANG = '[KUIS] GET KUIS RUANG';

export function generateUUID(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/generateUUID', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GENERATE_UUID,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanKuis(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/simpanKuis', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_KUIS,
                payload: response.data,
                routeParams
            })
        );
}

export function getKuis(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/getKuis', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KUIS,
                payload: response.data,
                routeParams
            })
        );
}

export function getPertanyaanKuis(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/getPertanyaanKuis', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PERTANYAAN_KUIS,
                payload: response.data,
                routeParams
            })
        );
}

export function setKuis(routeParams)
{

    return (dispatch) => {
        return dispatch ({
            type: SET_KUIS,
            payload: routeParams
        })
    }
}

export function getPenggunaKuis(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/getPenggunaKuis', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PENGGUNA_KUIS,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanPenggunaKuis(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/simpanPenggunaKuis', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_PENGGUNA_KUIS,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanJawabanKuis(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/simpanJawabanKuis', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_JAWABAN_KUIS,
                payload: response.data,
                routeParams
            })
        );
}

export function getKuisDiikuti(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/getKuisDiikuti', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KUIS_DIIKUTI,
                payload: response.data,
                routeParams
            })
        );
}

export function getKuisRuang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuis/getKuisRuang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KUIS_RUANG,
                payload: response.data,
                routeParams
            })
        );
}