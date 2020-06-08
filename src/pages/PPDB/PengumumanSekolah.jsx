import React, { Component } from 'react';
import {
  Icon,
  Button,
  Row,
  Col,
  Card,
  CardContent,
  CardFooter,
  Link,
  BlockTitle,
  Page,
  Navbar,
  NavTitle,
  Subnavbar,
  Searchbar,
  Block,
  CardHeader
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class PengumumanSekolah extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            // kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            start: 0,
            limit: 20,
            // status_sekolah: 1,
            // bentuk_pendidikan_id: '5-6',
            // id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
            sekolah_id: this.$f7route.params['sekolah_id']
        },
        sekolah: {},
        riwayat_kata_kunci: [],
        peserta_didik_diterima: {
            rows: [],
            count: 0,
            countAll: 0
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
        'Desember',
    ]

    componentDidMount = () => {
        this.props.getPPDBSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                sekolah: this.props.ppdb_sekolah.rows[0]
            })
        });

        this.props.daftarPesertaDidikDiterima(this.state.routeParams).then((result)=>{
            this.setState({
                peserta_didik_diterima: this.props.peserta_didik_diterima
            })
        });
    }

    ketikCari = (e) => {
        this.setState({
          routeParams: {
            ...this.state.routeParams,
            keyword: e.currentTarget.value,
            searchText: e.currentTarget.value,
          }
        }, ()=> {
          this.props.setKeyword(this.state.routeParams.keyword);
        });
    }

    cari = () => {
        localStorage.setItem('riwayat_kata_kunci', event.target[0].value + ', ' + localStorage.getItem('riwayat_kata_kunci'));
    
        let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
        let objRiwayat = [];
    
        for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
          const element = arrRiwayat[indexRiwayat];
    
          objRiwayat[indexRiwayat] = {
            kata_kunci: element,
          };
        }
    
        this.setState({
          riwayat_kata_kunci: objRiwayat,
        }, ()=> {
          // console.log(this.state.riwayat_kata_kunci);
        });
    
        this.setState({
          loading: true,
          routeParams: {
            ...this.state.routeParams,
            keyword: event.target[0].value,
            searchText: event.target[0].value
          }
        }, ()=> {
            this.props.setKeyword(this.state.routeParams.keyword);
    
            this.props.daftarPesertaDidikDiterima(this.state.routeParams).then((result)=>{
                this.setState({
                    peserta_didik_diterima: this.props.peserta_didik_diterima
                })
            })
        });
    }

    render() {
        return (
            <Page name="PengumumanSekolah">
                <Block strong style={{marginTop:'-44px', marginBottom:'0px'}}>
                    <div style={{width:'100%',textAlign:'right'}}>
                        <Button raised fill onClick={()=>this.$f7router.navigate('/Pengumuman')} style={{display:'contents'}}>Kembali ke daftar sekolah</Button>
                    </div>
                    <div className={localStorage.getItem('tema_warna') === 'ungu-terong' ? "bgMain" : "bgMain2"}></div>
                    <div className="titleMain" style={{marginTop:'0px', marginBottom:'32px', paddingTop:'0px'}}>
                        <img src={localStorage.getItem('logo_wilayah')} height="70" alt="logo" />
                        <h2>{this.state.sekolah.nama} ({this.state.sekolah.npsn})</h2>
                        <h6>{this.state.sekolah.alamat_jalan}, {this.state.sekolah.kecamatan}, {this.state.sekolah.kabupaten}</h6>
                        <br/>
                        <div style={{fontWeight:'bold', fontSize:'20px'}}>
                            Daftar Peserta Didik Baru Diterima
                        </div>
                        <Row>
                        <Col width={15} className="hilangDiMobile">
                            &nbsp;
                        </Col>
                        <Col width={100} tabletWidth={70}>        
                            <Searchbar
                                className="searchbar-demo"
                                placeholder="Cari Peserta Didik (Nama/NISN/NIK)..."
                                // searchContainer=".search-list"
                                // searchIn=".item-title"
                                onSubmit={this.cari}
                                customSearch={true}
                                onChange={this.ketikCari}
                                defaultValue={this.state.routeParams.keyword}
                                customSearch
                            />
                        </Col>
                        <Col width={15} className="hilangDiMobile">
                            &nbsp;
                        </Col>
                    </Row>
                    </div>
                    <Row>
                        <Col width={15} className="hilangDiMobile">
                            &nbsp;
                        </Col>
                        <Col width={100} tabletWidth={70}>        
                            {this.props.peserta_didik_diterima.rows.map((option)=>{
                                return (
                                    <Card>
                                        <CardContent>
                                            <Row noGap>
                                                {/* <Col width={20} tabletWidth={10} style={{height:'80px', background:'url('+"http://117.53.47.95:8000"+option.pas_foto+')', backgroundSize:'contain', backgroundPosition:'center', backgroundRepeat:'no-repeat' }}>                                            
                                                </Col> */}
                                                <Col width={100} tabletWidth={100} style={{paddingLeft:'16px'}}>
                                                {/* <Col width={80} tabletWidth={90} style={{paddingLeft:'16px'}}> */}
                                                    <Row>
                                                        <Col width="100">
                                                            <h4 style={{marginTop:'0px', marginBottom:'4px'}}>{option.nama}</h4>
                                                        </Col>
                                                        <Col width="33">
                                                            NIK: {option.nik}
                                                            <br/>NISN: {option.nisn}
                                                            {/* <br/>asal sekolah */}
                                                        </Col>
                                                        <Col width="33">
                                                            Jalur {option.jalur}
                                                            <br/>No urut penerimaan {option.no_urut_penerimaan}
                                                            {option.jalur_id === '0400' &&
                                                            <>
                                                            <br/>Jarak {parseFloat(option.jarak_km).toFixed(2)} km ({parseFloat(option.jarak).toFixed(2)} m)
                                                            </>
                                                            }
                                                        </Col>
                                                        <Col width="33">
                                                            {option.tempat_lahir}, {option.tanggal_lahir}
                                                            <br/>kecamatan, kabupaten
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </Col>
                        <Col width={15} className="hilangDiMobile">
                            &nbsp;
                        </Col>
                    </Row>
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
        setKeyword: Actions.setKeyword,
        daftarPesertaDidikDiterima: Actions.daftarPesertaDidikDiterima
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        keyword: App.keyword,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        keyword: App.keyword,
        peserta_didik_diterima: PPDBPesertaDidik.peserta_didik_diterima
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(PengumumanSekolah));
