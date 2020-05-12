import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio, NavLeft, NavRight, Fab, BlockTitle
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import Routing from 'leaflet-routing-machine';
import ExtraMarkers from 'leaflet-extra-markers';

class petaPD extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            foo:'bar'
        },
        wilayah_klien: {
            rows: [],
            count: 0
        }
    }

    bulan = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ]

    componentDidMount = () => {
        console.log(this.$f7route.url);
        localStorage.setItem('current_url', this.$f7route.url);

        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams
            },
            routeParamsWilayah: {
                ...this.state.routeParamsWilayah,
                id_level_wilayah: 2
            }
        },()=>{
            this.props.getWilayahKlien(this.state.routeParamsWilayah).then((result)=>{
                this.setState({
                    wilayah_klien: this.props.wilayah_klien
                });
            });
        });

    }

    pilih = (e) => {
        // alert('tes');
        this.setState({
            routeParamsWilayah: {
                ...this.state.routeParamsWilayah,
                kode_wilayah: e.target.value
            }
        },()=>{
            this.props.getWilayahKlien(this.state.routeParamsWilayah).then((result)=>{

                localStorage.setItem('sudah_pilih_kota',1);
                localStorage.setItem('logo_wilayah',this.props.wilayah_klien.rows[0].logo_wilayah);
                localStorage.setItem('kode_wilayah_aplikasi',this.props.wilayah_klien.rows[0].kode_wilayah);
                localStorage.setItem('judul_aplikasi',this.props.wilayah_klien.rows[0].judul_aplikasi);
                localStorage.setItem('wilayah_aplikasi',this.props.wilayah_klien.rows[0].judul_aplikasi);
                localStorage.setItem('sub_judul_aplikasi',this.props.wilayah_klien.rows[0].sub_judul_aplikasi);
                localStorage.setItem('id_level_wilayah_aplikasi',this.props.wilayah_klien.rows[0].id_level_wilayah);
                localStorage.setItem('lintang_aplikasi',this.props.wilayah_klien.rows[0].lintang_pusat);
                localStorage.setItem('bujur_aplikasi',this.props.wilayah_klien.rows[0].bujur_pusat);
                localStorage.setItem('zoom_aplikasi',this.props.wilayah_klien.rows[0].zoom_pusat);
        
                console.log(localStorage.getItem('sudah_pilih_kota'));
                console.log(localStorage.getItem('kode_wilayah'));

            });
        });


    }

    render()
    {
        const position = [this.state.lintang, this.state.bujur];

        return (
            <Page name="petaPD">
                <Navbar sliding={false}>
                    <NavTitle sliding>Pilih Wilayah domisili Anda</NavTitle>
                    <NavTitleLarge>
                        Pilih Wilayah domisili Anda
                    </NavTitleLarge>
                </Navbar>

                <Block className="pageWithTitle">
                    <BlockTitle>Kabupaten/Kota</BlockTitle>
                    <List>
                        <ListItem
                            title=" "
                            className="pilih_kota"
                            smartSelect
                            backdrop
                            style={{fontSize:'25px'}}
                            smartSelectParams={{openIn: 'popup', closeOnSelect: true}}
                            >
                            <select name="mac-windows" defaultValue="-" onChange={this.pilih}>
                                <option disabled value="-">-</option>
                                {/* <option value="windows">Windows</option> */}
                                {this.state.wilayah_klien.rows.map((option)=>{
                                    return (
                                        <option value={option.kode_wilayah}>{option.nama}</option>
                                    )
                                })}
                            </select>
                        </ListItem>
                    </List>
                    <Button raised fill large onClick={()=>window.location.href="/"}>
                        Simpan & Lanjutkan
                    </Button>
                </Block>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getPPDBSekolah: Actions.getPPDBSekolah,
      getMstWilayah: Actions.getMstWilayah,
      getCalonPesertaDidik: Actions.getCalonPesertaDidik,
      simpanCalonPesertaDidik: Actions.simpanCalonPesertaDidik,
      simpanSekolahPilihan: Actions.simpanSekolahPilihan,
      getSekolahPilihan: Actions.getSekolahPilihan,
      hapusSekolahPilihan: Actions.hapusSekolahPilihan,
      simpanKonfirmasiPendaftaran: Actions.simpanKonfirmasiPendaftaran,
      getKonfirmasiPendaftaran: Actions.getKonfirmasiPendaftaran,
      getWilayahKlien: Actions.getWilayahKlien
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        mst_wilayah: Ref.mst_wilayah,
        calon_peserta_didik: PPDBPesertaDidik.calon_peserta_didik,
        sekolah_pilihan: PPDBPesertaDidik.sekolah_pilihan,
        wilayah_klien: App.wilayah_klien
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(petaPD));
  