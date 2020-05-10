
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

import notifikasi from '../pages/Notifikasi/notifikasi';
import cari from '../pages/PPDB/cari';
import tambahCalonPesertaDidik from '../pages/PPDB/tambahCalonPesertaDidik';
import tambahJalurSekolah from '../pages/PPDB/tambahJalurSekolah';
import tambahBerkas from '../pages/PPDB/tambahBerkas';
import tambahKonfirmasi from '../pages/PPDB/tambahKonfirmasi';
import DataPendaftaran from '../pages/PPDB/dataPendaftaran';
import petaPD from '../pages/PPDB/petaPD';
import Detailcalonpdsekolah from '../pages/PPDB/detailcalonpdsekolah';
import Detailcalonpdsiswa from '../pages/PPDB/detailcalonpdsiswa';

var routes = [
  {
    path: '/',
    component: Beranda,
  },
  {
    path: '/Cari',
    component: cari
  },
  {
    path: '/tambahCalonPesertaDidik',
    component: tambahCalonPesertaDidik
  },
  {
    path: '/tambahCalonPesertaDidik/:peserta_didik_id',
    component: tambahCalonPesertaDidik
  },
  {
    path: '/tambahJalurSekolah',
    component: tambahJalurSekolah
  },
  {
    path: '/tambahJalurSekolah/:peserta_didik_id',
    component: tambahJalurSekolah
  },
  {
    path: '/tambahKonfirmasi',
    component: tambahKonfirmasi
  },
  {
    path: '/tambahKonfirmasi/:peserta_didik_id',
    component: tambahKonfirmasi
  },
  {
    path: '/tambahBerkas',
    component: tambahBerkas
  },
  {
    path: '/tambahBerkas/:peserta_didik_id',
    component: tambahBerkas
  },
  {
    path: '/tambahBerkas/:peserta_didik_id/:jalur_id',
    component: tambahBerkas
  },
  {
    path: '/Daftar/',
    component: DataPendaftaran
  },
  {
    path: '/detailCalonpdSekolah/',
    component: Detailcalonpdsekolah
  },
  {
    path: '/detailCalonpdSekolah/:sekolah_id',
    component: Detailcalonpdsiswa
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
    path: '/petaPD/:peserta_didik_id/:lintang/:bujur',
    component: petaPD,
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
