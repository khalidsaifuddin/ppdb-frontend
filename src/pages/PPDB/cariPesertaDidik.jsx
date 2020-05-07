import React, {Component} from 'react';
import {
    Page, Icon, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, Subnavbar, BlockTitle, Searchbar
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';
import moment from 'moment';

class cariPesertaDidik extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            keyword: this.props.keyword
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
        console.log(this.props);
        
        // this.props.getPesertaDidik(this.state.routeParams);
        
    }

    render()
    {
        return (
            <div name="cariPesertaDidik">
                
                <BlockTitle>Hasil Pencarian Peserta Didik</BlockTitle>
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
                                                    {option.flag_pendaftar && <span>Sudah mendaftar</span>} 
                                                    {!option.flag_pendaftar && <span>Belum mendaftar</span>}
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
                                <Button raised fill disabled={(parseInt(option.tingkat_pendidikan_id) === 6 ? false : true)}>
                                    <Icon ios="f7:doc_plaintext" style={{fontSize:'20px'}}/>
                                    &nbsp; Daftarkan Peserta Didik
                                </Button>
                                <div style={{fontStyle:'italic', fontSize:'12px', paddingLeft:'8px'}}>
                                    {(parseInt(option.tingkat_pendidikan_id) === 6 ? '' : <>Belum dapat mendaftar karena tidak berada pada tingkat akhir jenjang pendidikannya</>)}
                                </div>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getPesertaDidik: Actions.getPesertaDidik,
      setKeyword: Actions.setKeyword
    }, dispatch);
}

function mapStateToProps({ App, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        peserta_didik: PPDBPesertaDidik.peserta_didik,
        keyword: App.keyword
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(cariPesertaDidik));
  