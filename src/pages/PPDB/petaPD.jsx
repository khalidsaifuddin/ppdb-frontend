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
import L from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import Routing from 'leaflet-routing-machine';
import ExtraMarkers from 'leaflet-extra-markers';

class petaPD extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            orang_tua_utama: 'ayah',
            pendidikan_terakhir_id_ayah: 99,
            pekerjaan_id_ayah: 98,
            pendidikan_terakhir_id_ibu: 99,
            pekerjaan_id_ibu: 98,
            pendidikan_terakhir_id_wali: 99,
            pekerjaan_id_wali: 98,
            jenis_kelamin: 'L',
            calon_peserta_didik_id: this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null,
        },
        bujur: this.$f7route.params['bujur'] !== 'undefined' ? parseFloat(this.$f7route.params['bujur']) : 113.141552,
        lintang: this.$f7route.params['lintang'] !== 'undefined' ? parseFloat(this.$f7route.params['lintang']) : -8.109038,
        zoom: 17,
        hasLocation: false,
        popup: (<div>Lokasi Rumah PD</div>)
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
    
    // mapRef = createRef()

    // handleClick = () => {
    //     const map = this.mapRef.current
    //     if (map != null) {
    //       map.leafletElement.locate()
    //     }
    // }

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
        this.$f7router.navigate("/tambahCalonPesertaDidik/"+this.state.routeParams.calon_peserta_didik_id+"#"+this.state.lintang+","+this.state.bujur+"")
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

    render()
    {
        const position = [this.state.lintang, this.state.bujur];

        return (
            <Page name="petaPD">
                <Navbar sliding={false}>
                {/* <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}> */}
                    <NavLeft>
                        <Button fill raised onClick={this.konfirmasiKoordinat} iconIos="f7:floppy_disk" iconAurora="f7:floppy_disk" iconMd="material:floppy_disk">
                            &nbsp;Simpan
                        </Button>
                    </NavLeft>
                    <NavTitle sliding>Klik peta untuk menentukan posisi rumah PD</NavTitle>
                    {/* <NavTitleLarge>
                        Peta
                    </NavTitleLarge> */}
                    <NavRight>
                        <Button panelOpen="right" iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Hasil Pencarian</Button>
                    </NavRight>
                    <Subnavbar>
                        <Searchbar
                        className="searchbar-demo"
                        placeholder="Cari nama lokasi..."
                        searchContainer=".search-list"
                        searchIn=".item-title"
                        onSubmit={this.cari}
                        customSearch={true}
                        onChange={this.ketikCari}
                        value={this.state.routeParams.keyword}
                        />
                    </Subnavbar>
                </Navbar>
                {/* <div style={{height:'300px', width:'100%'}}>
                    &nbsp;
                </div> */}
                {/* <Row noGap> */}
                    {/* <Col width="100" tabletWidth="100" style={{marginTop:'60px', paddingLeft:'10px'}}>
                        Untuk menentukan posisi koordinat rumah Anda, silakan klik titik pada peta
                    </Col> */}
                    {/* <Col width="100" tabletWidth="100"> */}
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
                    onClick={this.klikPeta}
                >
                    <TileLayer
                        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        // url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"/>
                    />
                    {/* attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                    <Marker position={position}>
                        <Popup keepInView={true}>
                            {this.state.popup}
                        </Popup>
                    </Marker>
                </Map>
                <Fab style={{width:'80%'}} position="center-bottom" slot="fixed" text={"Klik peta untuk menentukan posisi rumah PD"} color="blue" />
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
      setIsiKanan: Actions.setIsiKanan
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
        panel_kanan_buka: App.panel_kanan_buka
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(petaPD));
  