import React, {Component} from 'react';
import {
    Page, Icon, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, Subnavbar, BlockTitle, Searchbar, Segmented, Tabs, Tab
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';
import moment from 'moment';

import CariPesertaDidik from './cariPesertaDidik';
import CariSekolah from './cariSekolah';
import PPDBSekolahReducer from '../../store/reducers/PPDB/Sekolah.reducers';

class cari extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            // pantauan: 1
        },
        pertanyaan: {
            rows: [],
            total: 0
        },
        riwayat_kata_kunci: []
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
        
        let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
        let objRiwayat = [];

        for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
            const element = arrRiwayat[indexRiwayat];

            objRiwayat[indexRiwayat] = {
                kata_kunci: element
            };
            
        }

        this.setState({
            riwayat_kata_kunci: objRiwayat
        },()=>{
            console.log(this.state.riwayat_kata_kunci);
        });
    }

    cari = () => {
        localStorage.setItem('riwayat_kata_kunci', event.target[0].value + ', ' + localStorage.getItem('riwayat_kata_kunci'));
        // console.log(event.target[0].value);
        let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
        let objRiwayat = [];

        for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
            const element = arrRiwayat[indexRiwayat];

            objRiwayat[indexRiwayat] = {
                kata_kunci: element
            };
            
        }

        this.setState({
            riwayat_kata_kunci: objRiwayat
        },()=>{
            console.log(this.state.riwayat_kata_kunci);
        });

        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value,
                searchText: event.target[0].value
            }
        },()=>{
            this.props.setKeyword(this.state.routeParams.keyword);

            this.props.getPesertaDidik(this.state.routeParams);
            this.props.getPPDBSekolah(this.state.routeParams);

        })
    }

    ketikCari = (e) => {
        // console.log(e.currentTarget.value);
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                keyword: e.currentTarget.value,
                searchText: e.currentTarget.value
            }
        },()=>{
            this.props.setKeyword(this.state.routeParams.keyword);
        });
    }

    repeatKataKunci = (kata_kunci) => {
        // alert(kata_kunci);
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: kata_kunci,
                searchText: kata_kunci,

            }
        },()=>{
            this.props.setKeyword(kata_kunci);
            this.props.getPesertaDidik(this.state.routeParams);
            this.props.getPPDBSekolah(this.state.routeParams);
        })
    }

    daftarkanPesertaDidik = (peserta_didik_id) => {
        // console.log(this);
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                peserta_didik_id: peserta_didik_id,
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
            }
        },()=>{
            // console.log(this);
            // this.props.importPesertaDidik(this.state.routeParams);
            this.props.importPesertaDidik(this.state.routeParams).then((result) => {
                // console.log(this);
                if(result.payload.success === true){
                    this.$f7router.navigate('/tambahCalonPesertaDidik/' + peserta_didik_id);
                }else{

                }
            });

        });
    }

    render()
    {
        return (
            <Page name="cari" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Pencarian</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari peserta didik/sekolah..."
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.cari}
                            customSearch={true}
                            onChange={this.ketikCari}
                            value={this.state.routeParams.keyword}
                            // clickClear={this.clickClear}
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>
                
                <Block strong>
                {/* <Block strong style={{marginTop:'0px', marginBottom:'0px'}}> */}

                    Riwayat Pencarian:<br/>
                    <div style={{background:'#FAFAFA',border:'0px solid #ccc', padding:'8px', borderRadius:'4px'}}>
                    {this.state.riwayat_kata_kunci.map((option)=>{
                        
                        if(this.state.riwayat_kata_kunci.indexOf(option) <= 10){
                            return (
                                <><a onClick={()=>this.repeatKataKunci(option.kata_kunci)}><b><i>{option.kata_kunci}</i></b></a>, </>
                            )
                        }
                        
                    })}

                    </div>
                    {/* <br/> */}
                    {/* <b><i>{localStorage.getItem('riwayat_kata_kunci').substring(2,localStorage.getItem('riwayat_kata_kunci').length)}</i></b><br/> */}
                    <a onClick={()=>{localStorage.setItem('riwayat_kata_kunci','');this.setState({riwayat_kata_kunci:[]});}}>Bersihkan riwayat pencarian</a>
                </Block>
                
                <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '8px', marginBottom: '8px'}}>
                    <Button tabLink="#tab-1" tabLinkActive>Peserta Didik ({this.props.peserta_didik.countAll ? this.props.peserta_didik.countAll : "0"})</Button>
                    <Button tabLink="#tab-2">Sekolah ({this.props.ppdb_sekolah.countAll ? this.props.ppdb_sekolah.countAll : "0"})</Button>
                </Segmented>
                <Tabs animated style={{height:'initial'}}>
                    <Tab id="tab-1" className="page-content" tabActive style={{padding:'0px', overflow:'hidden'}}>
                        {/* <CariPesertaDidik /> */}
                        <div name="cariPesertaDidik">
                
                            <BlockTitle>Hasil Pencarian Peserta Didik (Hanya menampilkan peserta didik yang berada di tingkat akhir jenjangnya)</BlockTitle>
                            {this.props.peserta_didik.count < 1 &&
                            <Card className="demo-card-header-pic" key={null}>
                                <CardContent style={{textAlign:'center'}}>
                                    <h4>Data peserta didik tidak ditemukan</h4>
                                    {/* <br/> */}
                                    <Button raised fill style={{maxWidth:'400px', margin:'auto'}}>
                                        Tambahkan Peserta Didik Secara Manual
                                    </Button>
                                </CardContent>
                            </Card>
                            }
                            {this.props.peserta_didik.rows.map((option)=>{
                                return (

                                    <Card className="demo-card-header-pic" key={option.peserta_didik_id}>
                                        <CardContent>
                                            <Row>
                                                {/* <Col width="10" tabletWidth="20" style={{background:"url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}> */}
                                                    {/* <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img>  */}
                                                {/* </Col> */}
                                                <Col width="100" tabletWidth="100">
                                                    <Row noGap>
                                                        <Col width="100">
                                                            <a href={"#"}>  
                                                                <h3 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                                    {/* {opti} (NISN) */}
                                                                    {option.nama &&
                                                                    <>
                                                                    {this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nama.replace(new RegExp(this.props.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.props.keyword.toUpperCase()+"</span>")}} /> : option.nama} 
                                                                    </>
                                                                    }
                                                                    &nbsp;
                                                                    {option.nisn &&
                                                                    <>
                                                                    ({this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nisn.replace(new RegExp(this.props.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.props.keyword.toUpperCase()+"</span>")}} /> : option.nisn})
                                                                    </>
                                                                    }
                                                                </h3>
                                                            </a>
                                                        </Col>
                                                        <Col width="100" tabletWidth="70">
                                                            NIK: <b>{option.nik && <>{this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nik.replace(new RegExp(this.props.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.props.keyword.toLowerCase()+"</span>")}} /> : option.nik}</>}</b>
                                                            <br/>Asal Sekolah: <b>{option.nama_sekolah} ({option.npsn})</b>
                                                            <br/>Alamat Rumah: <b>{option.alamat_jalan_pd} {option.rt && <>RT {option.rt}/{option.rw}</>} {option.desa_kelurahan} {option.kecamatan}, {option.kabupaten}, {option.provinsi} </b>
                                                            <span className="hilangDiDesktop">
                                                                Tingkat Terakhir: Kelas {option.tingkat_pendidikan_id}<br/>
                                                                Status pendaftaran: 
                                                                {option.flag_pendaftar && <span>&nbsp;Sudah mendaftar</span>} 
                                                                {!option.flag_pendaftar && <span>&nbsp;Belum mendaftar</span>}
                                                            </span>
                                                        </Col>
                                                        <Col width="100" className="hilangDiMobile" tabletWidth="30">
                                                            Tingkat Terakhir: Kelas {option.tingkat_pendidikan_id}<br/>
                                                            Status pendaftaran: 
                                                            {option.flag_pendaftar && <span style={{color:'green',fontWeight:'bold'}}><br/>Sudah mendaftar</span>} 
                                                            {!option.flag_pendaftar && <span style={{color:'#434343',fontWeight:'bold'}}><br/>Belum mendaftar</span>}
                                                        </Col>
                                                        {/* <Col width="100" style={{marginTop:'10px', border:'1px solid #eceff1', padding:'8px'}}>
                                                            <Row noGap>
                                                                <Col width="100" tabletWidth="50">
                                                                    ...
                                                                </Col>
                                                                <Col width="100" tabletWidth="50">
                                                                    ...
                                                                </Col>
                                                            </Row>
                                                        </Col> */}
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardContent>
                                        <CardFooter>
                                            <Button raised fill disabled={option.flag_pendaftar ? true : (parseInt(option.tingkat_pendidikan_id) === 6 ? false : (parseInt(option.tingkat_pendidikan_id) === 9 ? false : true))} onClick={()=>this.daftarkanPesertaDidik(option.peserta_didik_id)}>
                                                <Icon ios="f7:doc_plaintext" style={{fontSize:'20px'}}/>
                                                &nbsp; Daftarkan Peserta Didik
                                            </Button>
                                            <div style={{fontStyle:'italic', fontSize:'12px', paddingLeft:'8px'}}>
                                                {(parseInt(option.tingkat_pendidikan_id) === 6 ? '' : (parseInt(option.tingkat_pendidikan_id) === 9 ? '' : <>Belum dapat mendaftar karena tidak berada pada tingkat akhir jenjang pendidikannya</>))}
                                                {((!option.flag_pendaftar ? '' : <>Peserta didik ini sudah didaftarkan sebelumnya</>))}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </div>

                    </Tab>
                    <Tab id="tab-2" className="page-content" style={{padding:'0px', overflow:'hidden'}}>
                        <CariSekolah />
                    
                    </Tab>
                </Tabs>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getPesertaDidik: Actions.getPesertaDidik,
      getPPDBSekolah: Actions.getPPDBSekolah,
      setKeyword: Actions.setKeyword,
      importPesertaDidik: Actions.importPesertaDidik
    }, dispatch);
}

function mapStateToProps({ App, PPDBPesertaDidik, PPDBSekolah }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        peserta_didik: PPDBPesertaDidik.peserta_didik,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        keyword: App.keyword
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(cari));
  