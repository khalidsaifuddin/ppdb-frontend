import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

class tambahKonfirmasi extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            orang_tua_utama: 'ayah',
            pendidikan_terakhir_id_ayah: 99,
            pekerjaan_id_ayah: 98,
            pendidikan_terakhir_id_ibu: 99,
            pekerjaan_id_ibu: 98,
            pendidikan_terakhir_id_wali: 99,
            pekerjaan_id_wali: 98,
            jenis_kelamin: 'L',
            calon_peserta_didik_id: this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null,
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
        smartSelectJalur: (<></>),
        sekuen_sekolah_pilihan: 0,
        arrSekolahPilihan: [],
        listSekolahPilihan: [],
        sheetOpened: false,
        displaySekolahPilihan: {}
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

            if(this.state.routeParams.calon_peserta_didik_id){
                this.props.getCalonPesertaDidik(this.state.routeParams).then((result)=>{
                    this.setState({
                        routeParams: {
                            ...this.state.routeParams,
                            ...this.props.calon_peserta_didik.rows[0],
                            jalur_id: '0100'
                        }
                    },()=>{
                        
                    })
                });
            }
        });

    }
    
    

    simpan = () => {


        this.setState({
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            
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

    render()
    {
        return (
            <Page name="tambahKonfirmasi" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Tambah Peserta Didik</NavTitle>
                    <NavTitleLarge>
                        Tambah Peserta Didik
                    </NavTitleLarge>
                </Navbar>
                <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '8px', marginBottom: '8px'}}>
                    <Button style={{borderRadius:'20px 50px 50px 20px'}}>Identitas Peserta Didik</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Jalur dan Pilihan Sekolah</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Kelengkapan Berkas</Button>
                    <Button style={{borderRadius:'0px 0px 0px 0px'}} tabLinkActive>Konfirmasi</Button>
                </Segmented>

                <Row noGap>
                    <Col width="100" tabletWidth="100">
                        <Card>
                            <CardContent>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
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
      hapusSekolahPilihan: Actions.hapusSekolahPilihan
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        mst_wilayah: Ref.mst_wilayah,
        calon_peserta_didik: PPDBPesertaDidik.calon_peserta_didik,
        sekolah_pilihan: PPDBPesertaDidik.sekolah_pilihan
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahKonfirmasi));
  