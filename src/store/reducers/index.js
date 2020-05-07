import {combineReducers} from 'redux';
import App from './App.reducers';
import Pertanyaan from './Pertanyaan.reducers';
import Notifikasi from './Notifikasi.reducers';
import Ruang from './Ruang.reducers';
import Kuis from './Kuis.reducers';
import Ref from './Ref.reducers';

const rootReducer = combineReducers({
    App,
    Pertanyaan,
    Notifikasi,
    Ruang,
    Kuis,
    Ref
});

export default rootReducer;
