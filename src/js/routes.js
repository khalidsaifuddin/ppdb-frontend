
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
