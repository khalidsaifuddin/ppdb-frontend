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
        limit: 10,
        urut: 'jarak',
        verifikasi: 'N',
        urut_pilihan: 1
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
    disabledButton: false,
    tabLinkActive: {
        semua: true,
        diterima: false,
        cabut: false,
        ditolak: false,
        tidak_lengkap: false

    },
    label_pilihan: 'Semua',
    label_urut: 'No Urut',
    label_jalur: 'Semua'
  }

  getData = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        start: 0
    },
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

              this.props.setPendaftar(this.props.calon_pd_sekolah.countAll);
          });
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
  
  urut = (tipe, label) => {
    this.setState({
        start: 0,
        routeParams: {
            ...this.state.routeParams,
            urut: (parseInt(tipe) !== 99 ? tipe : null),
            start: 0
        },
        activePage: 1,
        label_urut: label,
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
  
  konfirmasi = (tipe, label) => {
    this.setState({
        start: 0,
        routeParams: {
            ...this.state.routeParams,
            status_konfirmasi: (parseInt(tipe) !== 99 ? tipe : null),
            start: 0
        },
        activePage: 1,
        label_urut: label,
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
  
  pilih = (tipe, label) => {
    this.setState({
        start: 0,
        routeParams: {
            ...this.state.routeParams,
            urut_pilihan: (parseInt(tipe) !== 99 ? tipe : null),
            start: 0
        },
        activePage: 1,
        label_pilihan: label,
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

  saring = (tipe, label) => {
    this.setState({
        start: 0,
        routeParams: {
            ...this.state.routeParams,
            jalur_id: (parseInt(tipe) !== 99 ? tipe : null),
            start: 0
        },
        activePage: 1,
        label_jalur: label,
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

  pindahTab = (tipe) => {
    //   for (const key in this.state.tabLinkActive) {
    //       if (this.state.tabLinkActive.hasOwnProperty(key)) {
    //           const element = this.state.tabLinkActive[key];
    //             //   console.log(element);
    //             //   if(element !== tipe){
    //             //     this.state.tabLinkActive[key] = false;
    //             //   }else{
    //             //     this.state.tabLinkActive[key] = true;
    //             //   }
    //             // if(key !== tipe){
    //             //     this.state.tabLinkActive[key] = false;
    //             // }else{
    //             //     this.state.tabLinkActive[key] = true;
    //             // }

    //       }
    //   }

    this.setState({
        ...this.state,
        tabLinkActive: {
            ...this.state.tabLinkActive,
            semua: false,
            diterima: false,
            ditolak: false,
            cabut: false,
            [tipe] : true
        },
        loading: true,
        routeParams: {
            ...this.state.routeParams,
            [tipe]: 1
        }
    },()=>{
        this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                loading: false,
                entities: this.props.calon_pd_sekolah
            });
        })
    });
  }

  setParamValue = (b) => {
    this.setState({
        ...this.state,
        loading: true,
        routeParams: {
            ...this.state.routeParams,
            start: 0,
            [b.target.getAttribute('name')]: (parseInt(b.target.value) !== 99 ? b.target.value : null)
        },
        activePage: 1
    },()=>{
        this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                loading: false,
                entities: this.props.calon_pd_sekolah
            });
        })
    });
}

    bukaPengaturan = () => {
        // alert('oke');
        this.props.setJudulKanan('Saring dan Urut');

        this.props.setIsiKanan((
            <>
                <List>
                    <ListItem
                        title="Urut"
                        smartSelect
                        // smartSelectParams={{openIn: 'sheet', searchbar: true, searchbarPlaceholder: 'Saring Bentuk'}}
                        >
                        <select name="urut" defaultValue={"jarak"} onChange={this.setParamValue}>
                            <option value={"jarak"}>Jarak</option>
                            <option value={"urut"}>No Urut Pendaftaran</option>
                        </select>
                    </ListItem>
                </List>
                <List>
                    {/* <ListItem
                        title="Pilihan"
                        smartSelect
                        // smartSelectParams={{openIn: 'sheet', searchbar: true, searchbarPlaceholder: 'Saring Bentuk'}}
                        >
                        <select name="urut_pilihan" defaultValue={"1"} onChange={this.setParamValue}>
                            <option value={"99"}>Semua</option>
                            <option value={"1"}>Pilihan 1</option>
                            <option value={"2"}>Pilihan 2</option>
                            <option value={"3"}>Pilihan 3</option>
                        </select>
                    </ListItem> */}
                    <ListItem
                        title="Jalur"
                        smartSelect
                        // smartSelectParams={{openIn: 'sheet', searchbar: true, searchbarPlaceholder: 'Saring Bentuk'}}
                        >
                        <select name="jalur_id" defaultValue={"99"} onChange={this.setParamValue}>
                            <option value={"99"}>Semua</option>
                            <option value={"0100"}>Affirmasi</option>
                            <option value={"0200"}>Perpindahan Orang Tua</option>
                            <option value={"0300"}>Minat & Bakat</option>
                            <option value={"0400"}>Zonasi</option>
                            <option value={"0500"}>Tahfidz</option>
                            {/* <MenuDropdownItem href="#" text="Semua" onClick={()=>this.saring('99', "Semua")}/>
                            <MenuDropdownItem href="#" text="Affirmasi" onClick={()=>this.saring('0100', "Affirmasi")}/>
                            <MenuDropdownItem href="#" text="Perpindahan Orang Tua" onClick={()=>this.saring('0200', "Perpindahan Orang Tua")} />  
                            <MenuDropdownItem href="#" text="Zonasi" onClick={()=>this.saring('0400', "Zonasi")} />  
                            <MenuDropdownItem href="#" text="Minat & Bakat" onClick={()=>this.saring('0300', "Minat & Bakat")} />  
                            <MenuDropdownItem href="#" text="Tahfidz" onClick={()=>this.saring('0500', "Tahfidz")} />  */}
                        </select>
                    </ListItem>
                </List>
            </>
        ));
    }

    unduhExcel = () => {
        const { sekolah_id, keyword, urut, verifikasi } = this.state.routeParams;
        const link = localStorage.getItem('api_base')+"/api/CalonPesertaDidik/getCalonPesertaDidikSekolah_excel";
        const params = "?sekolah_id=" + sekolah_id + "&keyword="+keyword+"&start=0&limit=999999&urut=" + urut + "&verifikasi=" + verifikasi;

        window.open(link + params, "_blank");
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
        <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
            <Segmented raised>
                <Button tabLinkActive={this.state.tabLinkActive.semua} onClick={()=>this.pindahTab('semua')}>Daftar</Button>
                <Button tabLinkActive={this.state.tabLinkActive.diterima} onClick={()=>this.$f7router.navigate('/PetaSebaranPendaftar/'+this.state.routeParams.sekolah_id)}>Peta Sebaran</Button>
            </Segmented>
        </Block>
        <Block strong style={{marginTop:'0px', marginBottom:(localStorage.getItem('kode_aplikasi') === 'PPDB' ? '8px' : '-45px')}}>
        {/* <Block strong style={{overflowY:'hidden', overflowX:'auto', marginTop:'0px', marginBottom:(localStorage.getItem('kode_aplikasi') === 'PPDB' ? '8px' : '-45px')}}> */}
            <Row>
                <Col tabletWidth="55" width="100">
                    Menampilkan {this.state.entities.countAll ? this.state.entities.countAll : '0'} data pendaftar belum diverifikasi
                    {/* &nbsp;{this.state.sekolah.nama} */}
                </Col>
                <Col tabletWidth="15" width="50">
                    <Button fillIos iconF7="square_list" iconSize="medium" href="/DaftarCalonPesertaDidikSekolahTable/">Table</Button>
                </Col>
                <Col tabletWidth="15" width="50">
                    <Button fillIos iconF7="arrow_down_doc" iconSize="medium" color="green" onClick={this.unduhExcel}>Unduh Xls</Button>
                </Col>
                <Col tabletWidth="15" width="50" style={{textAlign:'right'}}>
                    {/* <Button iconIos="f7:sort_up">
                    </Button> */}
                <Link iconIos="f7:sort_up" panelOpen="right" onClick={this.bukaPengaturan}>
                    Saring dan Urut
                </Link>
                    {/* <Menu className="menu-pendaftar"> */}
                        {/* <MenuItem iconIos="f7:chart_bar_fill" iconSize="20" text={"Konfirmasi (" + this.state.label_konfirmasi + ")"} dropdown className="menu-saring-urut">
                            <MenuDropdown right>
                                <MenuDropdownItem href="#" text="Semua" onClick={()=>this.pilih('99', "Semua")} />
                                <MenuDropdownItem href="#" text="Sudah Konfirmasi" onClick={()=>this.konfirmasi('1', "Sudah Konfirmasi")} />
                                <MenuDropdownItem href="#" text="Belum Konfirmasi" onClick={()=>this.konfirmasi('0', "Belum Konfirmasi")}/>
                            </MenuDropdown>
                        </MenuItem> */}
                        {/* <MenuItem iconIos="f7:sort_up" iconSize="20" text={"Urut (" + this.state.label_urut + ")"} dropdown className="menu-saring-urut">
                            <MenuDropdown right>
                                <MenuDropdownItem href="#" text="No Urut" onClick={()=>this.urut('urut', 'No Urut')} />
                                <MenuDropdownItem href="#" text="Jarak" onClick={()=>this.urut('jarak',  'Jarak')}/>  
                            </MenuDropdown>
                        </MenuItem>
                        <MenuItem iconIos="f7:chart_bar_fill" iconSize="20" text={"Pilihan (" + this.state.label_pilihan + ")"} dropdown className="menu-saring-urut">
                            <MenuDropdown right>
                                <MenuDropdownItem href="#" text="Semua" onClick={()=>this.pilih('99', "Semua")} />
                                <MenuDropdownItem href="#" text="Pilihan 1" onClick={()=>this.pilih('1', "Pilihan 1")} />
                                <MenuDropdownItem href="#" text="Pilihan 2" onClick={()=>this.pilih('2', "Pilihan 2")}/>  
                                <MenuDropdownItem href="#" text="Pilihan 3" onClick={()=>this.pilih('3', "Pilihan 3")}/>  
                            </MenuDropdown>
                        </MenuItem>
                        <MenuItem iconIos="f7:tray_2" iconSize="20" text={"Jalur (" + this.state.label_jalur + ")"} dropdown className="menu-saring-urut">
                            <MenuDropdown right>
                                <MenuDropdownItem href="#" text="Semua" onClick={()=>this.saring('99', "Semua")}/>
                                <MenuDropdownItem href="#" text="Affirmasi" onClick={()=>this.saring('0100', "Affirmasi")}/>
                                <MenuDropdownItem href="#" text="Perpindahan Orang Tua" onClick={()=>this.saring('0200', "Perpindahan Orang Tua")} />  
                                <MenuDropdownItem href="#" text="Zonasi" onClick={()=>this.saring('0400', "Zonasi")} />  
                                <MenuDropdownItem href="#" text="Minat & Bakat" onClick={()=>this.saring('0300', "Minat & Bakat")} />  
                                <MenuDropdownItem href="#" text="Tahfidz" onClick={()=>this.saring('0500', "Tahfidz")} />  
                            </MenuDropdown>
                        </MenuItem> */}
                    {/* </Menu> */}
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
        {this.state.dummy_rows.map((opt, key)=>{
            return (
                <Card className="demo-card-header-pic" style={{borderTop:'3px solid #00BCD4'}} className={"skeleton-text skeleton-effect-blink"} key={key}>
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
              <h4 className="display-block text-align-center">Data pendaftar belum ada, atau semua pendaftar telah terverifikasi!</h4>
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
                                    <a href={"#"+ option.sekolah_id}>
                                        <h2 style={{marginTop: '0px', marginBottom: '0px'}}>
                                            { option.nama}  
                                        </h2>
                                    </a>
                                </Col>
                                <Col width="100" tabletWidth="60" style={{marginBottom:'8px'}}>
                                    NIK: <b>{option.nik}</b> <br/>
                                    Jenis Kelamin: <b> { option.jenis_kelamin === 'L' ? 'Laki laki' : option.jenis_kelamin === 'P' ? 'Perempuan' : '' } </b> <br/>
                                    TTL: <b>{ option.tempat_lahir }, { option.tanggal_lahir }</b> <br/>
                                    Titik Koordinat: <b>{ option.lintang }, {option.bujur}</b> <Link onClick={()=>window.open('https://www.google.com/maps/@'+option.lintang+','+option.bujur+',17z')}>(Google Maps)</Link><br/>
                                    Sekolah Asal: <b>{ option.sekolah_asal.nama } ({option.sekolah_asal.npsn})</b> <br/>
                                    Pendaftar: <b>{option.pendaftar}</b> ({option.email_pendaftar})<br/>
                                </Col>
                                <Col width="100" tabletWidth="40" style={{marginBottom:'8px'}}>
                                    <Button
                                        fillIos
                                        onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+option.calon_peserta_didik_id+"/displayOnly")}
                                        //   onClick={e => this.$f7router.navigate('/ProfilCalon/'+option.calon_peserta_didik_id) }
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
                                        disabled={(option.status_konfirmasi === 1 ? (option.peserta_didik_id_diterima !== null ? true : false) : true)}
                                        iconIos="f7:checkmark_alt_circle_fill"
                                        iconSize="17"
                                        style={{marginBottom:'4px'}}
                                        onClick={e => this.$f7router.navigate('/vervalPendaftar/'+option.calon_peserta_didik_id) }
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
                        <Col width="100" tabletWidth="100">
                            <Row noGap>
                                <Col width={option.jalur_id === '0400' ? "50" : "100"} tabletWidth={option.jalur_id === '0400' ? "50" : "100"}>
                                    <Card>
                                        <CardHeader className="judul-jalur" style={{fontSize:'12px', minHeight:'45px'}}>
                                            Jalur<br/>
                                            {option.jalur}
                                        </CardHeader>
                                        <CardContent className="judul-jalur" style={{minHeight:'85px'}}>
                                            <span style={{fontSize:'15px', fontWeight:'bold'}}>Pilihan {option.urut_pilihan}</span><br/>
                                            <span style={{fontSize:'10px'}}>No Urut Pendaftaran</span>
                                            <br/>
                                            <span className="no-urut">{option.urutan}</span>
                                        </CardContent>
                                    </Card>
                                    {/* <p style={{textAlign:'center'}}>
                                        
                                    </p>
                                    <p style={{textAlign:'center'}}>
                                        
                                    </p> */}
                                </Col>
                                {option.jalur_id === '0400' &&
                                <Col width="50" tabletWidth="50">
                                    <Card>
                                        <CardHeader className="judul-jalur" style={{fontSize:'12px', minHeight:'45px'}}>
                                            Jarak dari Sekolah
                                        </CardHeader>
                                        <CardContent className="judul-jalur" style={{minHeight:'85px'}}>
                                            <span className="no-urut">{parseFloat(option.jarak).toFixed(2)}</span>
                                            <br/>
                                            <span style={{fontSize:'15px'}}>meter (<b>{parseFloat(option.jarak_km).toFixed(2)} km</b>)</span>
                                        </CardContent>
                                    </Card>
                                </Col>
                                }
                                {/* <Col width="30" tabletWidth="30"> */}
                                  {/* <Button
                                      fillIos
                                      onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+option.calon_peserta_didik_id+"/displayOnly")}
                                    //   onClick={e => this.$f7router.navigate('/ProfilCalon/'+option.calon_peserta_didik_id) }
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
                                      disabled={(option.status_konfirmasi === 1 ? (option.peserta_didik_id_diterima !== null ? true : false) : true)}
                                      iconIos="f7:checkmark_alt_circle_fill"
                                      iconSize="17"
                                      style={{marginBottom:'4px'}}
                                      onClick={e => this.$f7router.navigate('/vervalPendaftar/'+option.calon_peserta_didik_id) }
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
                                  </Button> */}
                                {/* </Col> */}
                                {option.peserta_didik_id_diterima !== null &&
                                <Col width="100" tabletWidth="100">
                                    {parseInt(option.status_terima) === 9 && <Button raised fill style={{background:'#9CCC65', fontWeight:'bold'}}>Terverifikasi {option.diterima_sekolah === 'sekolah_lain' && <>oleh {option.sekolah_penerima}</>}</Button>}
                                    {parseInt(option.status_terima) === 1 && <Button raised fill style={{background:'#4CAF50', fontWeight:'bold'}}>Diterima (Sudah daftar Ulang) {option.diterima_sekolah === 'sekolah_lain' && <>oleh {option.sekolah_penerima}</>}</Button>}
                                    {parseInt(option.status_terima) === 2 && <Button raised fill style={{background:'#FFB300', fontWeight:'bold'}}>Berkas Tidak lengkap {option.diterima_sekolah === 'sekolah_lain' && <>oleh {option.sekolah_penerima}</>}</Button>}
                                    {parseInt(option.status_terima) === 3 && <Button raised fill style={{background:'#FF5722', fontWeight:'bold'}}>Ditolak {option.diterima_sekolah === 'sekolah_lain' && <>oleh {option.sekolah_penerima}</>}</Button>}
                                    {parseInt(option.status_terima) === 4 && <Button raised fill style={{background:'#9E9E9E', fontWeight:'bold'}}>Cabut Berkas {option.diterima_sekolah === 'sekolah_lain' && <>oleh {option.sekolah_penerima}</>}</Button>}
                                </Col>
                                }
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
    getCalonPesertaDidikSekolah: Actions.getCalonPesertaDidikSekolah,
    setJudulKanan: Actions.setJudulKanan,
    setIsiKanan: Actions.setIsiKanan,
    setPendaftar: Actions.setPendaftar
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
  