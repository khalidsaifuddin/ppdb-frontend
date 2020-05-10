import React, {Component} from 'react';
import {
    Page, Icon, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, Subnavbar, BlockTitle, Searchbar, Segmented, Tabs, Tab
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class DetailcalonpdSiswa extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            sekolah_id: this.$f7route.params['sekolah_id'] ? this.$f7route.params['sekolah_id'] : null,
            searchText : '',
        }
    }

    getData = () => {
        this.setState({
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            this.props.getCalonpdSekolah(this.state.routeParams).then(e => {
                this.setState({ loading: false });
            });
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
        this.setState({ loading: true });
        this.props.getSekolahCalonpd(this.state.routeParams).then(e => {
            this.getData();
        });
    }

    render()
    {
        const sekolah = this.props.sekolah_calonpd.rows[0]

        return (
            <Page name="cari">
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Daftar Calon Peserta Didik</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari Peserta Didik NIK/Nama"
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

                <Block strong style={{marginTop:'-4px', marginBottom:'0px'}}>-</Block>

                <List mediaList>
                    <ListItem
                        // link="#"
                        title={ sekolah.nama }
                        // after="$15"
                        subtitle={ sekolah.npsn }
                        text={ "Alamat Jalan : " + sekolah.alamat_jalan + " " + sekolah.kecamatan + " -> " + sekolah.kabupaten + " -> " + sekolah.provinsi }
                    >
                        <img slot="media" src={"http://foto.data.kemdikbud.go.id/getImage/" + sekolah.npsn + "/1.jpg"} width="80" />
                    </ListItem>
                </List>
                
                {this.props.calonpd_sekolah.rows.map((option, key)=>{

                    return (

                        <Card className="demo-card-header-pic" key={key}>
                            <CardContent>
                                <Row>
                                    <Col width="30" tabletWidth="15" style={{background:"#cccccc", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden', margin: '-15px'}}>
                                        {/* <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'100px', minHeight:'100px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img>  */}
                                        <img src="https://klis.co.id/uploads/gallery/media/student.png" style={{maxHeight:'82px', minHeight:'82px', border:'0px solid #ccc', margin:'12px'}}></img> 
                                    </Col>
                                    <Col width="70" tabletWidth="85">
                                        <Row noGap>
                                            <Col width="100">
                                                <a href="#">
                                                    <h3 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                        { option.nama_calon_pd + " (" + option.nik + ")" }
                                                    </h3>
                                                </a>
                                            </Col>
                                            <Col width="100" tabletWidth="30">
                                                Tempat/Tanggal Lahir: <b>{ option.tempat_lahir + " / " + option.tanggal_lahir }</b> <br/>
                                                Alamat: <b>{ option.alamat_tempat_tinggal }</b> <br/>
                                            </Col>
                                            <Col width="100" tabletWidth="30">
                                                Jenis Kelamin: <b>{ option.jenis_kelamin === 'L' ? 'Laki laki' : option.jenis_kelamin === 'P' ? 'Perempuan' : '' }</b> <br/>
                                                Umur: <b>{ option.umur }</b> <br/>
                                            </Col>
                                            <Col width="100" tabletWidth="30">
                                                Tanggal Pengisian Formulir: <b>{ option.create_date }</b> <br/>
                                                Asal Sekolah: <b>{ "(" + option.npsn_sekolah_asal + ") " + option.nama_sekolah_asal }</b> <br/>
                                                Jalur: <b>{ option.nama_jalur }</b> <br/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                            {/* <CardFooter className="no-border" style={{display:'-webkit-inline-box', width:'100%'}}> */}
                                {/* <Button raised fill>
                                    <Icon ios="f7:doc_plaintext" style={{fontSize:'20px'}}/>
                                    &nbsp; Daftarkan Calon Peserta Didik ke Sekolah Ini
                                </Button> */}
                            {/* </CardFooter> */}
                        </Card>
                    )
                })}
                
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSekolahCalonpd                           : Actions.getSekolahCalonpd,
        getCalonpdSekolah                           : Actions.getCalonpdSekolah
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah }) {
    return {
        window_dimension                            : App.window_dimension,
        calonpd_sekolah                             : PPDBSekolah.calonpd_sekolah,
        sekolah_calonpd                             : PPDBSekolah.sekolah_calonpd
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DetailcalonpdSiswa));
  