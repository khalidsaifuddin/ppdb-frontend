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
            start: 0,
            limit: 20
        },
        start: 0,
        limit: 20,
        entities: {
            rows: [],
            count: 0,
            countAll: 0
        }
    }

    getData = () => {
        // const params = {
        //     searchText: this.state.routeParams.keyword
        // }
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                start: 0
            }
        },()=>{
            this.props.getCalonPD(this.state.routeParams).then((result)=>{
                this.setState({
                    entities: this.props.entities
                });
            });
        });

    }

    ketikCari = (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                searchText: e.target.value,
            }
        });
    }

    cetakFormulir = (n) => {
        const link = localStorage.getItem('api_base') + "/api/CalonPesertaDidik/print/formulir/" + n.calon_peserta_didik_id;
        window.open(link, '_blank');
    }

    cetakBukti = (n) => {
        const link = localStorage.getItem('api_base') + "/api/CalonPesertaDidik/print/bukti/" + n.calon_peserta_didik_id;
        window.open(link, '_blank');
    }

    componentDidMount = () => {
        this.getData();
    }

    muatSelanjutnya = () => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                start: parseInt(this.state.start)+parseInt(this.state.limit)
            },
            start: parseInt(this.state.start)+parseInt(this.state.limit)
        }, ()=> {
            this.props.getCalonPD(this.state.routeParams).then((result)=>{
                this.setState({
                    entities: {
                        ...this.state.entities,
                        rows: [
                            ...this.state.entities.rows,
                            ...this.props.entities.rows
                        ]
                    }
                });
            });
            // this.props.getPPDBSekolah(this.state.routeParamsCariSekolah).then((result)=>{
            //     this.setState({
            //         ppdb_sekolah: {
            //             ...this.state.ppdb_sekolah,
            //             rows: [
            //                 ...this.state.ppdb_sekolah.rows,
            //                 ...this.props.ppdb_sekolah.rows
            //             ]
            //         }
            //     })
            // });
        });
    }

    render()
    {
        return (
            <Page name="cari" style={{paddingBottom:'40px'}}>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Data Pendaftaran</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari Peserta Didik (NIK/Nama/NISN)..."
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.getData}
                            customSearch={true}
                            onChange={this.ketikCari}
                            defaultValue={this.state.routeParams.keyword}
                            // clickClear={this.clickClear}
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>

                <Block strong style={{marginTop:'-4px', marginBottom:'0px'}}>Data Pendaftaran</Block>
                <Block strong style={{marginTop:'0px', marginBottom:'8px'}}>
                    Menampilkan {this.props.entities.countAll ? this.props.entities.countAll : '0'} data pendaftar
                </Block>
                {this.state.entities.rows.map((option, key)=>{

                    // let sekolah_asal = '';

                    // if(option.sekolah_asal.length > 0){
                    //     sekolah_asal = option.sekolah_asal.nama;
                    // }

                    // console.log(option.sekolah_asal);

                    return (

                        <Card className="demo-card-header-pic" key={key} style={{borderTop:'3px solid #00BCD4'}}>
                            <CardContent>
                                <Row>
                                    <Col width="30" tabletWidth="15" style={{background:"#cccccc", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                        {/* <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img>  */}
                                        <img src={(option.pas_foto.search("assets") !== -1 ? localStorage.getItem("api_base")+option.pas_foto : option.pas_foto)} style={{maxHeight:'120px', minHeight:'120px', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                                    </Col>
                                    <Col width="70" tabletWidth="85">
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
                                                TTL: <b>{ option.tempat_lahir }, { option.tanggal_lahir }</b> <br/>
                                                Titik Koordinat: <b>{ option.lintang }, {option.bujur}</b> <br/>
                                                Sekolah Asal: <b>{ option.sekolah_asal.nama } ({option.sekolah_asal.npsn})</b> <br/>
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
                                                {/* <List>
                                                    {option.pilihan_sekolah.map((n, key) => {
                                                        return (
                                                            <ListItem className={"daftarSekolah"} style={{fontSize:'12px'}} title={key+1+". "+n.nama_sekolah + "("+n.npsn+")"} after={"No.Urut 0"}>
                                                                
                                                            </ListItem>
                                                        )
                                                    })}
                                                </List> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width={100} style={{border:'1px solid #ccceee', marginTop:'8px'}}>
                                        <Row noGap>
                                            {option.pilihan_sekolah.map((optionSekolah, key1)=>{
                                            return (
                                                <Col width="33" tabletWidth="33" key={key1}>
                                                    <Card style={{minHeight:'100px', margin:'8px', textAlign:'center', backgroundImage:'url(http://foto.data.kemdikbud.go.id/getImage/' + optionSekolah.npsn + '/1.jpg)', backgroundSize:'cover'}}>
                                                        <CardContent style={{padding:'4px', background: 'rgba(0, 0, 0, 0.5)', minHeight:'100px'}}>
                                                        <div style={{fontSize:'12px', color:'white', minHeight:'35px'}}><b>{optionSekolah.nama_sekolah}</b></div>
                                                        <div style={{fontSize:'12px', color:'#FFF9C4', fontWeight:'bold'}}>Jalur {optionSekolah.jalur}</div>
                                                        <div style={{fontSize:'12px', color:'white'}}>No.Urut Sementara</div>
                                                        <div style={{fontSize:'25px', fontWeight:'bold', color:'white'}}>{optionSekolah.urutan}/{optionSekolah.kuota}</div>
                                                        </CardContent>
                                                    </Card>
                                                </Col>
                                            )
                                            })}
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
                                <Button
                                    fillIos
                                    onClick={e => this.cetakFormulir(option) }
                                    disabled={(option.status_konfirmasi === 1 ? false : true)}
                                >
                                    Cetak Formulir
                                </Button>
                                <Button
                                    fillIos
                                    onClick={e => this.cetakBukti(option) }
                                    disabled={(option.status_konfirmasi === 1 ? false : true)}
                                >
                                    Cetak Bukti Pendaftaran
                                </Button>
                            </CardFooter>
                            {option.status_konfirmasi !== 1 &&
                            <CardFooter className="no-border" style={{minHeight:'10px',fontSize:'10px',padding:'8px', fontStyle:'italic',paddingLeft:'16px'}}>
                                <span>*Formulir dan Bukti Pendaftaran belum dapat dicetak sebelum pendaftar melakukan konfirmasi</span>
                            </CardFooter>
                            }
                        </Card>
                    )
                })}
                {this.props.entities.count > 1 &&
                <Block strong style={{marginTop:'8px', marginBottom:'0px'}}>
                    <Button raised fill color="gray" onClick={this.muatSelanjutnya}>Muat data selanjutnya</Button>
                </Block>
                }
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
  