import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio, Preloader
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

class tambahKonfirmasi extends Component {
    state = {
        error: null,
        loading: false,
        displayOnly: this.$f7route.params['displayOnly'] ? this.$f7route.params['displayOnly'] : null,
        routeParams:{
            pengguna_id: (localStorage.getItem('kode_aplikasi') === 'PPDB' ? JSON.parse(localStorage.getItem('user')).pengguna_id : null),
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
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
        smartSelectJalur: (<></>),
        sekuen_sekolah_pilihan: 0,
        arrSekolahPilihan: [],
        listSekolahPilihan: [],
        sheetOpened: false,
        displaySekolahPilihan: {},
        calon_peserta_didik: {},
        disableButton: true,
        tampilTerimaKasih: 'none'
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
            routeParams: {
                ...this.state.routeParams
            },
            routeParamsWilayah: {
                ...this.state.routeParamsWilayah,
                id_level_wilayah: 1
            }
        },()=>{

            if(this.state.routeParams.calon_peserta_didik_id){
                this.props.getCalonPesertaDidik(this.state.routeParams).then((result)=>{
                    this.setState({
                        routeParams: {
                            ...this.state.routeParams,
                            ...this.props.calon_peserta_didik.rows[0],
                            jalur_id: '0100'
                        },
                        calon_peserta_didik: this.props.calon_peserta_didik.rows[0]
                    },()=>{
                        this.props.getKonfirmasiPendaftaran(this.state.routeParams).then((result)=>{
                            if(result.payload.count < 1){
                                //belum konfirmasi
                                this.setState({
                                    disableButton: false,
                                    tampilTerimaKasih: 'none'
                                })
                            }else{
                                //sudah konfirmasi

                                if(result.payload.rows[0].status !== 1){
                                    //belum konfirmasi
                                    this.setState({
                                        disableButton: false,
                                        tampilTerimaKasih: 'none'
                                    })
                                }else{
                                    //sudah konfirmasi
                                    this.setState({
                                        disableButton: true,
                                        tampilTerimaKasih: 'block'
                                    });
                                }

                            }
                        });
                    })
                });
            }
        });

    }
    
    

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
            ...this.state,
            disableButton: true
        },()=>{

            if(parseInt(status) === 1){
                if(this.state.calon_peserta_didik.pilihan_sekolah.length < 3){
                    this.$f7.dialog.alert('Mohon pilih 3 sekolah sebelum melakukan konfirmasi!','Peringatan');
                    this.setState({
                        ...this.state,
                        disableButton: false
                    });
                    return false;
                }

                this.props.validasiBerkas(this.state.routeParams).then((result)=>{
        
                    console.log(this.props.validasi_berkas);
        
                    if(this.props.validasi_berkas.count < 1){
                        //datanya nggak ada
                        this.$f7.dialog.alert('Mohon lengkapi berkas persyaratan sebelum melakukan konfirmasi!','Peringatan');
                        this.setState({
                            ...this.state,
                            disableButton: false
                        });
                        return false;
                    }else{
                        //datanya ada
                        let totalValidasi = 0;
                        let yangHarus = 0;
                        this.props.validasi_berkas.rows.map((option)=>{
                            if(parseInt(option.wajib) === 1){
                                yangHarus++;
                                
                                if(option.nama_file){
                                    totalValidasi++;
                                }
                            }
    
                        });
        
                        console.log(totalValidasi);
                        
                        if(totalValidasi < yangHarus){
                            //belum lengkap
                            this.$f7.dialog.alert('Mohon lengkapi berkas persyaratan sebelum melakukan konfirmasi!','Peringatan');
                            this.setState({
                                ...this.state,
                                disableButton: false
                            });
                            return false;
                        }else{
                            //sudah lengkap
                            // console.log('sudah lengkap');
                            this.$f7.dialog.confirm('Apakah Anda yakin ingin konfirmasi?','Konfirmasi',()=>{
    
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
                                            this.setState({
                                                ...this.state,
                                                disableButton: false
                                            });
                                            this.$f7router.navigate("/Daftar/");
                                        }else{
                                            //simpan draft
                                            this.setState({
                                                ...this.state,
                                                disableButton: false
                                            });
                                            this.$f7router.navigate("/Daftar/");
                                        }
                                    });
                                });
                                
                            },()=>{
                                this.setState({
                                    ...this.state,
                                    disableButton: false
                                });
                            });
    
                        }
        
                    }
        
                });

            }else{

                // simpan draft
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
                            this.setState({
                                ...this.state,
                                disableButton: false
                            });
                            this.$f7router.navigate("/Daftar/");
                        }else{
                            //simpan draft
                            this.setState({
                                ...this.state,
                                disableButton: false
                            });
                            this.$f7router.navigate("/Daftar/");
                        }
                    });
                });


            }
    

        });


    }

    render()
    {
        let waktu_mulai = '';
        let tgl_waktu_mulai = new Date();
        waktu_mulai = moment(tgl_waktu_mulai).format('D') + ' ' + this.bulan[(moment(tgl_waktu_mulai).format('M')-1)] + ' ' + moment(tgl_waktu_mulai).format('YYYY') + ', pukul ' + moment(tgl_waktu_mulai).format('H') + ':' + moment(tgl_waktu_mulai).format('mm');

        return (
            <Page name="tambahKonfirmasi" hideBarsOnScroll>
                <Navbar sliding={false}>
                {/* <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}> */}
                    <NavTitle sliding>{this.state.displayOnly === null ? <>Tambah Peserta Didik</> : this.state.routeParams.nama}</NavTitle>
                    <NavTitleLarge>
                        {this.state.displayOnly === null ? <>Tambah Peserta Didik</> : this.state.routeParams.nama}
                    </NavTitleLarge>
                </Navbar>
                {/* <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '70px', marginBottom: '8px'}}>
                    <Button style={{borderRadius:'20px 50px 50px 20px'}}>Identitas Peserta Didik</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Jalur dan Pilihan Sekolah</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Kelengkapan Berkas</Button>
                    <Button style={{borderRadius:'0px 0px 0px 0px'}} tabLinkActive>Konfirmasi</Button>
                </Segmented> */}
                <Block className="pageWithTitle">
                    <Segmented className="steps" raised>
                        <Button onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+(this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null)+(this.state.displayOnly === null ? '' : '/displayOnly'))}>Identitas Peserta Didik</Button>
                        <Button onClick={()=>this.$f7router.navigate("/tambahJalurSekolah/"+(this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null)+(this.state.displayOnly === null ? '' : '/displayOnly'))}>Jalur dan Pilihan Sekolah</Button>
                        <Button onClick={()=>this.$f7router.navigate("/tambahBerkas/"+(this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null)+(this.state.displayOnly === null ? '' : '/displayOnly'))}>Kelengkapan Berkas</Button>
                        <Button tabLinkActive>Konfirmasi</Button>
                    </Segmented>
                    {this.state.displayOnly !== null &&
                    <>
                    <Button disabled={(this.state.routeParams.status_terima !== null ? true : false)} raised fill large iconIos="f7:checkmark_alt_circle_fill" onClick={()=>this.$f7router.navigate("/vervalPendaftar/"+this.state.routeParams.calon_peserta_didik_id)}>
                        &nbsp; {(this.state.routeParams.status_terima !== null ? <>Telah diverifikasi</> : <>Verifikasi</>)}
                    </Button>
                    <br/>
                    </>
                    }
                </Block>
                <Row noGap>
                    <Col width="100" tabletWidth="100">
                        <Card>
                            <CardContent>
                                <h3>
                                    KONFIRMASI PENDAFTARAN PESERTA DIDIK BARU
                                </h3>
                                <div variant="caption">
                                    Tanggal {waktu_mulai}
                                </div>
                                <br/>
                                <div variant="body1">
                                    Dengan ini Saya, <b>{this.state.calon_peserta_didik.nama_pengguna}</b> sebagai pendaftar bagi peserta didik atas nama <b>{this.state.calon_peserta_didik.nama} ({this.state.calon_peserta_didik.nik})</b> menyatakan bahwa data dan berkas yang diisi pada formulir pendaftaran peserta didik baru telah diperiksa kebenarannya dan telah sesuai dengan fakta yang ada.
                                </div>
                                <br/>
                                <div variant="body1">
                                    Saya sepenuhnya siap bertanggung jawab apabila di kemudian hari ditemukan ketidaksesuaian antara data yang diisi pada formulir pendaftaran peserta didik baru dengan fakta yang ada, dan Saya siap menerima sanksi moral, sanksi administrasi, dan sanksi hukum sesuai dengan peraturan dan perundang-undangan yang berlaku.
                                </div>
                                <br/>
                                <div variant="body1">
                                    Penanggungjawab
                                </div>
                                <br/>
                                <div variant="body1" style={{fontWeight:'bold'}}>
                                    <b>{this.state.calon_peserta_didik.nama_pengguna}</b>
                                </div>
                                <hr/>
                                {this.state.displayOnly === null &&
                                <i style={{fontSize:'10px'}}>
                                    Keterangan:
                                    <ul>
                                        <li>
                                            Peserta didik yang valid adalah peserta didik yang telah dikonfirmasi pendaftarannya oleh pendaftar
                                        </li>
                                        <li>
                                            Waktu pendaftaran bagi peserta didik baru yang bersangkutan diambil dari tanggal konfirmasi pendaftaran
                                        </li>
                                        <li>
                                            Peserta didik baru yang belum dikonfirmasi sampai tanggal yang telah ditentukan, dianggap batal mendaftarkan diri 
                                        </li>
                                        <li>
                                            Peserta didik baru yang telah dikonfirmasi tidak bisa diedit datanya kembali    
                                        </li>
                                    </ul>
                                </i>
                                }

                                {this.state.displayOnly === null &&
                                <Row>
                                    <Col width="50" style={{padding:'16px'}}>
                                        <Button raised fill onClick={()=>this.simpanKonfirmasi("1")} disabled={this.state.disableButton}>
                                            {this.state.disableButton && <Preloader color="white"></Preloader>} Saya Konfirmasi
                                        </Button>
                                    </Col>
                                    <Col width="50" style={{padding:'16px'}}>
                                        <Button raised fill style={{background:'#aaaaaa'}} onClick={()=>this.simpanKonfirmasi("0")} disabled={this.state.disableButton}>
                                            {this.state.disableButton && <Preloader color="white"></Preloader>} Simpan sebagai Draft
                                        </Button>
                                    </Col>
                                    <Col width="100" style={{padding:'16px'}} style={{display:this.state.tampilTerimaKasih}}>
                                        <Card>
                                            <CardContent>
                                                Terima kasih telah melakukan konfirmasi pendaftaran!
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col width="100" style={{padding:'16px'}} style={{display:this.state.tampilTerimaKasih}}>
                                        <Card>
                                            <CardContent>
                                                <Button raised fill onClick={()=>this.$f7router.navigate("/")}>
                                                    Kembali
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>
                                }
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
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
      validasiBerkas: Actions.validasiBerkas
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
        validasi_berkas: PPDBPesertaDidik.validasi_berkas
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahKonfirmasi));
  