import React, { Component } from 'react';
import {
  Page,
  Icon,
  Navbar,
  NavTitle,
  NavTitleLarge,
  List,
  ListInput,
  ListItem,
  ListItemContent,
  Block,
  Button,
  CardHeader,
  Row,
  Col,
  Card,
  CardContent,
  CardFooter,
  Link,
  NavRight,
  Subnavbar,
  BlockTitle,
  Searchbar,
  Segmented,
  Tabs,
  Tab,
  Preloader,
  Menu,
  MenuItem,
  MenuDropdown,
  MenuDropdownItem
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import Pagination from "react-js-pagination";

class DaftarCalonPesertaDidikSekolah extends Component {
  
  state = {
    error: null,
    loading: true,
    routeParams:{
        sekolah_id: (localStorage.getItem('kode_aplikasi')  === 'PPDB-sekolah' ? JSON.parse(localStorage.getItem('user')).sekolah_id : null),
        keyword : '',
        start: 0,
        limit: 10
    },
    sekolah: {},
    start: 0,
    activePage: 1,
    limit: 10,
    entities: {
        rows: [],
        count: 0,
        countAll: 0
    },
    dummy_rows: [
        {
          foo:'bar'
        }
        ,{
          foo:'bar'
        }
        ,{
          foo:'bar'
        }
    ],
    disabledButton: false
  }

  getData = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        start: 0,
        loading: true
      }
    }, ()=> {
        this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                loading: false,
                entities: this.props.calon_pd_sekolah
            });
        })
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
      // this.getData();
      this.setState({
          routeParams: {
              ...this.state.routeParams,
              start: 0
          }
      },()=>{
          this.props.getPPDBSekolah(this.state.routeParams).then((result)=>{
              this.setState({
                  sekolah: this.props.ppdb_sekolah.rows[0]
              });
          });

          this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
              this.setState({
                  loading: false,
                  entities: this.props.calon_pd_sekolah
              });
          })
      });
  }

  muatSelanjutnya = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        start: parseInt(this.state.start)+parseInt(this.state.limit)
      },
      start: parseInt(this.state.start)+parseInt(this.state.limit),
      loading: true
    }, ()=> {
        this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                loading: false,
                entities: this.props.calon_pd_sekolah
            });
        })
    });
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      start: ((parseInt(pageNumber)-1)*parseInt(this.state.limit)),
      routeParams: {
          ...this.state.routeParams,
          start: ((parseInt(pageNumber)-1)*parseInt(this.state.limit))
      },
      activePage: pageNumber,
      loading: true
    },()=>{
        this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                loading: false,
                entities: this.props.calon_pd_sekolah
            });
        })
    });
  }
  
  urut = (tipe) => {
    this.setState({
        start: 0,
        routeParams: {
            ...this.state.routeParams,
            urut: tipe,
            start: 0
        },
        loading: true
      },()=>{
          this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
              this.setState({
                  loading: false,
                  entities: this.props.calon_pd_sekolah
              });
          })
    });
  }

  saring = (tipe) => {
    this.setState({
        start: 0,
        routeParams: {
            ...this.state.routeParams,
            jalur_id: tipe,
            start: 0
        },
        loading: true
      },()=>{
          this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
              this.setState({
                  loading: false,
                  entities: this.props.calon_pd_sekolah
              });
          })
    });
  }

  render() {
    return (
      <Page name="data-pendaftar">
        <Navbar sliding={false} backLink="Kembali">
          <NavTitle sliding>Pendaftar di {this.state.sekolah.nama}</NavTitle>
          <Subnavbar inner={false}>
            <Searchbar
              className="searchbar-demo"
              placeholder="Cari Peserta Didik (NIK/Nama/NISN)..."
              searchContainer=".search-list"
              searchIn=".item-title"
              onSubmit={this.getData}
              customSearch={true}
              onChange={this.ketikCari}
              defaultValue={this.state.routeParams.keyword}
            />
          </Subnavbar>
        </Navbar>
        <Block strong style={{marginTop:'-4px', marginBottom:'0px'}}>Data Pendaftar</Block>
        <Block strong style={{marginTop:'0px', marginBottom:(localStorage.getItem('kode_aplikasi') === 'PPDB' ? '8px' : '-45px')}}>
            <Row noGap>
                <Col width="60">
                    Menampilkan {this.state.entities.countAll ? this.state.entities.countAll : '0'} data pendaftar
                    {/* &nbsp;{this.state.sekolah.nama} */}
                </Col>
                <Col width="40" style={{textAlign:'right'}}>
                    {/* <Button iconIos="f7:sort_up">
                    </Button> */}
                    <Menu className="menu-pendaftar">
                        <MenuItem iconIos="f7:sort_up" iconSize="20" text="Urut" dropdown className="menu-saring-urut">
                            <MenuDropdown right>
                                <MenuDropdownItem href="#" text="No Urut" onClick={()=>this.urut('urut')} />
                                <MenuDropdownItem href="#" text="Jarak"  onClick={()=>this.urut('jarak')}/>  
                            </MenuDropdown>
                        </MenuItem>
                        <MenuItem iconIos="f7:tray_2" iconSize="20" text="Jalur" dropdown className="menu-saring-urut">
                            <MenuDropdown right>
                                <MenuDropdownItem href="#" text="Affirmasi" onClick={()=>this.saring('0100')}/>
                                <MenuDropdownItem href="#" text="Perpindahan Orang Tua" onClick={()=>this.saring('0200')} />  
                                <MenuDropdownItem href="#" text="Zonasi" onClick={()=>this.saring('0400')} />  
                                <MenuDropdownItem href="#" text="Minat & Bakat" onClick={()=>this.saring('0300')} />  
                                <MenuDropdownItem href="#" text="Tahfidz" onClick={()=>this.saring('0500')} />  
                            </MenuDropdown>
                        </MenuItem>
                    </Menu>
                </Col>
            </Row>
        </Block>
        {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
        <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.state.entities.countAll}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
        />
        }
        {this.state.loading ?
        <>
        {this.state.dummy_rows.map((opt)=>{
            return (
                <Card className="demo-card-header-pic" style={{borderTop:'3px solid #00BCD4'}} className={"skeleton-text skeleton-effect-blink"}>
                    <CardContent>
                        <Row>
                            <Col width="30" tabletWidth="15" style={{background:"#cccccc", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                <div style={{height:'120px', width:'120px'}}>&nbsp;</div>
                            </Col>
                            <Col width="70" tabletWidth="85">
                                <Row noGap>
                                    <Col width="100">
                                        <a disabled={true} href={"/ProfilSekolah/"+ "option.sekolah_id"}>
                                            <h2 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                {"option.nama"}  
                                            </h2>
                                        </a>
                                    </Col>
                                    <Col width="100" tabletWidth="40">
                                        NIK: <b>{"option.nik"}</b> <br/>
                                        Jenis Kelamin: <b> { "option.jenis_kelamin" === 'L' ? 'Laki laki' : "option.jenis_kelamin" === 'P' ? 'Perempuan' : '' } </b> <br/>
                                        TTL: <b>{ "option.tempat_lahir" }, { "option.tanggal_lahir" }</b> <br/>
                                        Titik Koordinat: <b>{ "option.lintang" }, {"option.bujur"}</b> <br/>
                                        Sekolah Asal: <b>{ "option.sekolah_asal.nama" } ({"option.sekolah_asal.npsn"})</b> <br/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
            )
        })}
        </>
        :
        <>
        {this.state.entities.rows.length === 0 ? (
          <Card className="noLoadContent" noShadow noBorder key={null}>
            <CardContent padding={false}>
              <img src="/static/images/icons/no-peserta.svg" alt="peserta"/>
              <h4 className="display-block text-align-center">Data pendaftar belum ada!</h4>
            </CardContent>
          </Card>
        ) : ''}
        {this.state.entities.rows.map((option, key)=> {
          
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
                                <Col width="100" tabletWidth="60" style={{marginBottom:'8px'}}>
                                    NIK: <b>{option.nik}</b> <br/>
                                    Jenis Kelamin: <b> { option.jenis_kelamin === 'L' ? 'Laki laki' : option.jenis_kelamin === 'P' ? 'Perempuan' : '' } </b> <br/>
                                    TTL: <b>{ option.tempat_lahir }, { option.tanggal_lahir }</b> <br/>
                                    Titik Koordinat: <b>{ option.lintang }, {option.bujur}</b> <br/>
                                    Sekolah Asal: <b>{ option.sekolah_asal.nama } ({option.sekolah_asal.npsn})</b> <br/>
                                </Col>
                            </Row>
                        </Col>
                        <Col width="100" tabletWidth="100">
                            <Row noGap>
                                <Col width="35" tabletWidth="40">
                                    <Card>
                                        <CardHeader className="judul-jalur" style={{fontSize:'12px', minHeight:'45px'}}>
                                            Jalur<br/>
                                            {option.jalur}
                                        </CardHeader>
                                        <CardContent className="judul-jalur" style={{minHeight:'70px'}}>
                                            <span style={{fontSize:'10px'}}>no urut</span>
                                            <br/>
                                            <span className="no-urut">{option.urutan}</span>
                                        </CardContent>
                                    </Card>
                                    {/* <p style={{textAlign:'center'}}>
                                        
                                    </p>
                                    <p style={{textAlign:'center'}}>
                                        
                                    </p> */}
                                </Col>
                                <Col width="35" tabletWidth="40">
                                    <Card>
                                        <CardHeader className="judul-jalur" style={{fontSize:'12px', minHeight:'45px'}}>
                                            Jarak dari Sekolah
                                        </CardHeader>
                                        <CardContent className="judul-jalur" style={{minHeight:'70px'}}>
                                            <span className="no-urut">{parseFloat(option.jarak).toFixed(2)}</span>
                                            <br/>
                                            <span style={{fontSize:'10px'}}>kilometer</span>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="30" tabletWidth="40">
                                  <Button
                                      fillIos
                                    //   onClick={e => this.cetakFormulir(option) }
                                      disabled={(option.status_konfirmasi === 1 ? false : true)}
                                      iconIos="f7:doc_person"
                                      iconSize="17"
                                      style={{marginBottom:'4px'}}
                                  >
                                      &nbsp;Profil
                                  </Button>
                                  <Button
                                      fillIos
                                    //   onClick={e => this.cetakFormulir(option) }
                                      disabled={(option.status_konfirmasi === 1 ? false : true)}
                                      iconIos="f7:checkmark_alt_circle_fill"
                                      iconSize="17"
                                      style={{marginBottom:'4px'}}
                                  >
                                      &nbsp;Verifikasi
                                  </Button>
                                  <Button
                                      fillIos
                                      onClick={e => this.cetakFormulir(option) }
                                      disabled={(option.status_konfirmasi === 1 ? false : true)}
                                      iconIos="f7:printer_fill"
                                      iconSize="17"
                                      style={{marginBottom:'4px'}}
                                  >
                                      &nbsp;Cetak Formulir
                                  </Button>
                                  <Button
                                      fillIos
                                      onClick={e => this.cetakBukti(option) }
                                      disabled={(option.status_konfirmasi === 1 ? false : true)}
                                      iconIos="f7:printer_fill"
                                      iconSize="17"
                                      style={{marginBottom:'4px'}}
                                  >
                                      &nbsp;Cetak Bukti
                                  </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardContent>
                <CardFooter className="no-border">
                    {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
                    <Button disabled={(option.status_konfirmasi === 1 ? true : false)} onClick={()=>this.$f7router.navigate("/tambahKonfirmasi/"+option.calon_peserta_didik_id)}>
                        Status: {(option.status_konfirmasi === 1 ? 'Terkonfirmasi' : 'Draft')}
                    </Button>
                    }
                    {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
                    <Button disabled={(option.status_konfirmasi === 1 ? true : false)}>
                        Status: {(option.status_konfirmasi === 1 ? 'Terkonfirmasi' : 'Draft')}
                    </Button>
                    }
                    <Button>
                        Tanggal Konfirmasi: {option.status_konfirmasi === 1 ? option.tanggal_konfirmasi : '-'}
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
        </>
        }
        {localStorage.getItem('kode_aplikasi') !== 'PPDB' &&
        <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.state.entities.countAll}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
        />
        }
        {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
        <>
        {this.state.entities.count > 1 &&
        <Block strong style={{marginTop:'8px', marginBottom:'0px'}}>
            <Button raised fill color="gray" onClick={this.muatSelanjutnya}>Muat data selanjutnya</Button>
        </Block>
        }
        </>
        }
        <div style={{height:'100px'}}>
          &nbsp;
        </div>
      </Page>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCalonPD: Actions.getCalonPD,
    batalkanKonfirmasi : Actions.batalkanKonfirmasi,
    getPPDBSekolah: Actions.getPPDBSekolah,
    getCalonPesertaDidikSekolah: Actions.getCalonPesertaDidikSekolah
  }, dispatch);
}

function mapStateToProps({ App, PPDBPesertaDidik, PPDBSekolah }) {
  return {
    window_dimension: App.window_dimension,
    ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
    calon_pd_sekolah: PPDBPesertaDidik.calon_pd_sekolah
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DaftarCalonPesertaDidikSekolah));
  