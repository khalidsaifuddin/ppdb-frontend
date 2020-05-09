import React, {Component} from 'react';
import {
    Page, Icon, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, Subnavbar, BlockTitle, Searchbar, Segmented, Tabs, Tab
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class DaftarPendaftaran extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            // pantauan: 1
            keyword : '',
        }
    }

    getData = () => {
        const params = {
            searchText: this.state.routeParams.keyword
        }

        this.props.getCalonPD(params);
    }

    ketikCari = (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                keyword: e.target.value,
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
                    <NavTitle sliding>Daftar Pendaftaran</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari peserta NIK"
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.getData}
                            customSearch={true}
                            onChange={this.ketikCari}
                            value={this.state.routeParams.keyword}
                            // clickClear={this.clickClear}
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>

                <Block strong style={{marginTop:'-4px', marginBottom:'0px'}}>Daftar Pendaftaran</Block>
                
                {this.props.entities.rows.map((option, key)=>{
                    return (

                        <Card className="demo-card-header-pic" key={key}>
                            <CardContent>
                                <Row>
                                    <Col width="30" tabletWidth="20" style={{background:"url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                        <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                                    </Col>
                                    <Col width="70" tabletWidth="80">
                                        <Row noGap>
                                            <Col width="100">
                                                <a href={"/ProfilSekolah/"+ option.sekolah_id}>
                                                    <h3 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                        { option.nama}  

                                                    </h3>
                                                </a>
                                            </Col>
                                            <Col width="100" tabletWidth="50">
                                                NIK: <b>{option.nik}</b> <br/>
                                                Jenis Kelamin: <b> { option.jenis_kelamin === 'L' ? 'Laki laki' : option.jenis_kelamin === 'P' ? 'Perempuan' : '' } </b> <br/>
                                                Tempat Lahir: <b>{ option.tempat_lahir }</b> <br/>
                                                Tanggal Lahir: <b>{ option.tanggal_lahir }</b> <br/>
                                                Alamat Tempat Tinggal: <b>{ option.alamat_tempat_tinggal }</b> <br/>
                                            </Col>
                                            <Col width="50" className="hilangDiMobile" tabletWidth="50">
                                                <List>
                                                    {
                                                        option.pilihan_sekolah.map((n, key) => 
                                                            <ListItem key={key}>
                                                                <span style={{ fontSize: 12 }}>{ "(" + n.npsn + ") " + n.nama_sekolah }</span>
                                                            </ListItem>
                                                        )
                                                    }
                                                </List>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                            <CardFooter className="no-border" style={{display:'-webkit-inline-box', width:'100%'}}>
                                "Keterangan"
                            </CardFooter>
                        </Card>
                    )
                })}
                
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getCalonPD                        : Actions.getCalonPD
    }, dispatch);
}

function mapStateToProps({ App, DaftarPendaftaran }) {
    return {
        window_dimension                : App.window_dimension,
        entities                        : DaftarPendaftaran.entities
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DaftarPendaftaran));
  