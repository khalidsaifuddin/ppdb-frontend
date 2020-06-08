import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio, Preloader
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

class tambahJalurSekolah extends Component {
    state = {
        error: null,
        loading: false,
        displayOnly: this.$f7route.params['displayOnly'] ? this.$f7route.params['displayOnly'] : null,
        routeParams:{
            pengguna_id: (localStorage.getItem('kode_aplikasi') === 'PPDB' ? JSON.parse(localStorage.getItem('user')).pengguna_id : null),
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            calon_peserta_didik_id: this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null,
            // kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            // id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
            start: 0,
            limit: 10,
            pilihan_sekolah: [{
                jalur: '-'
            }]
        },
        start: 0,
        limit: 10,
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
        objSekolahPilihan: [],
        ppdb_sekolah: {
            rows: [],
            count: 0,
            countAll: 0
        },
        disabledInput: false
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
                            jalur_id: '0',
                            pilihan_sekolah: []
                        },
                        lintang: this.props.calon_peserta_didik.rows[0].lintang,
                        bujur: this.props.calon_peserta_didik.rows[0].bujur
                    },()=>{
                        console.log(this.state.routeParams);

                        //hitung umur
                        console.log(this.state.routeParams.tanggal_lahir);
                        let tanggal_lahir = new Date(this.state.routeParams.tanggal_lahir);
                        let ageDifMs = new Date('2020-07-01 00:00:00') - tanggal_lahir.getTime();
                        // let ageDifMs = Date.now() - tanggal_lahir.getTime();
                        let ageDate = new Date(ageDifMs);
                        let usia = Math.abs(ageDate.getUTCFullYear() - 1970);

                        console.log(usia);
                        
                        this.setState({
                            ...this.state,
                            usia: usia
                        },()=>{
                            console.log*('usia: '+this.state.usia);
                        });
                        //end of hitung umur

                        this.props.getSekolahPilihan(this.state.routeParams).then((result)=>{
                            
                            let arrSekolah = this.state.arrSekolahPilihan;
                            let listSekolah = this.state.listSekolahPilihan;

                            if(this.props.sekolah_pilihan.count > 0){

                                this.props.sekolah_pilihan.rows.map((option)=>{
                            
                                    arrSekolah.push(option.sekolah_id);
                                    listSekolah.push(
                                    {
                                        sekolah_id: option.sekolah_id,
                                        elemental: (<Card>
                                            <CardContent>
                                                <Row>
                                                    <Col width="15" style={{background:"url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                                        <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'100px', minHeight:'100px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                                                    </Col>
                                                    <Col width="55" style={{paddingLeft:'8px', paddingRight:'8px'}}>
                                                        <b style={{color:'green'}}>Sekolah Pilihan {parseInt(arrSekolah.indexOf(option.sekolah_id))+1}</b><br/>
                                                        <b>{option.nama} ({option.npsn})</b><br/>
                                                        {option.alamat}, {option.kecamatan}, {option.kabupaten}, {option.provinsi}<br/>
                                                        {parseInt(option.bentuk_pendidikan_id) === 5 ? 'SD' : (parseInt(option.bentuk_pendidikan_id) === 6 ? 'SMP' : (parseInt(option.bentuk_pendidikan_id) === 13 ? 'SMA' : (parseInt(option.bentuk_pendidikan_id) === 15 ? 'SMK' : '-')))}&nbsp;
                                                        {parseInt(option.status_sekolah) === 1 ? 'Negeri' : 'Swasta'}
                                                    </Col>
                                                    <Col width="15" style={{textAlign:'right'}}>
                                                        Jarak<br/>
                                                        <b style={{fontSize:'25px', color:'#434343'}}>{parseFloat(option.jarak).toFixed(1)}</b> KM
                                                    </Col>
                                                    {this.state.displayOnly === null &&
                                                    <Col width="15">
                                                        <Button style={{marginLeft:'8px'}} raised fill onClick={()=>this.hapusPilihanSekolah(option.sekolah_id)}>
                                                            Hapus
                                                        </Button>
                                                    </Col>
                                                    }
                                                </Row>
                                            </CardContent>
                                        </Card>)
                                    });
                                });
                                
                                this.setState({
                                    routeParams: {
                                        ...this.state.routeParams,
                                        // pilihan_sekolah: this.props.sekolah_pilihan.rows,
                                        jalur_id: this.props.sekolah_pilihan.rows[0].jalur_id,
                                        jalur: this.props.sekolah_pilihan.rows[0].jalur
                                    },
                                    objSekolahPilihan: this.props.sekolah_pilihan.rows,
                                    sekuen_sekolah_pilihan: this.props.sekolah_pilihan.count,
                                    smartSelectJalur: (<ListItem
                                            title={"Jalur Pendaftaran"}
                                            smartSelect
                                            smartSelectParams={{
                                                openIn: 'sheet', 
                                                closeOnSelect: true
                                            }}
                                        >
                                            <select name="jalur_id" defaultValue={this.props.sekolah_pilihan.rows[0].jalur_id} onChange={this.setSelectValue('jalur_id')}>
                                                <option disabled value={"0"}>Mohon Pilih Jalur Terlebih Dahulu ...</option>
                                                <option value={"0100"}>Affirmasi</option>
                                                <option value={"0200"}>Perpindahan Orang Tua</option>
                                                <option value={"0300"}>Minat & Bakat</option>
                                                {/* <option value={"0300"}>Minat Bakat (SMPN 3 Lumajang / SMPN 2 Tempeh)</option> */}
                                                <option value={"0400"}>Zonasi</option>
                                                <option value={"0500"}>Tahfidz</option>
                                            </select>
                                        </ListItem>
                                    )
                                },()=>{
                                    console.log(this.state.arrSekolahPilihan);
                                    console.log(this.state.routeParams);
                                });

                            }else{
                                this.setState({
                                    smartSelectJalur: (<ListItem
                                        title={"Jalur Pendaftaran"}
                                        smartSelect
                                        smartSelectParams={{
                                            openIn: 'sheet', 
                                            closeOnSelect: true
                                        }}
                                    >
                                        <select name="jalur_id" defaultValue={this.state.routeParams.jalur_id} onChange={this.setSelectValue('jalur_id')}>
                                            <option disabled value={"0"}>Mohon Pilih Jalur Terlebih Dahulu ...</option>
                                            <option value={"0100"}>Affirmasi</option>
                                            <option value={"0200"}>Perpindahan Orang Tua</option>
                                            <option value={"0300"}>Minat Bakat (SMPN 3 Lumajang / SMPN 2 Tempeh)</option>
                                            <option value={"0400"}>Zonasi</option>
                                            <option value={"0500"}>Tahfidz</option>
                                        </select>
                                    </ListItem>)
                                });
                            }

                        })
                    })
                });
            }
        });

    }
    
    

    simpan = () => {

        // console.log(this.state.objSekolahPilihan);
        // return true;

        // if(this.state.sekuen_sekolah_pilihan < 3){
        //     this.$f7.dialog.alert('Mohon pilih 3 sekolah!','Peringatan');
        //     return false;
        // }

        if(this.state.arrSekolahPilihan.length < 3){
            this.$f7.dialog.alert('Mohon pilih 3 sekolah!','Peringatan');
            return false;
        }

        this.setState({
            routeParams: {
                ...this.state.routeParams,
                sekolah_asal: null,
                sekolah_pilihan: this.state.arrSekolahPilihan,
                obj_sekolah_pilihan: this.state.objSekolahPilihan
            },
            disabledInput: true
        },()=>{
            // console.log(this.state.routeParams);
            this.props.simpanSekolahPilihan(this.state.routeParams).then((result)=>{
                this.$f7router.navigate('/tambahBerkas/'+this.state.routeParams.calon_peserta_didik_id+"/"+this.state.routeParams.jalur_id);
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
            // console.log(this.state.arrSekolahPilihan);
            // console.log(this.state);
            for (let index = 0; index < this.state.objSekolahPilihan.length; index++) {
                const element = this.state.objSekolahPilihan[index];

                this.state.objSekolahPilihan[index].jalur_id = this.state.routeParams.jalur_id;
                
            }

            console.log(this.state.objSekolahPilihan);
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

    tambahSekolahPilihan = () => {

        if(this.state.routeParams.jalur_id === '0'){
            this.$f7.dialog.alert('Mohon pilih jalur pendaftaran terlebih dahulu!','Peringatan');
            return false;
        }


        if(parseInt(this.state.arrSekolahPilihan.length) < 3){
        // if(parseInt(this.state.sekuen_sekolah_pilihan) < 3){
            
            this.setState({
                routeParams: {
                    ...this.state.routeParams,
                    searchText: 'apcbdfd',
                    kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
                    id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi')
                    // bentuk_pendidikan_id: (this.state.usia <= 12 ? '5' : '5-6')
                }
            },()=>{
                this.props.getPPDBSekolah(this.state.routeParams).then((result)=>{

                    this.setState({
                        // sekuen_sekolah_pilihan: (parseInt(this.state.sekuen_sekolah_pilihan)+1),
                        sheetOpened: true,
                        ppdb_sekolah: this.props.ppdb_sekolah
                    },()=>{
                        // console.log(this.state.sekuen_sekolah_pilihan);
                    });
                
                });
            });

        }else{
            // console.log('sudah 3');
            this.$f7.dialog.alert('Jumlah sekolah maksimal yang bisa dipilih adalah 3 sekolah!','Peringatan');
        }

    }

    cariSekolah = () => {
        this.setState({
            routeParamsCariSekolah: {
                ...this.state.routeParamsCariSekolah,
                lintang: this.state.lintang,
                bujur: this.state.bujur,
                start:0
            }
        },()=>{

            this.props.getPPDBSekolah(this.state.routeParamsCariSekolah).then((result)=>{
                this.setState({
                    ...this.state,
                    ppdb_sekolah: this.props.ppdb_sekolah
                })
            });

        });
    }

    ketikCariSekolah = (e) => {
        this.setState({
            routeParamsCariSekolah: {
                searchText: e.currentTarget.value,
                status_sekolah: 1,
                // bentuk_pendidikan_id: (this.state.usia <= 12 ? '5' : '5-6'),
                kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
                id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi')
            }
        });
    }

    klikPilihSekolah = (sekolah_id, nama, npsn, alamat, bentuk_pendidikan_id, status_sekolah, jarak) => {

        let ketemu_sama = 0;

        this.state.arrSekolahPilihan.map((option)=>{
            if(option === sekolah_id){
                // this.$f7.dialog.alert('Mohon pilih sekolah yang berdeda dengan pilihan sebelumnya!','Peringatan');
                // return false;
                ketemu_sama++;
            }
        });

        if(ketemu_sama > 0){
            this.$f7.dialog.alert('Mohon pilih sekolah yang berbeda dengan pilihan sebelumnya!','Peringatan');

            this.setState({
                // sekuen_sekolah_pilihan: parseInt(this.state.sekuen_sekolah_pilihan)-1
            },()=>{
                return false;
            });
        }else{

            let objSekolahPilihan = {
                sekolah_id: sekolah_id,
                nama: nama,
                urut_pilihan: (parseInt(this.state.arrSekolahPilihan.length)+1)
            };

            let arrSekolah = this.state.arrSekolahPilihan;
            let listSekolah = this.state.listSekolahPilihan;
    
            arrSekolah.push(sekolah_id);
            listSekolah.push(
            {
                sekolah_id: sekolah_id,
                elemental: (<Card>
                    <CardContent>
                        <Row>
                            <Col width="15" style={{background:"url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                <img src={"http://foto.data.kemdikbud.go.id/getImage/" + npsn + "/1.jpg"} style={{maxHeight:'100px', minHeight:'100px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                            </Col>
                            <Col width="55" style={{paddingLeft:'8px', paddingRight:'8px'}}>
                                <b style={{color:'green'}}>Sekolah Pilihan {parseInt(arrSekolah.indexOf(sekolah_id))+1}</b><br/>
                                <b>{nama} ({npsn})</b><br/>
                                {alamat}<br/>
                                {parseInt(bentuk_pendidikan_id) === 5 ? 'SD' : (parseInt(bentuk_pendidikan_id) === 6 ? 'SMP' : (parseInt(bentuk_pendidikan_id) === 13 ? 'SMA' : (parseInt(bentuk_pendidikan_id) === 15 ? 'SMK' : '-')))}&nbsp;
                                {parseInt(status_sekolah) === 1 ? 'Negeri' : 'Swasta'}
                            </Col>
                            <Col width="15" style={{textAlign:'right'}}>
                                Jarak<br/>
                                <b style={{fontSize:'25px', color:'#434343'}}>{parseFloat(jarak).toFixed(1)}</b> KM
                            </Col>
                            <Col width="15">
                                <Button raised fill onClick={()=>this.hapusPilihanSekolah(sekolah_id)}>
                                    Hapus
                                </Button>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>)
            });
    
            this.setState({
                arrSekolahPilihan: arrSekolah,
                listSekolahPilihan: listSekolah,
                sheetOpened: false,
                sekuen_sekolah_pilihan: parseInt(this.state.sekuen_sekolah_pilihan)-1,
                objSekolahPilihan: [
                    ...this.state.objSekolahPilihan,
                    objSekolahPilihan
                ],
                displaySekolahPilihan: {
                    ...this.state.displaySekolahPilihan,
                    [sekolah_id] : 'block'
                }
            },()=>{
                console.log(this.state);
            });
        }

    }

    hapusPilihanSekolah = (sekolah_id) => {
        var filtered = this.state.arrSekolahPilihan.filter(function(value, index, arr){
            return value !== sekolah_id;
        });
        
        var filteredObj = this.state.objSekolahPilihan.filter(function(value, index, arr){
            return value.sekolah_id !== sekolah_id;
        });
        
        var filteredDisplay = this.state.listSekolahPilihan.filter(function(value, index, arr){
            return value.sekolah_id !== sekolah_id;
        });

        this.setState({
            arrSekolahPilihan: filtered,
            listSekolahPilihan: filteredDisplay,
            objSekolahPilihan: filteredObj,
            sekuen_sekolah_pilihan: parseInt(this.state.sekuen_sekolah_pilihan-1),
            routeParamsHapus: {
                sekolah_id: sekolah_id,
                calon_peserta_didik_id: this.state.routeParams.calon_peserta_didik_id
            }
        },()=>{
            console.log(this.state);

            this.props.hapusSekolahPilihan(this.state.routeParamsHapus);
        });
    }

    tutupSheet = () => {
        this.setState({
            sheetOpened: false
        });
    }

    muatSelanjutnya = () => {
        this.setState({
            routeParamsCariSekolah: {
                // ...this.state.routeParams,
                searchText: this.state.routeParamsCariSekolah.searchText,
                status_sekolah: 1,
                // bentuk_pendidikan_id: (this.state.usia <= 12 ? '5' : '5-6'),
                kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
                id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
                start: parseInt(this.state.start)+parseInt(this.state.limit),
                lintang: this.state.lintang,
                bujur: this.state.bujur
            },
            start: parseInt(this.state.start)+parseInt(this.state.limit)
        }, ()=> {
            // this.props.getPesertaDidik(this.state.routeParams).then((result)=> {
            //     this.setState({
            //         peserta_didik: {
            //             ...this.state.peserta_didik,
            //             rows: [
            //                 ...this.state.peserta_didik.rows,
            //                 ...this.props.peserta_didik.rows,
            //             ]
            //         }   
            //     });
            // });
            this.props.getPPDBSekolah(this.state.routeParamsCariSekolah).then((result)=>{
                this.setState({
                    ppdb_sekolah: {
                        ...this.state.ppdb_sekolah,
                        rows: [
                            ...this.state.ppdb_sekolah.rows,
                            ...this.props.ppdb_sekolah.rows
                        ]
                    }
                })
            });
        });
      }

    render()
    {
        return (
            <Page name="tambahJalurSekolah" hideBarsOnScroll>
                <Navbar sliding={false}>
                {/* <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}> */}
                    <NavTitle sliding>{this.state.displayOnly === null ? <>Tambah Peserta Didik</> : this.state.routeParams.nama}</NavTitle>
                    <NavTitleLarge>
                        {this.state.displayOnly === null ? <>Tambah Peserta Didik</> : this.state.routeParams.nama}
                    </NavTitleLarge>
                </Navbar>
                {/* <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '70px', marginBottom: '8px'}}>
                    <Button style={{borderRadius:'20px 50px 50px 20px'}}>Identitas Peserta Didik</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}} tabLinkActive>Jalur dan Pilihan Sekolah</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Kelengkapan Berkas</Button>
                    <Button style={{borderRadius:'0px 0px 0px 0px'}}>Konfirmasi</Button>
                </Segmented> */}
                <Block className="pageWithTitle">
                    <Segmented className="steps" raised>
                        <Button onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+(this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null)+(this.state.displayOnly === null ? '' : '/displayOnly'))}>Identitas Peserta Didik</Button>
                        <Button tabLinkActive>Jalur dan Pilihan Sekolah</Button>
                        <Button disabled={(this.state.displayOnly === null ? true : false)} onClick={()=>this.$f7router.navigate("/tambahBerkas/"+(this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null)+"/"+this.state.routeParams.jalur_id+"/displayOnly")}>Kelengkapan Berkas</Button>
                        <Button disabled={(this.state.displayOnly === null ? true : false)} onClick={()=>this.$f7router.navigate("/tambahKonfirmasi/"+(this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null)+"/displayOnly")}>Konfirmasi</Button>
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
                            {/* <CardHeader>
                                Jalur Pendaftaran
                            </CardHeader> */}
                            <CardContent>
                                {this.state.displayOnly === null &&
                                <List>
                                {this.state.smartSelectJalur}
                                </List>
                                }
                                {this.state.displayOnly !== null &&
                                <h1 style={{marginTop:'0px', marginBottom:'0px'}}>Jalur {this.state.routeParams.jalur}</h1>
                                }
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="100">
                        <Card>
                            <CardHeader>
                                Pilihan Sekolah
                            </CardHeader>
                            <CardContent>
                                {this.state.displayOnly === null &&
                                <Button raised fill large style={{width:'100%', maxWidth:'250px', margin:'auto'}} onClick={this.tambahSekolahPilihan}>
                                    Tambah Sekolah Pilihan
                                </Button>
                                }
                                <div style={{borderTop:'1px solid #eee', marginTop:'8px'}}>
                                    {/* <List>

                                    </List> */}
                                    {this.state.listSekolahPilihan.map((option)=>{
                                        return option.elemental;
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </Col>
                    {this.state.displayOnly === null &&
                    <Col width="100" style={{padding:'8px', marginBottom:'70px'}}>
                        <Button disabled={this.state.disabledInput} raised fill large style={{width:'100%', maxWidth:'5   00px', margin:'auto', marginBottom:'20px'}} onClick={this.simpan}>
                            {this.state.disabledInput && <Preloader color="white"></Preloader>} Simpan dan Lanjutkan
                        </Button>
                    </Col>
                    }
                </Row>
                <Sheet backdrop opened={this.state.sheetOpened} className="demo-sheet" push style={{height:'70%'}}>
                <Toolbar>
                    <div className="left">
                        <span>Menampilkan sekolah jenjang SD dan SMP</span>
                        {/* <span>Menampilkan sekolah jenjang {(this.state.usia <= 12 ? 'SD' : 'SD dan SMP')}</span> */}
                    </div>
                    <div className="right">
                        <Link sheetClose onClick={this.tutupSheet}>Tutup</Link>
                    </div>
                </Toolbar>
                <PageContent>
                <Searchbar
                        className="searchbar-cari-sekolah"
                        placeholder="Cari sekolah..."
                        onSubmit={this.cariSekolah}
                        customSearch={true}
                        onChange={this.ketikCariSekolah}
                    ></Searchbar>
                    <Block strong style={{marginTop:'0px', marginBottom:'8px'}}>
                        Menampilkan {this.state.ppdb_sekolah.countAll ? this.state.ppdb_sekolah.countAll : '0'} hasil pencarian
                    </Block>
                    {this.state.ppdb_sekolah.rows.map((option)=>{
                        return (
                            <Card>
                                <CardContent>
                                    <Row>
                                        <Col width="20" style={{background:"url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                            <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'100px', minHeight:'100px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                                        </Col>
                                        <Col width="50">
                                            <b>{option.nama} ({option.npsn})</b><br/>
                                            {option.alamat_jalan}, {option.kecamatan}, {option.kabupaten}, {option.provinsi}<br/>
                                            {parseInt(option.bentuk_pendidikan_id) === 5 ? 'SD' : (parseInt(option.bentuk_pendidikan_id) === 6 ? 'SMP' : (parseInt(option.bentuk_pendidikan_id) === 13 ? 'SMA' : (parseInt(option.bentuk_pendidikan_id) === 15 ? 'SMK' : '-')))}&nbsp;
                                            {parseInt(option.status_sekolah) === 1 ? 'Negeri' : 'Swasta'}
                                        </Col>
                                        <Col width="20" style={{textAlign:'right'}}>
                                            Jarak<br/>
                                            <b style={{fontSize:'25px', color:'#434343'}}>{parseFloat(option.jarak).toFixed(1)}</b> KM
                                        </Col>
                                        <Col width="10" style={{textAlign:'right'}}>
                                            <Radio 
                                                // style={{marginTop:'15px'}} 
                                                name={"pilih-sekolah"} 
                                                value={option.sekolah_id} 
                                                // slot="media"
                                                onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                                            />
                                        </Col>
                                    </Row>
                                </CardContent>
                            </Card>
                        )
                    })}
                    {this.props.ppdb_sekolah.count > 1 &&
                    <Block strong style={{marginTop:'8px', marginBottom:'0px'}}>
                        <Button raised fill color="gray" onClick={this.muatSelanjutnya}>Muat Hasil Lainnya</Button>
                    </Block>
                    }
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
      simpanSekolahPilihan: Actions.simpanSekolahPilihan,
      getSekolahPilihan: Actions.getSekolahPilihan,
      hapusSekolahPilihan: Actions.hapusSekolahPilihan
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        mst_wilayah: Ref.mst_wilayah,
        calon_peserta_didik: PPDBPesertaDidik.calon_peserta_didik,
        sekolah_pilihan: PPDBPesertaDidik.sekolah_pilihan
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahJalurSekolah));
  