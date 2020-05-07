import axios from 'axios/index';

export const UPDATE_WINDOW_DIMENSION = '[APP] UPDATE WINDOW DIMENSION';
export const SET_LOADING = '[APP] SET LOADING';
export const SET_KEYWORD = '[APP] SET KEYWORD';
export const SET_TAB_ACTIVE = '[APP] SET TAB ACTIVE';
export const GET_SEKOLAH = '[APP] GET SEKOLAH';
export const GET_COUNT_SEKOLAH = '[APP] GET COUNT SEKOLAH';
export const GET_REKAP_SEKOLAH = '[APP] GET REKAP SEKOLAH';
export const GET_SEKOLAH_INDIVIDU = '[APP] GET SEKOLAH INDIVIDU';
export const GET_WILAYAH = '[APP] GET WILAYAH';
export const GET_PROVINSI = '[APP] GET PROVINSI';
export const GET_KABUPATEN = '[APP] GET KABUPATEN';
export const GET_KECAMATAN = '[APP] GET KECAMATAN';
export const SET_JUDUL_KANAN = '[APP] SET JUDUL KANAN';
export const SET_ISI_KANAN = '[APP] SET ISI KANAN';
export const LOGIN = '[APP] LOGIN';
export const GET_PENGGUNA = '[APP] GET PENGGUNA';
export const SET_PENGGUNA = '[APP] SET PENGGUNA';
export const BUAT_PENGGUNA = '[APP] BUAT PENGGUNA';
export const GET_GEOJSON_BASIC = '[APP] GET GEOJSON BASIC';

export function updateWindowDimension()
{
    
    return (dispatch) => {
        return dispatch ({
            type: UPDATE_WINDOW_DIMENSION,
            window_dimension: {
                height: window.innerHeight,
                width: window.innerWidth
            }
        })
    }
}

export function setLoading(loading)
{
    return (dispatch) => {
        return dispatch ({
            type: SET_LOADING,
            loading: loading
        })
    }
}

export function setKeyword(keyword)
{
    return (dispatch) => {
        return dispatch ({
            type: SET_KEYWORD,
            keyword: keyword
        })
    }
}

export function setTabActive(tabBar)
{
    // console.log(tabBar);

    return (dispatch) => {
        return dispatch ({
            type: SET_TAB_ACTIVE,
            tabBar:tabBar
        })
    }
}

export function buatPengguna(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Otentikasi/buatPengguna', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : BUAT_PENGGUNA,
                payload: response.data,
                routeParams
            })
        );
}

export function getCountSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Sekolah/getCountSekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COUNT_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Sekolah/getSekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getRekapSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Sekolah/getRekapSekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_REKAP_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getSekolahIndividu(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Sekolah/getSekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SEKOLAH_INDIVIDU,
                payload: response.data,
                routeParams
            })
        );
}

export function getWilayah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/app/getWilayah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WILAYAH,
                payload: response.data,
                routeParams
            })
        );
}

export function getProvinsi(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/app/getWilayah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROVINSI,
                payload: response.data,
                routeParams
            })
        );
}

export function getKabupaten(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/app/getWilayah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KABUPATEN,
                payload: response.data,
                routeParams
            })
        );
}

export function getKecamatan(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/app/getWilayah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_KECAMATAN,
                payload: response.data,
                routeParams
            })
        );
}

export function setJudulKanan(string)
{
    
    return (dispatch) => {
        return dispatch ({
            type: SET_JUDUL_KANAN,
            judul_panel_kanan: string
        })
    }
}

export function setIsiKanan(object)
{
    
    return (dispatch) => {
        return dispatch ({
            type: SET_ISI_KANAN,
            isi_panel_kanan: object
        })
    }
}

export function login(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Otentikasi/masuk', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : LOGIN,
                payload: response.data,
                routeParams
            })
        );
}

export function getPengguna(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Otentikasi/getPengguna', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PENGGUNA,
                payload: response.data,
                routeParams
            })
        );
}

export function setPengguna(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Otentikasi/simpanPengguna', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SET_PENGGUNA,
                payload: response.data,
                routeParams
            })
        );
}


export function getGeoJsonBasic(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/app/getGeoJsonBasic', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_GEOJSON_BASIC,
                payload: response.data,
                routeParams
            })
        );
}