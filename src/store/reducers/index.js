import {combineReducers} from 'redux';
import App from './App.reducers';
import Pertanyaan from './Pertanyaan.reducers';
import Notifikasi from './Notifikasi.reducers';
import Ruang from './Ruang.reducers';
import Kuis from './Kuis.reducers';
import Ref from './Ref.reducers';
import PPDBPesertaDidik from './PPDB/PesertaDidik.reducers';
import PPDBSekolah from './PPDB/Sekolah.reducers';
import DaftarPendaftaran from './PPDB/daftarPendaftaran.reducers';

const rootReducer = combineReducers({
    App,
    Pertanyaan,
    Notifikasi,
    Ruang,
    Kuis,
    Ref,
    PPDBPesertaDidik,
    PPDBSekolah,
    DaftarPendaftaran
});

export default rootReducer;
