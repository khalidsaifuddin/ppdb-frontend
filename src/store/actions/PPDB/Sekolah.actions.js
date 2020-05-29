import axios from 'axios/index';

export const GET_PPDB_SEKOLAH = '[SEKOLAH] GET PPDB SEKOLAH';
export const GET_SEKOLAH_CALON_PD = '[SEKOLAH] GET CALON PD';
export const GET_SEKOLAH_DETAIL = '[SEKOLAH] GET SEKOLAH DETAIL';
export const GET_CALON_DB_SEKOLAH = '[SEKOLAH] GET CALON PD SEKOLAH'

export function getPPDBSekolah(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/Sekolah/get', {
        // ...routeParams
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PPDB_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getSekolahCalonpd(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/Sekolah/get', {
        // ...routeParams
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SEKOLAH_CALON_PD,
                payload: response.data,
                routeParams
            })
        );
}

export function getSekolahdetail(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/Sekolah/get', {
        // ...routeParams
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SEKOLAH_DETAIL,
                payload: response.data,
                routeParams
            })
        );
}

export function getCalonpdSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Sekolah/getCalon', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CALON_DB_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}