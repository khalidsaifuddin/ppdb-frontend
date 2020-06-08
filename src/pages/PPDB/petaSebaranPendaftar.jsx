import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio, NavLeft, NavRight, Fab, Subnavbar
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { markerClusterGroup, MarkerClusterGroup } from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import Routing from 'leaflet-routing-machine';
import ExtraMarkers from 'leaflet-extra-markers';

class petaSebaranPendaftar extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            foo: 'bar',
            limit: 1000,
            urut_pilihan: 1,
            urut: 'jarak',
            sekolah_id: this.$f7route.params['sekolah_id'] ? this.$f7route.params['sekolah_id'] : null
        },
        bujur: this.$f7route.params['bujur'] ? parseFloat(this.$f7route.params['bujur']) : 113.141552,
        lintang: this.$f7route.params['lintang'] ? parseFloat(this.$f7route.params['lintang']) : -8.109038,
        bujur_sekolah: this.$f7route.params['bujur'] ? parseFloat(this.$f7route.params['bujur']) : 113.141552,
        lintang_sekolah: this.$f7route.params['lintang'] ? parseFloat(this.$f7route.params['lintang']) : -8.109038,
        zoom: 17,
        hasLocation: false,
        popup: (<div>Lokasi Sekolah</div>),
        entities: {
            rows: [],
            count: 0,
            countAll: 0
        }
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
        console.log(this.$f7route.url);
        localStorage.setItem('current_url', this.$f7route.url);

        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams
            },
            routeParamsWilayah: {
                ...this.state.routeParamsWilayah,
                id_level_wilayah: 1
            }
        },()=>{
            this.props.getPPDBSekolah(this.state.routeParams).then((result)=>{
                // console.log(this.props.ppdb_sekolah);
                this.setState({
                    lintang_sekolah: this.props.ppdb_sekolah.rows[0].lintang,
                    bujur_sekolah: this.props.ppdb_sekolah.rows[0].bujur,
                    lintang: this.props.ppdb_sekolah.rows[0].lintang,
                    bujur: this.props.ppdb_sekolah.rows[0].bujur
                });
            });

            this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    entities: this.props.calon_pd_sekolah
                });
  
                // this.props.setPendaftar(this.props.calon_pd_sekolah.countAll);
            });
        });

    }
    
    // https://nominatim.openstreetmap.org/search.php?q=jatiroto%20lumajang&format=json

    simpan = () => {


        this.setState({
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            
        });
    }    

    setSelectValue = (key) => (b) => {
        // console.log(b);
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: b.target.value
            }
        },()=>{
            
        });
    }

    setFieldValue = (key) => (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: e.target.value
            }
        },()=>{
            console.log(this.state.routeParams);
        });
    }

    simpanKonfirmasi = (status) => {
        this.setState({
            routeParams:{
                status: status,
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                calon_peserta_didik_id: this.state.calon_peserta_didik.calon_peserta_didik_id
            }
        },()=>{
            this.props.simpanKonfirmasiPendaftaran(this.state.routeParams).then((result)=>{
                if(parseInt(this.state.routeParams.status) === 1){
                    //konfirmasi
                }else{
                    //simpan draft
                    this.$f7router.navigate("/Daftar/");
                }
            });
        });
    }

    handleLocationFound = (e) => {
        this.setState({
          hasLocation: true,
          latlng: e.latlng,
        })
    }

    klikPeta = (e) => {
        console.log(e);
        this.setState({
            lintang: e.latlng.lat,
            bujur: e.latlng.lng
            // popup: (<div>Lokasi</div>)
        });
    }

    konfirmasiKoordinat = () => {

        this.setState({
            routeParams:{
                calon_peserta_didik_id: this.state.routeParams.calon_peserta_didik_id,
                lintang: this.state.lintang,
                bujur: this.state.bujur
            }
        },()=>{
            this.props.simpanLintangBujur(this.state.routeParams).then((result)=>{
                this.$f7router.navigate("/tambahCalonPesertaDidik/"+this.state.routeParams.calon_peserta_didik_id);
            });
        });

    }

    ketikCari = (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                keyword: e.currentTarget.value,
                searchText: e.currentTarget.value,
            }
        }, ()=> {
            // this.props.getGeocode(this.state.routeParams);
            // this.props.setKeyword(this.state.routeParams.keyword);
        });
    }

    setTempat = (lintang, bujur) => {
        this.setState({
            lintang: lintang,
            bujur: bujur
        })
    }

    cari = () => {
        // this.props.panelKananBuka(true);
        
        this.props.getGeocode(this.state.routeParams).then((result)=>{
            console.log(this.props.geocode);
            
            
            if(this.props.geocode.length > 0){
                this.setState({
                    lintang: this.props.geocode[0].lat,
                    bujur: this.props.geocode[0].lon,
                    popup: (<div>
                        <Link><b>{this.props.geocode[0].display_name}</b></Link>
                        <br/>
                        {this.props.geocode[0].class === 'place' ? 'Tempat' : this.props.geocode[0].class}, {this.props.geocode[0].type === 'village' ? 'Desa' : this.props.geocode[0].type}
                        <br/>
                        ({this.props.geocode[0].lat} - {this.props.geocode[0].lon})
                    </div>)
                },()=>{
                    
                    this.props.setJudulKanan('Hasil Pencarian "'+this.state.routeParams.keyword+'"');
        
                    this.props.setIsiKanan((
                        <>
                        {this.props.geocode.map((option)=>{
                            return (
                                <Card>
                                    <CardContent>
                                        <Link onClick={()=>this.setTempat(option.lat,option.lon)}><b>{option.display_name}</b></Link>
                                        <br/>
                                        {option.class === 'place' ? 'Tempat' : option.class}, {option.type === 'village' ? 'Desa' : option.type}
                                        <br/>
                                        ({option.lat} - {option.lon})
                                    </CardContent>
                                </Card>
                            )
                        })}
                        </>
                    ));

                });
            }

            // console.log(this.props.panel_kanan_buka);
            
        });
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

                if(this.props.calon_pd_sekolah.count > 0){
                    this.setState({
                        lintang: this.props.calon_pd_sekolah.rows[0].lintang,
                        bujur: this.props.calon_pd_sekolah.rows[0].bujur
                    })
                }
            })
        });
      }

    render()
    {
        const position = [this.state.lintang, this.state.bujur];
        const position_sekolah = [this.state.lintang_sekolah, this.state.bujur_sekolah];

        const myIcon = L.icon({
            iconUrl: 'https://image.flaticon.com/icons/svg/1673/1673188.svg',
            iconSize: [32,32],
            // iconAnchor: [-16, -32],
            // popupAnchor: null,
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null
        });

        // https://image.flaticon.com/icons/svg/1673/1673188.svg

        return (
            <Page name="petaSebaranPendaftar">
                {/* <Navbar sliding={false}> */}
                <Navbar sliding={false} backLink="Kembali">
                    {/* <NavLeft> */}
                        {/* <Button fill raised onClick={this.konfirmasiKoordinat} iconIos="f7:floppy_disk" iconAurora="f7:floppy_disk" iconMd="material:floppy_disk">
                            &nbsp;Simpan
                        </Button> */}
                    {/* </NavLeft> */}
                    <NavTitle sliding>Sebaran Pendaftar</NavTitle>
                    {/* <NavTitleLarge>
                        Peta
                    </NavTitleLarge> */}
                    {/* <NavRight>
                        <Button panelOpen="right" iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Hasil Pencarian</Button>
                    </NavRight> */}
                </Navbar>
                <Subnavbar>
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
                    <Segmented raised>
                        <Button onClick={()=>this.$f7router.navigate('/DaftarCalonPesertaDidikSekolah/')}>Daftar</Button>
                        <Button tabLinkActive>Peta Sebaran</Button>
                    </Segmented>
                </Subnavbar>
                {/* <Block strong style={{marginBottom:'-40px'}}>
                    
                </Block> */}
                <Map 
                    style={{
                        // paddingBottom: "5%",
                        height: this.props.window_dimension.height,
                        width: "100%",
                        marginTop:'35px',
                        cursor: 'pointer'
                    }} 
                    center={position} zoom={this.state.zoom}
                    onLocationfound={this.handleLocationFound}
                    // onClick={this.klikPeta}
                >
                    <TileLayer
                        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                    {/* attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                    <Marker position={position_sekolah}>
                        <Popup keepInView={true}>
                            {this.state.popup}
                        </Popup>
                    </Marker>
                    {/* <MarkerClusterGroup> */}
                        {this.state.entities.rows.map((option)=>{
                            return (
                                <Marker 
                                    icon={myIcon} 
                                    // position={[-8.109038, 113.141552]}
                                    position={[option.lintang, option.bujur]}
                                >
                                    <Popup keepInView={true}>
                                        <Row>
                                            <Col width="20">
                                                <img src={localStorage.getItem('api_base')+option.pas_foto} width={"100%"} />
                                            </Col>
                                            <Col width="80">
                                                <b>{option.nama} ({option.nik})</b><br/>
                                                Jalur {option.jalur} -  Pilihan {option.urut_pilihan}<br/>
                                                {option.lintang}, {option.bujur}<br/>
                                                Jarak ke sekolah: {parseFloat(option.jarak_km).toFixed(2)} km ({parseFloat(option.jarak).toFixed(2)} m)
                                                <br/>
                                                <Button raised fill style={{marginBottom:'8px', color:'white'}} onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+option.calon_peserta_didik_id+"/displayOnly")}>Profil</Button>
                                                <Button raised fill style={{color:'white'}} onClick={e => this.$f7router.navigate('/vervalPendaftar/'+option.calon_peserta_didik_id) }>Verifikasi</Button>
                                            </Col>
                                        </Row>
                                        {/* {this.state.popup} */}


                                    </Popup>
                                </Marker>
                            )
                        })}
                    {/* </MarkerClusterGroup> */}
                </Map>
                {/* <Fab style={{width:'80%'}} position="center-bottom" slot="fixed" text={"Klik peta untuk menentukan posisi rumah PD"} color="blue" /> */}
                    {/* </Col> */}
                {/* </Row> */}
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getPPDBSekolah: Actions.getPPDBSekolah,
      getMstWilayah: Actions.getMstWilayah,
      getCalonPesertaDidik: Actions.getCalonPesertaDidik,
      simpanCalonPesertaDidik: Actions.simpanCalonPesertaDidik,
      simpanSekolahPilihan: Actions.simpanSekolahPilihan,
      getSekolahPilihan: Actions.getSekolahPilihan,
      hapusSekolahPilihan: Actions.hapusSekolahPilihan,
      simpanKonfirmasiPendaftaran: Actions.simpanKonfirmasiPendaftaran,
      getKonfirmasiPendaftaran: Actions.getKonfirmasiPendaftaran,
      getGeocode: Actions.getGeocode,
      panelKananBuka: Actions.panelKananBuka,
      setJudulKanan: Actions.setJudulKanan,
      setIsiKanan: Actions.setIsiKanan,
      simpanLintangBujur: Actions.simpanLintangBujur,
      getCalonPesertaDidikSekolah: Actions.getCalonPesertaDidikSekolah
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        mst_wilayah: Ref.mst_wilayah,
        calon_peserta_didik: PPDBPesertaDidik.calon_peserta_didik,
        sekolah_pilihan: PPDBPesertaDidik.sekolah_pilihan,
        geocode: App.geocode,
        panel_kanan_buka: App.panel_kanan_buka,
        calon_pd_sekolah: PPDBPesertaDidik.calon_pd_sekolah
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(petaSebaranPendaftar));
  