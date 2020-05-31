import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio, Preloader
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import Dropzone from 'react-dropzone';

class ProfilCalon extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            calon_peserta_didik_id: this.$f7route.params['calon_peserta_didik_id'] ? this.$f7route.params['calon_peserta_didik_id'] : null
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
                        }
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

    render()
    {
        return (
            <Page name="ProfilCalon" hideBarsOnScroll>
                {/* <Navbar sliding={false}> */}
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.state.routeParams.nama}</NavTitle>
                    <NavTitleLarge>
                        {this.state.routeParams.nama}
                    </NavTitleLarge>
                </Navbar>
                <div style={{marginTop:'15px'}}>
                    &nbsp;
                </div>
                <Card className="userDesc" noShadow noBorder>
                    <CardHeader>
                        Identitas
                    </CardHeader>
                    <CardContent padding={false}>
                      <List inlineLabels noHairlinesMd>
                        <ListInput
                          label="NIK"
                          type="number"
                          placeholder="NIK"
                          clearButton
                          disabled
                          value={this.state.pengguna.rows[0].nik || ''}
                        //   onChange={this.setValue('nik')}
                        >
                          
                        </ListInput>
                        <ListInput
                          label="Alamat Rumah"
                          type="text"
                          placeholder="Alamat Rumah"
                          clearButton
                          disabled
                          value={this.state.pengguna.rows[0].alamat || ''}
                        //   onChange={this.setValue('alamat')}
                        >
                        </ListInput>
                      </List>
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
      getBerkasJalur: Actions.getBerkasJalur
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

export default (connect(mapStateToProps, mapDispatchToProps)(ProfilCalon));
  