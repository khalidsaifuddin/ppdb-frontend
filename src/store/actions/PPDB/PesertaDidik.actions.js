import axios from 'axios/index';

export const GET_PESERTA_DIDIK = '[PESERTA DIDIK] GET PESERTA DIDIK';
export const GET_CALON_PESERTA_DIDIK = '[PESERTA DIDIK] GET CALON PESERTA DIDIK';
export const SIMPAN_CALON_PESERTA_DIDIK = '[PESERTA DIDIK] SIMPAN CALON PESERTA DIDIK';
export const IMPORT_PESERTA_DIDIK = '[PESERTA DIDIK] IMPORT PESERTA DIDIK';
export const SIMPAN_SEKOLAH_PILIHAN = '[PESERTA DIDIK] SIMPAN SEKOLAH PILIHAN';
export const GET_SEKOLAH_PILIHAN = '[PESERTA DIDIK] GET SEKOLAH PILIHAN';
export const HAPUS_SEKOLAH_PILIHAN = '[PESERTA DIDIK] HAPUS SEKOLAH PILIHAN';
export const SIMPAN_BERKAS_CALON = '[PESERTA DIDIK] SIMPAN BERKAS CALON';
export const GET_BERKAS_CALON = '[PESERTA DIDIK] GET BERKAS CALON';
export const SIMPAN_KONFIRMASI_PENDAFTARAN = '[PESERTA DIDIK] SIMPAN KONFIRMASI PENDAFTARAN';
export const GET_KONFIRMASI_PENDAFTARAN = '[PESERTA DIDIK] GET KONFIRMASI PENDAFTARAN';
export const CEK_NIK = '[PESERTA DIDIK] CEK NIK';
export const CEK_NISN = '[PESERTA DIDIK] CEK NISN';

export function getPesertaDidik(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/PesertaDidik/get', {
        // ...routeParams
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}

export function getCalonPesertaDidik(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/get', {
        // ...routeParams
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CALON_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}

export function importPesertaDidik(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/importDariPesertaDidikDapodik', {
        ...routeParams
        // params: {
        //     ...routeParams
        // }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : IMPORT_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}


export function simpanCalonPesertaDidik(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/save', {
        ...routeParams
        // params: {
        //     ...routeParams
        // }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_CALON_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanSekolahPilihan(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/simpanSekolahPilihan', {
        ...routeParams
        // params: {
        //     ...routeParams
        // }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_SEKOLAH_PILIHAN,
                payload: response.data,
                routeParams
            })
        );
}

export function getSekolahPilihan(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/getSekolahPilihan', {
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SEKOLAH_PILIHAN,
                payload: response.data,
                routeParams
            })
        );
}

export function hapusSekolahPilihan(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/hapusSekolahPilihan', {
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : HAPUS_SEKOLAH_PILIHAN,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanBerkasCalon(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/simpanBerkasCalon', {
        ...routeParams
        // params: {
        //     ...routeParams
        // }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_BERKAS_CALON,
                payload: response.data,
                routeParams
            })
        );
}


export function getBerkasCalon(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/getBerkasCalon', {
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BERKAS_CALON,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanKonfirmasiPendaftaran(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/simpanKonfirmasiPendaftaran', {
        ...routeParams
        // params: {
        //     ...routeParams
        // }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_KONFIRMASI_PENDAFTARAN,
                payload: response.data,
                routeParams
            })
        );
}


export function getKonfirmasiPendaftaran(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/getKonfirmasiPendaftaran', {
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KONFIRMASI_PENDAFTARAN,
                payload: response.data,
                routeParams
            })
        );
}

export function cekNik(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/cekNik', {
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : CEK_NIK,
                payload: response.data,
                routeParams
            })
        );
}

export function cekNISN(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/cekNISN', {
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : CEK_NISN,
                payload: response.data,
                routeParams
            })
        );
}