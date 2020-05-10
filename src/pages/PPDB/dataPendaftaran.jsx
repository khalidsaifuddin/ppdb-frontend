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
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            // pantauan: 1
            keyword : '',
        }
    }

    getData = () => {
        // const params = {
        //     searchText: this.state.routeParams.keyword
        // }
        this.setState({
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            this.props.getCalonPD(this.state.routeParams);
        });

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
                                    <Col width="20" tabletWidth="15" style={{background:"#cccccc", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                        {/* <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img>  */}
                                        <img src={(option.pas_foto.search("assets") !== -1 ? localStorage.getItem("api_base")+option.pas_foto : option.pas_foto)} style={{maxHeight:'120px', minHeight:'120px', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                                    </Col>
                                    <Col width="80" tabletWidth="85">
                                        <Row noGap>
                                            <Col width="100">
                                                <a href={"/ProfilSekolah/"+ option.sekolah_id}>
                                                    <h2 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                        { option.nama}  
                                                    </h2>
                                                </a>
                                            </Col>
                                            <Col width="100" tabletWidth="40">
                                                NIK: <b>{option.nik}</b> <br/>
                                                Jenis Kelamin: <b> { option.jenis_kelamin === 'L' ? 'Laki laki' : option.jenis_kelamin === 'P' ? 'Perempuan' : '' } </b> <br/>
                                                Tempat Lahir: <b>{ option.tempat_lahir }</b> <br/>
                                                Tanggal Lahir: <b>{ option.tanggal_lahir }</b> <br/>
                                                Alamat Tempat Tinggal: <b>{ option.alamat_tempat_tinggal }, {option.kecamatan}, {option.kabupaten}, {option.provinsi}</b> <br/>
                                                Sekolah Asal: <b>{ option.sekolah_asal }</b> <br/>
                                            </Col>
                                            <Col width="100" tabletWidth="60">
                                                {/* <div className="data-table card">
                                                    <table>
                                                        <tbody>
                                                            {
                                                                option.pilihan_sekolah.map((n, key) => {
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>{ key + 1 }</td>
                                                                            <td>{ n.npsn }</td>
                                                                            <td>{ n.nama_sekolah }</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div> */}
                                                <List>
                                                    {option.pilihan_sekolah.map((n, key) => {
                                                        return (
                                                            // <ListItem className={"daftarSekolah"} style={{fontSize:'12px'}}>
                                                            //     {key+1}. {n.nama_sekolah} ({n.npsn}) = No.Urut 0
                                                            // </ListItem>
                                                            <ListItem className={"daftarSekolah"} style={{fontSize:'12px'}} title={key+1+". "+n.nama_sekolah + "("+n.npsn+")"} after={"No.Urut 0"}>
                                                                {/* <Icon slot="media" icon="demo-list-icon"></Icon> */}
                                                            </ListItem>
                                                        )
                                                    })}
                                                </List>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                            <CardFooter className="no-border">
                            {/* <CardFooter className="no-border" style={{display:'-webkit-inline-box', width:'100%'}}> */}
                                <Button disabled={(option.status_konfirmasi === 1 ? true : false)} onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+option.calon_peserta_didik_id)}>
                                    Edit Formulir
                                </Button>
                                <Button disabled={(option.status_konfirmasi === 1 ? true : false)} onClick={()=>this.$f7router.navigate("/tambahKonfirmasi/"+option.calon_peserta_didik_id)}>
                                    Status: {(option.status_konfirmasi === 1 ? 'Terkonfirmasi' : 'Draft')}
                                </Button>
                                <Button>
                                    Tanggal Konfirmasi: {option.status_konfirmasi === 1 ? option.tanggal_konfirmasi : '-'}
                                </Button>
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
  