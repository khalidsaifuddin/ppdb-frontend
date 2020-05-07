import axios from 'axios/index';

export const SIMPAN_RUANG = '[RUANG] SIMPAN RUANG';
export const SIMPAN_PERTANYAAN_RUANG = '[RUANG] SIMPAN PERTANYAAN RUANG';
export const SIMPAN_PENGGUNA_RUANG = '[RUANG] SIMPAN PENGGUNA RUANG';
export const GET_RUANG = '[RUANG] GET RUANG';
export const GET_PENGGUNA_RUANG = '[RUANG] GET PENGGUNA RUANG';
export const GET_RUANG_DIIKUTI = '[RUANG] GET RUANG DIIKUTI';

export function simpanRuang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Ruang/simpanRuang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_RUANG,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanPertanyaanRuang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Ruang/simpanPertanyaanRuang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_PERTANYAAN_RUANG,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanPenggunaRuang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Ruang/simpanPenggunaRuang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_PENGGUNA_RUANG,
                payload: response.data,
                routeParams
            })
        );
}

export function getRuang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Ruang/getRuang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_RUANG,
                payload: response.data,
                routeParams
            })
        );
}

export function getPenggunaRuang(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Ruang/getPenggunaRuang', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PENGGUNA_RUANG,
                payload: response.data,
                routeParams
            })
        );
}

export function getRuangDiikuti(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Ruang/getRuangDiikuti', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_RUANG_DIIKUTI,
                payload: response.data,
                routeParams
            })
        );
}