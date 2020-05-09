import React, {Component} from 'react';
import {
    Page, Icon, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, Subnavbar, BlockTitle, Searchbar
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';
import moment from 'moment';

class cariSekolah extends Component {
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
        

        
    }

    render()
    {
        return (
            <div name="cariSekolah">
                
                <BlockTitle>Hasil Pencarian Sekolah</BlockTitle>
                {this.props.ppdb_sekolah.rows.map((option)=>{
                    return (

                        <Card className="demo-card-header-pic" key={"sekolah_id"}>
                            <CardContent>
                                <Row>
                                    <Col width="30" tabletWidth="20" style={{background:"url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                        <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                                    </Col>
                                    <Col width="70" tabletWidth="80">
                                        <Row noGap>
                                            <Col width="100">
                                                <a href={"/ProfilSekolah/"+"sekolah_id"}>
                                                    <h3 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                        {/* Nama Sekolah (NPSN) */}
                                                        {this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nama.replace(new RegExp(this.props.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.props.keyword.toUpperCase()+"</span>")}} /> : option.nama} 
                                                        &nbsp;
                                                        ({this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.npsn.replace(new RegExp(this.props.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.props.keyword.toUpperCase()+"</span>")}} /> : option.npsn})
                                                    </h3>
                                                </a>
                                            </Col>
                                            <Col width="100" tabletWidth="50">
                                                Kecamatan: <b>{option.kecamatan}</b>
                                                <br/>Kabupaten: <b>{option.kabupaten}</b>
                                                <br/>Provinsi: <b>{option.provinsi}</b>
                                                <br/>Alamat: <b>{option.alamat_jalan}, {option.kode_pos}</b>
                                                <span className="hilangDiDesktop">
                                                    Bentuk: <b>{option.bentuk}</b>
                                                    <br/>Status: <b>{option.status}</b>
                                                </span>
                                            </Col>
                                            <Col width="50" className="hilangDiMobile" tabletWidth="50">
                                                Bentuk: <b>{option.bentuk}</b>
                                                <br/>Status: <b>{option.status}</b>
                                            </Col>
                                            {/* <Col width="100" style={{marginTop:'10px', border:'1px solid #eceff1', padding:'8px'}}>
                                                <Row noGap>
                                                    <Col width="100" tabletWidth="50">
                                                        Rapor Mutu: <Icon style={{color:'#ff8f00', fontSize:'17px', marginTop: '-5px'}} f7="star_fill" /> {parseFloat(option.rapor_mutu).toFixed(2)}
                                                    </Col>
                                                    <Col width="100" tabletWidth="50">
                                                        Rapor Dapodik: <Icon style={{color:'#ff8f00', fontSize:'17px', marginTop: '-5px'}} f7="star_fill" /> {parseFloat(option.rapor_dapodik).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </Col> */}
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                            <CardFooter className="no-border" style={{display:'-webkit-inline-box', width:'100%'}}>
                                <Button raised fill>
                                    <Icon ios="f7:doc_plaintext" style={{fontSize:'20px'}}/>
                                    &nbsp; Daftarkan Peserta Didik ke Sekolah Ini
                                </Button>
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
      setLoading: Actions.setLoading
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        keyword: App.keyword,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(cariSekolah));
  