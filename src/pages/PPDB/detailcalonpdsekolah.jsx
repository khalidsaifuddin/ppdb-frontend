import React, {Component} from 'react';
import {
    Page, Icon, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, Subnavbar, BlockTitle, Searchbar, Segmented, Tabs, Tab
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class DetailcalonpdSekolah extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            searchText : '20520603',
        }
    }

    getData = () => {
        this.setState({
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            this.props.getSekolahCalonpd(this.state.routeParams);
        });

    }

    ketikCari = (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                searchText: e.target.value,
            }
        })
    }

    componentDidMount = () => {
        this.getData();
    }

    render()
    {
        return (
            <Page name="cari">
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Daftar Sekolah</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari Sekolah"
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.getData}
                            customSearch={true}
                            onChange={this.ketikCari}
                            value={this.state.routeParams.searchText}
                            // clickClear={this.clickClear}
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>

                <Block strong style={{marginTop:'-4px', marginBottom:'0px'}}>Daftar Sekolah</Block>
                
                {this.props.sekolah_calonpd.rows.map((option, key)=>{

                    return (

                        <Card className="demo-card-header-pic" key={key}>
                            <CardContent>
                                <Row>
                                    <Col width="30" tabletWidth="15" style={{background:"#cccccc", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden', margin: '-15px'}}>
                                        <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'136px', minHeight:'136px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                                        {/* <img src={(option.pas_foto.search("assets") !== -1 ? localStorage.getItem("api_base")+option.pas_foto : option.pas_foto)} style={{maxHeight:'120px', minHeight:'120px', border:'0px solid #ccc', marginBottom:'-5px'}}></img>  */}
                                    </Col>
                                    <Col width="70" tabletWidth="85">
                                        <Row noGap>
                                            <Col width="100">
                                                <a href="#">
                                                    <h2 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                        { option.nama + " (" + option.npsn + ")" }
                                                    </h2>
                                                </a>
                                            </Col>
                                            <Col width="100" tabletWidth="25">
                                                Kecamatan: <b>{ option.kecamatan }</b> <br/>
                                                Kabupaten: <b>{ option.kabupaten }</b> <br/>
                                                Provinsi: <b>{ option.provinsi }</b> <br/>
                                                Alamat: <b>{ option.alamat_jalan }</b> <br/>
                                            </Col>
                                            <Col width="100" tabletWidth="25">
                                                Bentuk: <b>{ option.bentuk }</b> <br/>
                                                Status: <b>{ option.status }</b> <br/>
                                            </Col>
                                            <Col width="100" tabletWidth="25">
                                                Kouta: <b>{ option.kouta }</b> <br/>
                                                Pendaftar: <b>{ option.pendaftar }</b> <br/>
                                                Diterima: <b>{ option.terima }</b> <br/>
                                                Sisa Kouta: <b>{ option.sisa_kouta }</b> <br/>
                                            </Col>
                                            <Col width="100" tabletWidth="25">
                                                <Button raised fill href={"/detailCalonpdSekolah/" + option.sekolah_id}>
                                                    <Icon ios="f7:doc_plaintext" style={{fontSize:'20px'}}/>
                                                    &nbsp; Daftarkan Calon Peserta Didik ke Sekolah Ini
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    )
                })}
                
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getSekolahCalonpd                         : Actions.getSekolahCalonpd
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah }) {
    return {
        window_dimension                        : App.window_dimension,
        sekolah_calonpd                         : PPDBSekolah.sekolah_calonpd
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DetailcalonpdSekolah));
  