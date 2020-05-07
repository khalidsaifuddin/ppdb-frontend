
// import HomePage from '../pages/home.jsx';
import Beranda from '../pages/Beranda';
import ProfilPengguna from '../pages/ProfilPengguna';
import login from '../pages/login';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';

import LeftPage1 from '../pages/left-page-1.jsx';
import LeftPage2 from '../pages/left-page-2.jsx';
import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';
import CatalogPage from '../pages/catalog.jsx';
import SettingsPage from '../pages/settings.jsx';

import tambahPertanyaan from '../pages/Pertanyaan/tambahPertanyaan';
import pertanyaanPengguna from '../pages/Pertanyaan/pertanyaanPengguna';
import tampilPertanyaan from '../pages/Pertanyaan/tampilPertanyaan';
import pantauan from '../pages/Pertanyaan/pantauan';
import jawabPertanyaan from '../pages/Pertanyaan/jawabPertanyaan';
import cariPertanyaan from '../pages/Pertanyaan/cariPertanyaan';
import notifikasi from '../pages/Notifikasi/notifikasi';
import ruang from '../pages/Ruang/ruang';
import tambahRuang from '../pages/Ruang/tambahRuang';
import tampilRuang from '../pages/Ruang/tampilRuang';
import kodeRuang from '../pages/Ruang/kodeRuang';
import tambahPertanyaanRuang from '../pages/Ruang/tambahPertanyaanRuang';
import kuis from '../pages/Kuis/kuis';
import tambahKuis from '../pages/Kuis/tambahKuis';
import kodeKuis from '../pages/Kuis/kodeKuis';
import gabungKuis from '../pages/Kuis/gabungKuis';
import gabungRuang from '../pages/Ruang/gabungRuang';
import praTampilKuis from '../pages/Kuis/praTampilKuis';
import kerjakanKuis from '../pages/Kuis/kerjakanKuis';
import hasilAkhirKuis from '../pages/Kuis/hasilAkhirKuis';
import peringkatKuis from '../pages/Kuis/peringkatKuis';
import praTampilRuang from '../pages/Ruang/praTampilRuang';


var routes = [
  {
    path: '/',
    component: Beranda,
  },
  {
    path: '/tambahPertanyaan',
    component: tambahPertanyaan
  },
  {
    path: '/Cari',
    component: cariPertanyaan
  },
  {
    path: '/Kuis',
    component: kuis,
    keepAlive: false
  },
  {
    path: '/gabungKuis',
    component: gabungKuis,
    keepAlive: false
  },
  {
    path: '/gabungRuang',
    component: gabungRuang,
    keepAlive: false
  },
  {
    path: '/Kuis/:pengguna_id',
    component: kuis,
    keepAlive: false
  },
  {
    path: '/peringkatKuis/:kuis_id',
    component: peringkatKuis,
    keepAlive: false
  },
  {
    path: '/hasilAkhirKuis/:kuis_id',
    component: hasilAkhirKuis
  },
  {
    path: '/KodeKuis/:kuis_id',
    component: kodeKuis
  },
  {
    path: '/kerjakanKuis/:kuis_id',
    component: kerjakanKuis
  },
  {
    path: '/praTampilKuis/:kode_kuis',
    component: praTampilKuis
  },
  {
    path: '/praTampilRuang/:kode_ruang',
    component: praTampilRuang
  },
  {
    path: '/tambahKuis/:pengguna_id',
    component: tambahKuis
  },
  {
    path: '/tambahKuis/:pengguna_id/:kuis_id',
    component: tambahKuis
  },
  {
    path: '/tambahKuisRuang/:pengguna_id/:ruang_id',
    component: tambahKuis
  },
  {
    path: '/Ruang',
    component: ruang
  },
  {
    path: '/tambahRuang',
    component: tambahRuang
  },
  {
    path: '/tampilRuang/:ruang_id',
    component: tampilRuang
  },
  {
    path: '/kodeRuang/:ruang_id',
    component: kodeRuang
  },
  {
    path: '/tambahPertanyaanRuang/:ruang_id',
    component: tambahPertanyaanRuang
  },
  {
    path: '/pertanyaanPengguna/:pengguna_id',
    component: pertanyaanPengguna
  },
  {
    path: '/pantauan/:pengguna_id',
    component: pantauan
  },
  {
    path: '/tampilPertanyaan/:pertanyaan_id',
    component: tampilPertanyaan
  },
  {
    path: '/jawabPertanyaan/:pertanyaan_id',
    component: jawabPertanyaan
  },
  {
    path: '/notifikasi',
    component: notifikasi
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/ProfilPengguna',
    component: ProfilPengguna,
    // keepAlive: true,
  },
  {
    path: '/ProfilPengguna/:pengguna_id',
    component: ProfilPengguna,
    // keepAlive: true,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '/left-page-1/',
    component: LeftPage1,
  },
  {
    path: '/left-page-2/',
    component: LeftPage2,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
