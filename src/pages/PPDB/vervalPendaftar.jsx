import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio, Preloader
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import Dropzone from 'react-dropzone';

class vervalPendaftar extends Component {
    state = {
        error: null,
        loading: true,
        routeParams:{
            calon_peserta_didik_id: this.$f7route.params['calon_peserta_didik_id'] ? this.$f7route.params['calon_peserta_didik_id'] : null,
            sekolah_id: JSON.parse(localStorage.getItem('user')).sekolah_id
        },
        sekolah_terpilih: {
            sekolah_id: null,
            nama: null
        },
        provinsi: {
            rows: [],
            count: 0
        },
        kabupaten: {
            rows: [],
            count: 0
        },
        kecamatan: {
            rows: [],
            count: 0
        },
        berkas_calon: [],
        sekuen_sekolah_pilihan: 0,
        arrSekolahPilihan: [],
        listSekolahPilihan: [],
        sheetOpened: false,
        displaySekolahPilihan: {},
        
        disabledInput: false
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
            routeParams: {
                ...this.state.routeParams
            },
            routeParamsWilayah: {
                ...this.state.routeParamsWilayah,
                id_level_wilayah: 1
            }
        },()=>{

            // this.props.getBerkasJalur(this.state.routeParams);

            if(this.state.routeParams.calon_peserta_didik_id){
                this.props.getCalonPesertaDidik(this.state.routeParams).then((result)=>{
                    this.setState({
                        routeParams: {
                            ...this.state.routeParams,
                            ...this.props.calon_peserta_didik.rows[0]
                        },
                        loading: false
                    },()=>{
                        //what to do next
                    });
                });
            }
        });

    }

    setSelectValue = (key) => (b) => {
        // console.log(b);
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: b.target.value
            }
        },()=>{
            
        });
    }

    setFieldValue = (key) => (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: e.target.value
            }
        },()=>{
            console.log(this.state.routeParams);
        });
    }

    simpanVerval = () => {
        // console.log(this.state.routeParams);
        this.setState({
            loading: true
        },()=>{
            this.props.simpanPesertaDidikDiterima(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                },()=>{
                    this.$f7router.navigate("/DaftarCalonPesertaDidikSekolah/");
                });
            })
        });
    }

    klikVerval = (status_terima) => {
        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                status_terima: status_terima
            }
        });
    }

    render()
    {
        return (
            <Page name="vervalPendaftar" hideBarsOnScroll>
                {/* <Navbar sliding={false}> */}
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Verifikasi Calon Peserta Didik</NavTitle>
                    {/* <NavTitle sliding>{this.state.routeParams.nama}</NavTitle> */}
                    <NavTitleLarge>
                        Verifikasi Calon Peserta Didik
                    </NavTitleLarge>
                </Navbar>
                <div style={{marginTop:'15px'}}>
                    &nbsp;
                </div>
                <Card>
                    <CardContent>
                        <h1>{this.state.routeParams.nama}</h1>

                        <List>
                            <ListItem title="Diverifikasi">
                                <Radio 
                                    name={"status_terima"} 
                                    value={1} 
                                    slot="media"
                                    onChange={()=>this.klikVerval(1)}
                                    disabled={this.state.loading}
                                    // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                                />
                            </ListItem>
                            <ListItem title="Berkas Tidak Lengkap">
                                <Radio 
                                    name={"status_terima"} 
                                    value={2} 
                                    slot="media"
                                    onChange={()=>this.klikVerval(2)}
                                    disabled={this.state.loading}
                                    // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                                />
                            </ListItem>
                            <ListItem title="Ditolak">
                                <Radio 
                                    name={"status_terima"} 
                                    value={3} 
                                    slot="media"
                                    onChange={()=>this.klikVerval(3)}
                                    disabled={this.state.loading}
                                    // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                                />
                            </ListItem>
                            <ListItem title="Cabut Berkas">
                                <Radio 
                                    name={"status_terima"} 
                                    value={4} 
                                    slot="media"
                                    onChange={()=>this.klikVerval(4)}
                                    disabled={this.state.loading}
                                />
                            </ListItem>
                        </List>
                        <br/>
                        <br/>
                        <Button disabled={this.state.loading} raised fill large onClick={this.simpanVerval}>
                        {this.state.loading && <Preloader color="white"></Preloader>}&nbsp;Simpan
                        </Button>
                    </CardContent>
                </Card>
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
      simpanBerkasCalon: Actions.simpanBerkasCalon,
      getBerkasCalon: Actions.getBerkasCalon,
      getBerkasJalur: Actions.getBerkasJalur,
      simpanPesertaDidikDiterima: Actions.simpanPesertaDidikDiterima
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        mst_wilayah: Ref.mst_wilayah,
        calon_peserta_didik: PPDBPesertaDidik.calon_peserta_didik,
        berkas_calon: PPDBPesertaDidik.berkas_calon,
        berkas_jalur: App.berkas_jalur
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(vervalPendaftar));
  