import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio, BlockTitle
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import Routing from 'leaflet-routing-machine';
import ExtraMarkers from 'leaflet-extra-markers';

class tambahCalonPesertaDidik extends Component {
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
            nama: null,
            nisn: null,
            nik: null,
            tanggal_lahir: null,
            kode_wilayah_provinsi:null,
            kode_wilayah_kabupaten:null,
            kode_wilayah_kecamatan:null,
            alamat_tempat_tinggal:null,
            nama_ayah:null,
            nama_ibu:null,
            nama_wali:null,
            calon_peserta_didik_id: (this.$f7route.params['peserta_didik_id'] !== "null" ? (this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null) : null),
            // calon_peserta_didik_id: this.$f7route.params['peserta_didik_id'] ? (this.$f7route.params['peserta_didik_id'] !== "null" ? this.$f7route.params['peserta_didik_id'] : null) : null,
        },
        sekolah_terpilih: {
            sekolah_id: null,
            nama: null
        },
        provinsi: {
            rows: [],
            count: 0
        },
        kabupaten: {
            rows: [],
            count: 0
        },
        kecamatan: {
            rows: [],
            count: 0
        },
        smartSelectJenisKelamin: (<></>),
        disabledInput: true,
        labelNik: 'NIK yang belum pernah didaftarkan sebelumnya',
        lng: 113.141552,
        lat: -8.109038,
        zoom: 10,
        map_besar: (<div></div>)
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

        console.log(this.state.routeParams.calon_peserta_didik_id);
        
        // console.log(this.$f7route.url);
        
        let arrURL = this.$f7route.url.split("#");

        let lintang = -8.109038;
        let bujur = 113.141552;

        if(arrURL.length > 1){
            // console.log('ada hashtag');
            let linbuj = arrURL[1].split(",");
            lintang = linbuj[0];
            bujur = linbuj[1];

            // console.log(lintang);
            // console.log(bujur);

            // this.setState({
            //     ...this.state,
            //     routeParams: {
            //         ...this.state.routeParams,
            //         lintang: lintang,
            //         bujur: bujur
            //     }
            // },()=>{
            //     console.log(this.state.routeParams);
            // });
        }else{
            // console.log('nggak ada hashtag');
            
        }

        localStorage.setItem('current_url', this.$f7route.url);

        this.setState({
            routeParams: {
                ...this.state.routeParams,
                lintang: lintang,
                bujur: bujur

            },
            lintang: lintang,
            bujur: bujur,
            routeParamsWilayah: {
                ...this.state.routeParamsWilayah,
                id_level_wilayah: 1
            }
        },()=>{
            // console.log(this.state.routeParams);
            this.props.getMstWilayah(this.state.routeParamsWilayah).then((result)=>{
                this.setState({
                    provinsi: this.props.mst_wilayah
                });
            });

            // //peta
            // let map_besar = L.map('map_besar').setView([this.state.lat, this.state.lng], this.state.zoom);

            // let tile =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     maxZoom: 19,
            //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            // }).addTo(map_besar);

            // let layerGroup = L.featureGroup().addTo(map_besar);
            // let markerClusters = new L1.MarkerClusterGroup();

            // // map_besar.fitBounds(layerGroup.getBounds());
            // var redMarker = L.ExtraMarkers.icon({
            //     // icon: 'home',
            //     markerColor: 'cyan',
            //     shape: 'square',
            //     prefix: 'f7-icons',
            //     innerHTML: '<img style="width:70%; padding-top:5px" src="https://image.flaticon.com/icons/png/512/49/49944.png" />'
            // });
    

            if(this.state.routeParams.calon_peserta_didik_id && this.state.routeParams.calon_peserta_didik_id !== "null"){
                this.props.getCalonPesertaDidik(this.state.routeParams).then((result)=>{
                    this.setState({
                        routeParams: {
                            ...this.state.routeParams,
                            ...this.props.calon_peserta_didik.rows[0],
                            lintang: (this.state.lintang ? this.state.lintang : this.props.calon_peserta_didik.rows[0].lintang),
                            bujur: (this.state.bujur ? this.state.bujur : this.props.calon_peserta_didik.rows[0].bujur)
                        },
                        disabledInput: false,
                        sekolah_terpilih: this.props.calon_peserta_didik.rows[0].sekolah_asal,
                        smartSelectJenisKelamin: (
                            <ListItem
                                title={"Jenis_Kelamin"}
                                smartSelect
                                smartSelectParams={{
                                    openIn: 'sheet', 
                                    closeOnSelect: true, 
                                    // setValueText:true,
                                    // formatValueText: (values)=>{
                                    //     // return (<h1>haha</h1>)
                                    //     console.log(this.state.routeParams.jenis_kelamin);
                                    //     return [this.state.routeParams.jenis_kelamin];
                                    // }
                                }}
                            >
                                <select name="jenis_kelamin" value={this.props.calon_peserta_didik.rows[0].jenis_kelamin} onChange={this.setSelectValue('jenis_kelamin')}>
                                    <option disabled value={"0"}>-</option>
                                    <option value={"L"}>Laki-laki</option>
                                    <option value={"P"}>Perempuan</option>
                                    
                                </select>
                            </ListItem>
                        )
                        // ,smartSelectProvinsi: (
                        //     <ListItem
                        //         title={"Provinsi"}
                        //         smartSelect
                        //         disabled={false}
                        //         smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                        //     >
                        //         <select name="kode_wilayah_provinsi" defaultValue={"050000"} onChange={this.setSelectValue('kode_wilayah_provinsi')}>
                        //             <option disabled value={"0"}>-</option>
                        //             {this.state.provinsi.rows.map((optionProvinsi)=>{
                        //                 return (
                        //                     <option value={optionProvinsi.kode_wilayah.trim()}>{optionProvinsi.nama}</option>
                        //                 )
                        //             })}
                        //         </select>
                        //     </ListItem>
                        // )
                    },()=>{
                        console.log(this.state.sekolah_terpilih);
                        // let marker = new L.Marker([this.state.routeParams.lintang, this.state.routeParams.bujur], {icon:redMarker, draggable:false});
                        // // let marker = new L.Marker([element.lintang, element.bujur], {icon:redMarker, draggable:false}).bindPopup( popup );
                        // markerClusters.addLayer( marker );
                        
                        // layerGroup.addLayer(markerClusters);
            
                        // map_besar.fitBounds(layerGroup.getBounds());
                    });
                });
            }else{
                this.setState({
                    smartSelectJenisKelamin: (<ListItem
                        title={"Jenis_Kelamin"}
                        smartSelect
                        disabled={this.state.disabledInput}
                        smartSelectParams={{
                            openIn: 'sheet', 
                            closeOnSelect: true
                            
                        }}
                    >
                        <select name="jenis_kelamin" value={this.state.routeParams.jenis_kelamin} onChange={this.setSelectValue('jenis_kelamin')}>
                            <option disabled value={"0"}>-</option>
                            <option value={"L"}>Laki-laki</option>
                            <option value={"P"}>Perempuan</option>
                            
                        </select>
                    </ListItem>)
                },()=>{
                    // console.log(this.state.routeParams);
                    // let marker = new L.Marker([this.state.lat, this.state.lng], {icon:redMarker, draggable:false});
                    // // let marker = new L.Marker([element.lintang, element.bujur], {icon:redMarker, draggable:false}).bindPopup( popup );
                    // markerClusters.addLayer( marker );

                    // layerGroup.addLayer(markerClusters);
            
                    // map_besar.fitBounds(layerGroup.getBounds());
                });
            }

        });

    }
    
    cariSekolah = () => {
        this.props.getPPDBSekolah(this.state.routeParamsCariSekolah);
    }

    ketikCariSekolah = (e) => {
        this.setState({
            routeParamsCariSekolah: {
                searchText: e.currentTarget.value
            }
        });
    }

    klikPilihSekolah = (sekolah_id, nama, npsn, alamat) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                asal_sekolah_id: sekolah_id
            },
            sekolah_terpilih: {
                sekolah_id: sekolah_id,
                nama: nama,
                npsn: npsn,
                alamat: alamat
            }
        },()=>{
            console.log('sekolah_id')
        });
    }

    simpan = () => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                sekolah_asal: null
            }
        },()=>{
            if(this.state.routeParams.nama === null || this.state.routeParams.nik === null || this.state.routeParams.tempat_lahir === null || this.state.routeParams.tanggal_lahir === null){
                this.$f7.dialog.alert('Nama/NISN/tempat dan tanggal lahir tidak boleh kosong!','Peringatan');
                return false;
            }
            
            if(this.state.routeParams.kode_wilayah_provinsi === null || this.state.routeParams.kode_wilayah_kabupaten === null || this.state.routeParams.kode_wilayah_kecamatan === null || this.state.routeParams.alamat_tempat_tinggal === null){
                this.$f7.dialog.alert('Alamat tidak boleh kosong!','Peringatan');
                return false;
            }
            
            if(this.state.routeParams.orang_tua_utama === 'ayah' && this.state.routeParams.nama_ayah === null){
                this.$f7.dialog.alert('Nama ayah tidak boleh kosong!','Peringatan');
                return false;

            }else if(this.state.routeParams.orang_tua_utama === 'ibu' && this.state.routeParams.nama_ibu === null){
                this.$f7.dialog.alert('Nama ibu tidak boleh kosong!','Peringatan');
                return false;

            }else if(this.state.routeParams.orang_tua_utama === 'wali' && this.state.routeParams.nama_wali === null){
                this.$f7.dialog.alert('Nama wali tidak boleh kosong!','Peringatan');
                return false;

            }

            this.props.simpanCalonPesertaDidik(this.state.routeParams).then((result)=>{
                if(result.payload.peserta_didik_id){
                    // this.$f7router.navigate('/tambahJalurSekolah/')
                    this.$f7router.navigate('/tambahJalurSekolah/'+result.payload.peserta_didik_id)
                }else{
                    this.$f7.dialog.alert('Ada kesalahan pada sistem atau jaringan internet Anda. Mohon coba beberapa saat lagi');
                }
            });
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
            console.log(this.state.routeParams);

            if(key === 'kode_wilayah_provinsi'){
                this.setState({
                    routeParamsWilayah: {
                        id_level_wilayah: 2,
                        mst_kode_wilayah: this.state.routeParams.kode_wilayah_provinsi
                    }
                },()=>{
                    this.props.getMstWilayah(this.state.routeParamsWilayah).then((result)=>{
                        this.setState({
                            kabupaten: this.props.mst_wilayah
                        })
                    });
                });
            }else if(key === 'kode_wilayah_kabupaten'){
                this.setState({
                    routeParamsWilayah: {
                        id_level_wilayah: 3,
                        mst_kode_wilayah: this.state.routeParams.kode_wilayah_kabupaten
                    }
                },()=>{
                    this.props.getMstWilayah(this.state.routeParamsWilayah).then((result)=>{
                        this.setState({
                            kecamatan: this.props.mst_wilayah
                        })
                    });
                });
            }
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
    
    cekNik = (e) => {
        // console.log(e.target.value);
        this.setState({
            routeParamsCek: {
                nik: e.target.value,
                calon_peserta_didik_id: (this.$f7route.params['peserta_didik_id'] !== "null" ? (this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null) : null),
            }
        },()=>{
            this.props.cekNik(this.state.routeParamsCek).then((result)=>{
                if(this.props.cek_nik.count > 0){
                    //ada
                    this.setState({
                        disabledInput: true,
                        labelNik: 'NIK yang dimasukkan telah terdaftar sebelumnya. Mohon masukkan NIK lain'
                    });
                }else{
                    //tidak ada
                    this.setState({
                        disabledInput: false,
                        labelNik: 'NIK valid dan dapat didaftarkan'
                    });
                }
            })
        });
    }

    // bukaPeta = () => {
    //     let markerClusters = new L1.MarkerClusterGroup();

    //     var redMarker = L.ExtraMarkers.icon({
    //         // icon: 'home',
    //         markerColor: 'cyan',
    //         shape: 'square',
    //         prefix: 'f7-icons',
    //         innerHTML: '<img style="width:70%; padding-top:5px" src="https://image.flaticon.com/icons/png/512/49/49944.png" />'
    //     });

    //     let marker = new L.Marker([this.state.routeParams.lintang, this.state.routeParams.bujur], {icon:redMarker, draggable:false});
    //     // let marker = new L.Marker([element.lintang, element.bujur], {icon:redMarker, draggable:false}).bindPopup( popup );
    //     markerClusters.addLayer( marker );
        
    //     layerGroup.addLayer(markerClusters);

    //     map_besar.fitBounds(layerGroup.getBounds());
    // }

    render()
    {
        return (
            <Page name="tambahCalonPesertaDidik" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Tambah Peserta Didik</NavTitle>
                    <NavTitleLarge>
                        Tambah Peserta Didik
                    </NavTitleLarge>
                </Navbar>
                <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginBottom: '8px', marginTop:'70px'}}>
                    <Button style={{borderRadius:'20px 50px 50px 20px'}} tabLinkActive>Identitas Peserta Didik</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Jalur dan Pilihan Sekolah</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Kelengkapan Berkas</Button>
                    <Button style={{borderRadius:'0px 0px 0px 0px'}}>Konfirmasi</Button>
                </Segmented>

                <Row noGap>
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardHeader>
                                Identitas Calon Peserta Didik
                            </CardHeader>
                            <CardContent>
                                <List>
                                {/* <List noHairlinesMd> */}
                                    <ListInput
                                        label="Nomor Induk Kependudukan / NIK"
                                        type="text"
                                        placeholder="Ketikkan NIK dan enter..."
                                        // info="NIK yang belum pernah didaftarkan sebelumnya"
                                        clearButton
                                        onChange={this.setFieldValue('nik')}
                                        onBlur={this.cekNik}
                                        onSubmit={this.cekNik}
                                        defaultValue={this.state.routeParams.nik}
                                    >
                                        <span slot="info"><b style={{color:(this.state.disabledInput ? 'red' : 'green')}}>{this.state.labelNik}</b></span>
                                    </ListInput>

                                    <ListInput
                                        label="Nama Calon Peserta Didik"
                                        type="text"
                                        placeholder="Nama Calon Peserta Didik ..."
                                        info="Sesuai Ijazah"
                                        clearButton
                                        onChange={this.setFieldValue('nama')}
                                        defaultValue={this.state.routeParams.nama}
                                        disabled={this.state.disabledInput}
                                    />
                                    
                                    <ListInput
                                        label="NISN"
                                        type="text"
                                        placeholder="NISN Calon Peserta Didik ..."
                                        info="Sesuai Ijazah"
                                        clearButton
                                        onChange={this.setFieldValue('nisn')}
                                        defaultValue={this.state.routeParams.nisn}
                                        disabled={this.state.disabledInput}
                                    />
                                    
                                    {this.state.smartSelectJenisKelamin}
                                    {/* <ListItem
                                        title={"Jenis_Kelamin"}
                                        smartSelect
                                        smartSelectParams={{
                                            openIn: 'sheet', 
                                            closeOnSelect: true, 
                                            setValueText:true,
                                            formatValueText: (values)=>{
                                                // return (<h1>haha</h1>)
                                                console.log(this.state.routeParams.jenis_kelamin);
                                                return [this.state.routeParams.jenis_kelamin];
                                            }
                                        }}
                                    >
                                        <select name="jenis_kelamin" value={this.state.routeParams.jenis_kelamin} onChange={this.setSelectValue('jenis_kelamin')}>
                                            <option disabled value={"0"}>-</option>
                                            <option value={"L"}>Laki-laki</option>
                                            <option value={"P"}>Perempuan</option>
                                            
                                        </select>
                                    </ListItem> */}
                                    
                                    <ListInput
                                        label="Tempat Lahir"
                                        type="text"
                                        placeholder="Tempat Lahir ..."
                                        // info="NIK yang belum pernah didaftarkan sebelumnya"
                                        clearButton
                                        onChange={this.setFieldValue('tempat_lahir')}
                                        defaultValue={this.state.routeParams.tempat_lahir}
                                        disabled={this.state.disabledInput}
                                    />

                                    <ListInput
                                        label="Tanggal Lahir"
                                        type="date"
                                        placeholder="Tanggal Lahir..."
                                        onChange={this.setFieldValue('tanggal_lahir')}
                                        defaultValue={this.state.routeParams.tanggal_lahir}
                                        disabled={this.state.disabledInput}
                                    />
                                    {/* {this.state.smartSelectProvinsi} */}
                                    <ListItem
                                        title={"Provinsi"}
                                        smartSelect
                                        disabled={this.state.disabledInput}
                                        smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                    >
                                        <select name="kode_wilayah_provinsi" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_provinsi')}>
                                            <option disabled value={"0"}>-</option>
                                            {this.state.provinsi.rows.map((optionProvinsi)=>{
                                                return (
                                                    <option value={optionProvinsi.kode_wilayah}>{optionProvinsi.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </ListItem>
                                    
                                    <ListItem
                                        title={"Kabupaten/Kota"}
                                        smartSelect
                                        disabled={this.state.disabledInput}
                                        smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                    >
                                        <select name="kode_wilayah_kabupaten" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_kabupaten')}>
                                            <option value={"0"}>-</option>
                                            {this.state.kabupaten.rows.map((optionKabupaten)=>{
                                                return (
                                                    <option value={optionKabupaten.kode_wilayah}>{optionKabupaten.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </ListItem>
                                    
                                    <ListItem
                                        title={"Kecamatan"}
                                        smartSelect
                                        disabled={this.state.disabledInput}
                                        smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                    >
                                        <select name="kode_wilayah_kecamatan" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_kecamatan')}>
                                            <option value={"0"}>-</option>
                                            {this.state.kecamatan.rows.map((optionKecamatan)=>{
                                                return (
                                                    <option value={optionKecamatan.kode_wilayah}>{optionKecamatan.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </ListItem>

                                    <ListInput
                                        label="Alamat Tempat Tinggal"
                                        type="textarea"
                                        placeholder="Alamat Tempat Tinggal ..."
                                        info="Sesuai dengan kartu keluarga (KK)"
                                        clearButton
                                        onChange={this.setFieldValue('alamat_tempat_tinggal')}
                                        defaultValue={this.state.routeParams.alamat_tempat_tinggal}
                                        disabled={this.state.disabledInput}
                                    />

                                    <ListInput
                                        label="RT"
                                        type="text"
                                        placeholder="RT..."
                                        onChange={this.setFieldValue('rt')}
                                        defaultValue={this.state.routeParams.rt}
                                    />

                                    <ListInput
                                        label="RW"
                                        type="text"
                                        placeholder="RW..."
                                        onChange={this.setFieldValue('rw')}
                                        defaultValue={this.state.routeParams.rw}
                                        disabled={this.state.disabledInput}
                                    />
                                    
                                    <ListInput
                                        label="Dusun"
                                        type="text"
                                        placeholder="Dusun..."
                                        onChange={this.setFieldValue('dusun')}
                                        defaultValue={this.state.routeParams.dusun}
                                        disabled={this.state.disabledInput}
                                    />
                                    
                                    <ListInput
                                        label="Desa/Kelurahan"
                                        type="text"
                                        placeholder="Desa/Kelurahan..."
                                        onChange={this.setFieldValue('desa_kelurahan')}
                                        defaultValue={this.state.routeParams.desa_kelurahan}
                                        disabled={this.state.disabledInput}
                                    />
                                    
                                    <ListInput
                                        label="Koordinat Rumah Tinggal (Lintang)"
                                        type="text"
                                        placeholder="Lintang..."
                                        onChange={this.setFieldValue('lintang')}
                                        defaultValue={this.state.routeParams.lintang}
                                        disabled={this.state.disabledInput}
                                    />
                                    
                                    <ListInput
                                        label="Koordinat Rumah Tinggal (Bujur)"
                                        type="text"
                                        placeholder="Bujur..."
                                        onChange={this.setFieldValue('bujur')}
                                        defaultValue={this.state.routeParams.bujur}
                                        disabled={this.state.disabledInput}
                                    />

                                    {/* <ListInput
                                        label="E-mail"
                                        type="email"
                                        placeholder="Your e-mail"
                                        clearButton
                                    /> */}

                                    {/* <ListInput
                                        label="URL"
                                        type="url"
                                        placeholder="URL"
                                        clearButton
                                    /> */}
                                </List>
                                <br/>
                                <Button onClick={()=>{this.$f7router.navigate("/petaPD/"+this.state.routeParams.calon_peserta_didik_id+"/"+this.state.routeParams.lintang+"/"+this.state.routeParams.bujur)}}>
                                    Lihat/Ubah Posisi Koordinat Rumah
                                </Button>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardHeader>
                                Identitas Orang Tua
                            </CardHeader>
                            <CardContent>
                                <List>
                                    <ListItem
                                        title={"Orang Tua Penanggung Jawab"}
                                        smartSelect
                                        disabled={this.state.disabledInput}
                                        smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                    >
                                        <select name="orang_tua_utama" defaultValue={"ayah"} onChange={this.setSelectValue('orang_tua_utama')}>
                                            <option value={"ayah"}>Ayah</option>
                                            <option value={"ibu"}>Ibu</option>
                                            <option value={"wali"}>Wali</option>
                                            
                                        </select>
                                    </ListItem>
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListInput
                                        label="Nama Ayah"
                                        type="text"
                                        disabled={this.state.disabledInput}
                                        placeholder="Nama Ayah ..."
                                        // info="Sesuai Ijazah"
                                        clearButton
                                        onChange={this.setFieldValue('nama_ayah')}
                                        defaultValue={this.state.routeParams.nama_ayah}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListInput
                                            label="Tempat Lahir Ayah"
                                            type="text"
                                            disabled={this.state.disabledInput}
                                            placeholder="Tempat Lahir Ayah ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            onChange={this.setFieldValue('tempat_lahir_ayah')}
                                            defaultValue={this.state.routeParams.tempat_lahir_ayah}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListInput
                                            label="Tanggal Lahir Ayah"
                                            type="date"
                                            disabled={this.state.disabledInput}
                                            placeholder="Tanggal Lahir Ayah..."
                                            onChange={this.setFieldValue('tanggal_lahir_ayah')}
                                            defaultValue={this.state.routeParams.tanggal_lahir_ayah}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListItem
                                            title={"Pendidikan Terakhir Ayah"}
                                            smartSelect
                                            disabled={this.state.disabledInput}
                                            smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                        >
                                            <select name="pendidikan_terakhir_id_ayah" defaultValue={"99"} onChange={this.setSelectValue('pendidikan_terakhir_id_ayah')}>
                                                <option value={"99"}>Tidak Sekolah</option>
                                                <option value={"1"}>SD</option>
                                                <option value={"2"}>SMP</option>
                                                <option value={"3"}>SMA/SMK</option>
                                                <option value={"4"}>D1/D2/D3</option>
                                                <option value={"5"}>S1</option>
                                                <option value={"6"}>S2</option>
                                                <option value={"7"}>S3</option>
                                                
                                            </select>
                                        </ListItem>
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListItem
                                            title={"Pekerjaan Ayah"}
                                            smartSelect
                                            disabled={this.state.disabledInput}
                                            smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                        >
                                            <select name="pekerjaan_id_ayah" defaultValue={"98"} onChange={this.setSelectValue('pekerjaan_id_ayah')}>
                                                <option value={"98"}>Tidak Bekerja</option>
                                                <option value={"1"}>Pegawai Negeri</option>
                                                <option value={"2"}>Pegawai Swasta</option>
                                                <option value={"7"}>TNI/Polri</option>
                                                <option value={"6"}>Wirausaha</option>
                                                <option value={"3"}>Profesional</option>
                                                <option value={"4"}>Guru</option>
                                                <option value={"5"}>Petani</option>
                                                <option value={"99"}>Lainnya</option>
                                                {/* <option value={"1"}>SD</option>
                                                <option value={"2"}>SMP</option>
                                                <option value={"3"}>SMA/SMK</option>
                                                <option value={"4"}>D1/D2/D3</option>
                                                <option value={"5"}>S1</option>
                                                <option value={"6"}>S2</option>
                                                <option value={"7"}>S3</option> */}
                                                
                                            </select>
                                        </ListItem>
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListInput
                                            label="Alamat Tempat Tinggal Ayah"
                                            type="textarea"
                                            placeholder="Alamat Tempat Tinggal Ayah ..."
                                            info="Sesuai dengan kartu keluarga (KK)"
                                            clearButton
                                            disabled={this.state.disabledInput}
                                            onChange={this.setFieldValue('alamat_tempat_tinggal_ayah')}
                                            defaultValue={this.state.routeParams.alamat_tempat_tinggal_ayah}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListInput
                                            label="Nomor Telepon Ayah"
                                            type="tel"
                                            errorMessage="Mohon isikan nomor telepon yang benar!"
                                            placeholder="Nomor Telepon Ayah ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            validate
                                            disabled={this.state.disabledInput}
                                            pattern="[0-9]*"
                                            onChange={this.setFieldValue('no_telepon_ayah')}
                                            defaultValue={this.state.routeParams.no_telepon_ayah}
                                        />
                                    }

                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListInput
                                            label="Nama Ibu"
                                            type="text"
                                            placeholder="Nama Ibu ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            disabled={this.state.disabledInput}
                                            onChange={this.setFieldValue('nama_ibu')}
                                            defaultValue={this.state.routeParams.nama_ibu}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListInput
                                            label="Tempat Lahir Ibu"
                                            type="text"
                                            placeholder="Tempat Lahir Ibu ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            disabled={this.state.disabledInput}
                                            onChange={this.setFieldValue('tempat_lahir_ibu')}
                                            defaultValue={this.state.routeParams.tempat_lahir_ibu}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListInput
                                            label="Tanggal Lahir Ibu"
                                            type="date"
                                            placeholder="Tanggal Lahir Ibu..."
                                            disabled={this.state.disabledInput}
                                            onChange={this.setFieldValue('tanggal_lahir_ibu')}
                                            defaultValue={this.state.routeParams.tanggal_lahir_ibu}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListItem
                                            title={"Pendidikan Terakhir Ibu"}
                                            smartSelect
                                            disabled={this.state.disabledInput}
                                            smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                        >
                                            <select name="pendidikan_terakhir_id_ibu" defaultValue={"99"} onChange={this.setSelectValue('pendidikan_terakhir_id_ibu')}>
                                                <option value={"99"}>Tidak Sekolah</option>
                                                <option value={"1"}>SD</option>
                                                <option value={"2"}>SMP</option>
                                                <option value={"3"}>SMA/SMK</option>
                                                <option value={"4"}>D1/D2/D3</option>
                                                <option value={"5"}>S1</option>
                                                <option value={"6"}>S2</option>
                                                <option value={"7"}>S3</option>
                                                
                                            </select>
                                        </ListItem>
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListItem
                                            title={"Pekerjaan Ibu"}
                                            smartSelect
                                            disabled={this.state.disabledInput}
                                            smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                        >
                                            <select name="pekerjaan_id_ibu" defaultValue={"98"} onChange={this.setSelectValue('pekerjaan_id_ibu')}>
                                                <option value={"98"}>Tidak Bekerja</option>
                                                <option value={"1"}>Pegawai Negeri</option>
                                                <option value={"2"}>Pegawai Swasta</option>
                                                <option value={"7"}>TNI/Polri</option>
                                                <option value={"6"}>Wirausaha</option>
                                                <option value={"3"}>Profesional</option>
                                                <option value={"4"}>Guru</option>
                                                <option value={"5"}>Petani</option>
                                                <option value={"99"}>Lainnya</option>
                                                {/* <option value={"1"}>SD</option>
                                                <option value={"2"}>SMP</option>
                                                <option value={"3"}>SMA/SMK</option>
                                                <option value={"4"}>D1/D2/D3</option>
                                                <option value={"5"}>S1</option>
                                                <option value={"6"}>S2</option>
                                                <option value={"7"}>S3</option> */}
                                                
                                            </select>
                                        </ListItem>
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListInput
                                            label="Alamat Tempat Tinggal Ibu"
                                            type="textarea"
                                            disabled={this.state.disabledInput}
                                            placeholder="Alamat Tempat Tinggal Ibu ..."
                                            info="Sesuai dengan kartu keluarga (KK)"
                                            clearButton
                                            onChange={this.setFieldValue('alamat_tempat_tinggal_ibu')}
                                            defaultValue={this.state.routeParams.alamat_tempat_tinggal_ibu}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListInput
                                            label="Nomor Telepon Ibu"
                                            type="tel"
                                            errorMessage="Mohon isikan nomor telepon yang benar!"
                                            placeholder="Nomor Telepon Ibu ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            validate
                                            pattern="[0-9]*"
                                            onChange={this.setFieldValue('no_telepon_ibu')}
                                            defaultValue={this.state.routeParams.no_telepon_ibu}
                                        />
                                    }
                                    
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListInput
                                            label="Nama Wali"
                                            type="text"
                                            disabled={this.state.disabledInput}
                                            placeholder="Nama Wali ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            onChange={this.setFieldValue('nama_wali')}
                                            defaultValue={this.state.routeParams.nama_wali}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListInput
                                            label="Tempat Lahir Wali"
                                            type="text"
                                            placeholder="Tempat Lahir Wali ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            disabled={this.state.disabledInput}
                                            onChange={this.setFieldValue('tempat_lahir_wali')}
                                            defaultValue={this.state.routeParams.tempat_lahir_wali}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListInput
                                            label="Tanggal Lahir Wali"
                                            type="date"
                                            disabled={this.state.disabledInput}
                                            placeholder="Tanggal Lahir Wali..."
                                            onChange={this.setFieldValue('tanggal_lahir_wali')}
                                            defaultValue={this.state.routeParams.tanggal_lahir_wali}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListItem
                                            title={"Pendidikan Terakhir Wali"}
                                            smartSelect
                                            disabled={this.state.disabledInput}
                                            smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                        >
                                            <select name="pendidikan_terakhir_id_wali" defaultValue={"99"} onChange={this.setSelectValue('pendidikan_terakhir_id_wali')}>
                                                <option value={"99"}>Tidak Sekolah</option>
                                                <option value={"1"}>SD</option>
                                                <option value={"2"}>SMP</option>
                                                <option value={"3"}>SMA/SMK</option>
                                                <option value={"4"}>D1/D2/D3</option>
                                                <option value={"5"}>S1</option>
                                                <option value={"6"}>S2</option>
                                                <option value={"7"}>S3</option>
                                                
                                            </select>
                                        </ListItem>
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListItem
                                            title={"Pekerjaan Wali"}
                                            smartSelect
                                            disabled={this.state.disabledInput}
                                            smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                            closeOnSelect
                                        >
                                            <select name="pekerjaan_id_wali" defaultValue={"98"} onChange={this.setSelectValue('pekerjaan_id_wali')}>
                                                <option value={"98"}>Tidak Bekerja</option>
                                                <option value={"1"}>Pegawai Negeri</option>
                                                <option value={"2"}>Pegawai Swasta</option>
                                                <option value={"7"}>TNI/Polri</option>
                                                <option value={"6"}>Wirausaha</option>
                                                <option value={"3"}>Profesional</option>
                                                <option value={"4"}>Guru</option>
                                                <option value={"5"}>Petani</option>
                                                <option value={"99"}>Lainnya</option>
                                                
                                            </select>
                                        </ListItem>
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListInput
                                            label="Alamat Tempat Tinggal Wali"
                                            type="textarea"
                                            placeholder="Alamat Tempat Tinggal Wali ..."
                                            info="Sesuai dengan kartu keluarga (KK)"
                                            clearButton
                                            disabled={this.state.disabledInput}
                                            onChange={this.setFieldValue('alamat_tempat_tinggal_wali')}
                                            defaultValue={this.state.routeParams.alamat_tempat_tinggal_wali}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListInput
                                            label="Nomor Telepon Wali"
                                            type="tel"
                                            errorMessage="Mohon isikan nomor telepon yang benar!"
                                            placeholder="Nomor Telepon Wali ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            validate
                                            disabled={this.state.disabledInput}
                                            pattern="[0-9]*"
                                            onChange={this.setFieldValue('no_telepon_wali')}
                                            defaultValue={this.state.routeParams.no_telepon_wali}
                                        />
                                    }
                                </List>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                Sekolah Asal
                            </CardHeader>
                            <CardContent>
                                <Card>
                                    {this.state.sekolah_terpilih.sekolah_id &&
                                    <CardContent>
                                        <b>{this.state.sekolah_terpilih.nama} ({this.state.sekolah_terpilih.npsn})</b><br/>
                                        {this.state.sekolah_terpilih.alamat}
                                    </CardContent>
                                    }
                                    {!this.state.sekolah_terpilih.sekolah_id &&
                                    <CardContent>
                                        <i>Sekolah asal belum dipilih</i>
                                    </CardContent>
                                    }
                                </Card>
                                <Button disabled={this.state.disabledInput} fill sheetOpen=".demo-sheet">Pilih Sekolah</Button>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" style={{padding:'8px', marginBottom:'70px'}}>
                        <Button disabled={this.state.disabledInput} raised fill large style={{width:'100%', maxWidth:'5   00px', margin:'auto', marginBottom:'20px'}} onClick={this.simpan}>
                            Simpan dan Lanjutkan
                        </Button>
                    </Col>
                </Row>
                <Sheet className="demo-sheet" push style={{height:'50%'}}>
                <Toolbar>
                    <div className="left"></div>
                    <div className="right">
                    <Link sheetClose>Tutup</Link>
                    </div>
                </Toolbar>
                <PageContent>
                    <Searchbar
                        className="searchbar-cari-sekolah"
                        // expandable
                        placeholder="Cari sekolah..."
                        // searchContainer=".search-list"
                        // searchIn=".item-title"
                        onSubmit={this.cariSekolah}
                        customSearch={true}
                        onChange={this.ketikCariSekolah}
                        // value={this.state.routeParams.keyword}
                    ></Searchbar>
                    {/* <Block>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                    </Block> */}
                    {this.props.ppdb_sekolah.rows.map((option)=>{
                        return (
                            <Card>
                                <CardContent>
                                    <Row>
                                        <Col width="80">
                                            <b>{option.nama} ({option.npsn})</b><br/>
                                            {option.alamat_jalan}, {option.kecamatan}, {option.kabupaten}, {option.provinsi}
                                        </Col>
                                        <Col width="20" style={{textAlign:'right'}}>
                                            <Radio 
                                                // style={{marginTop:'15px'}} 
                                                name={"pilih-sekolah"} 
                                                value={option.sekolah_id} 
                                                // slot="media"
                                                onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi))}
                                            />
                                        </Col>
                                    </Row>
                                </CardContent>
                            </Card>
                        )
                    })}
                </PageContent>
                </Sheet>

                
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
      cekNik: Actions.cekNik
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        mst_wilayah: Ref.mst_wilayah,
        calon_peserta_didik: PPDBPesertaDidik.calon_peserta_didik,
        cek_nik: PPDBPesertaDidik.cek_nik
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahCalonPesertaDidik));
  