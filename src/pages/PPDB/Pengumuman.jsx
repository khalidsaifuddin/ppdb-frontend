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
  Block
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class Pengumuman extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            start: 0,
            limit: 20,
            status_sekolah: 1,
            bentuk_pendidikan_id: '5-6',
            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi')
        },
        pertanyaan: {
            rows: [],
            total: 0,
        },
        riwayat_kata_kunci: [],
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
        this.props.getPPDBSekolah(this.state.routeParams);
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
            searchText: event.target[0].value,
            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
            kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            status_sekolah: 1
          }
        }, ()=> {
          this.props.setKeyword(this.state.routeParams.keyword);
    
          this.props.getPPDBSekolah(this.state.routeParams);
        });
      }

    render() {
        return (
            <Page name="Pengumuman">
                {/* <Navbar sliding={false}>
                    {localStorage.getItem('judul_aplikasi')}
                </Navbar>
                <Searchbar
                    className="searchbar-demo"
                    placeholder="Cari Sekolah (Nama/NPSN)..."
                    searchContainer=".search-list"
                    searchIn=".item-title"
                    onSubmit={this.getData}
                    customSearch={true}
                    onChange={this.ketikCari}
                    defaultValue={this.state.routeParams.keyword}
                /> */}
                <Block strong style={{marginTop:'-44px', marginBottom:'0px'}}>
                    <div className={localStorage.getItem('tema_warna') === 'ungu-terong' ? "bgMain" : "bgMain2"}></div>
                    <div className="titleMain" style={{marginTop:'0px', marginBottom:'32px', paddingTop:'0px'}}>
                        <img src={localStorage.getItem('logo_wilayah')} height="70" alt="logo" />
                        <h2>{localStorage.getItem('judul_aplikasi')}</h2>
                        <h6>{localStorage.getItem('sub_judul_aplikasi')}</h6>
                    </div>
                    <Row>
                        <Col width={15} className="hilangDiMobile">
                            &nbsp;
                        </Col>
                        <Col width={100} tabletWidth={70}>        
                            <Searchbar
                                className="searchbar-demo"
                                placeholder="Cari Sekolah (Nama/NPSN)..."
                                searchContainer=".search-list"
                                searchIn=".item-title"
                                onSubmit={this.cari}
                                customSearch={true}
                                onChange={this.ketikCari}
                                defaultValue={this.state.routeParams.keyword}
                            />
                        </Col>
                        <Col width={15} className="hilangDiMobile">
                            &nbsp;
                        </Col>
                    </Row>
                    {/* <h4 style={{textAlign:'center', marginTop:'16px', color:'white'}}>Cari Nama/NPSN Sekolah</h4> */}
                    <Block strong className="daftarSekolah" style={{marginTop:'0px'}}>
                        <Row>
                            <Col width={15} className="hilangDiMobile">
                                &nbsp;
                            </Col>
                            <Col width={100} tabletWidth={70}>        
                                {this.props.ppdb_sekolah.rows.map((option)=>{
                                    return(
                                        <Card key={option.sekolah_id}>
                                            <CardContent padding={false}>
                                            <div className="gambarSekolah" style={{backgroundImage: 'url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)'}}>
                                                <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"}></img> 
                                            </div>
                                            <div className="tentangSekolah">
                                                <Link href={"#"}>
                                                <h3>
                                                    {this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nama.replace(new RegExp(this.props.keyword, "ig"), this.props.keyword.toUpperCase())}} /> : option.nama}
                                                    ({this.props.keyword ? <b dangerouslySetInnerHTML= {{__html:option.npsn.replace(new RegExp(this.props.keyword, "ig"), this.props.keyword.toUpperCase())}} /> : option.npsn})
                                                </h3>
                                                </Link>
                                                <Row>
                                                    <Col width="100" tabletWidth="40">
                                                        <div className="keteranganSekolah">
                                                        <span>Kecamatan</span>
                                                        <b>{option.kecamatan}</b>
                                                        </div>
                                                        <div className="keteranganSekolah">
                                                        <span>Kabupaten</span>
                                                        <b>{option.kabupaten}</b>
                                                        </div>
                                                        <div className="keteranganSekolah">
                                                        <span>Provinsi</span>
                                                        <b>{option.provinsi}</b>
                                                        </div>
                                                        <div className="keteranganSekolah">
                                                        <span>Alamat</span>
                                                        <b>{option.alamat_jalan}, {option.kode_pos}</b>
                                                        </div>
                                                    </Col>
                                                    <Col width="100" tabletWidth="30">
                                                        <div className="keteranganSekolah">
                                                        <span>Bentuk</span>
                                                        <b>{option.bentuk}</b>
                                                        </div>
                                                        <div className="keteranganSekolah">
                                                        <span>Status</span>
                                                        {option.status}
                                                        </div>
                                                    </Col>
                                                    <Col width="100" tabletWidth="30">
                                                        <Link href={"/PengumumanSekolah/"+option.sekolah_id} className="hilangDiMobile">
                                                            <Card style={{background:'#9D60FF'}}>
                                                                <CardContent style={{padding:'8px', textAlign:'center', color:'white', fontWeight:'bold'}}>
                                                                    Daftar
                                                                    <br/>
                                                                    Peserta Didik Baru Diterima
                                                                </CardContent>
                                                            </Card>
                                                        </Link>
                                                        <Link href={"/PengumumanSekolah/"+option.sekolah_id} className="hilangDiDesktop linkPengumuman" style={{paddingLeft:'0px',background:'#9D60FF'}}>
                                                            Daftar
                                                            <br/>
                                                            Peserta Didik Baru Diterima
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </div>
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
                </Block>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateWindowDimension: Actions.updateWindowDimension,
        setLoading: Actions.setLoading,
        setKeyword: Actions.setKeyword,
        getPPDBSekolah: Actions.getPPDBSekolah,
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        keyword: App.keyword,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        keyword: App.keyword,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Pengumuman));
