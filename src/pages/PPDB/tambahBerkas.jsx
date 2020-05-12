import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import Dropzone from 'react-dropzone';

class tambahBerkas extends Component {
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
            jalur_id: this.$f7route.params['jalur_id'] ? this.$f7route.params['jalur_id'] : null,
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
        berkas_calon: [],
        sekuen_sekolah_pilihan: 0,
        arrSekolahPilihan: [],
        listSekolahPilihan: [],
        sheetOpened: false,
        displaySekolahPilihan: {},
        file_gambar_pas_foto: '',
        gambar_pas_foto: '',
        file_gambar_kk: '',
        gambar_kk: '',
        file_gambar_kip: '',
        gambar_kip: '',
        file_gambar_surat_tidak_mampu: '',
        gambar_surat_tidak_mampu: '',
        file_gambar_surat_pindah: '',
        gambar_surat_pindah: '',
        file_gambar_piagam: '',
        gambar_piagam: '',
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
                            ...this.props.calon_peserta_didik.rows[0]
                        }
                    },()=>{
                        // console.log(this.state.routeParams);
                        this.props.getBerkasCalon(this.state.routeParams).then((result)=>{

                            let arrJenis = {};

                            this.props.berkas_calon.rows.map((option)=>{

                                switch (parseInt(option.jenis_berkas_id)) {
                                    case 8:
                                        arrJenis.file_gambar_pas_foto = option.nama_file;
                                        arrJenis.gambar_pas_foto = option.nama_file.split("/")[3];
                                        break;
                                    case 1:
                                        arrJenis.file_gambar_kk = option.nama_file;
                                        arrJenis.gambar_kk = option.nama_file.split("/")[3];
                                        break;
                                    case 7:
                                        arrJenis.file_gambar_kip = option.nama_file;
                                        arrJenis.gambar_kip = option.nama_file.split("/")[3];
                                        break;
                                    case 9:
                                        arrJenis.file_gambar_surat_tidak_mampu = option.nama_file;
                                        arrJenis.gambar_surat_tidak_mampu = option.nama_file.split("/")[3];
                                        break;
                                    case 10:
                                        arrJenis.file_gambar_surat_pindah = option.nama_file;
                                        arrJenis.gambar_surat_pindah = option.nama_file.split("/")[3];
                                        break;
                                    case 5:
                                        arrJenis.file_gambar_piagam = option.nama_file;
                                        arrJenis.gambar_piagam = option.nama_file.split("/")[3];
                                        break;
                                    default:
                                        break;
                                }

                                // this.setState({
                                //     file_gambar_pas_foto: (parseInt(option.jenis_berkas_id) === 8 ? option.filename : ''),
                                //     gambar_pas_foto: (parseInt(option.jenis_berkas_id) === 8 ? option.filename.split("/")[3] : ''),
                                //     file_gambar_kk: (parseInt(option.jenis_berkas_id) === 1 ? option.filename : ''),
                                //     gambar_kk: (parseInt(option.jenis_berkas_id) === 1 ? option.filename.split("/")[3] : ''),
                                //     file_gambar_kip: (parseInt(option.jenis_berkas_id) === 7 ? option.filename : ''),
                                //     gambar_kip: (parseInt(option.jenis_berkas_id) === 7 ? option.filename.split("/")[3] : ''),
                                //     file_gambar_surat_tidak_mampu: (parseInt(option.jenis_berkas_id) === 9 ? option.filename : ''),
                                //     gambar_surat_tidak_mampu: (parseInt(option.jenis_berkas_id) === 9 ? option.filename.split("/")[3] : ''),
                                //     file_gambar_surat_pindah: (parseInt(option.jenis_berkas_id) === 10 ? option.filename : ''),
                                //     gambar_surat_pindah: (parseInt(option.jenis_berkas_id) === 10 ? option.filename.split("/")[3] : ''),
                                //     file_gambar_piagam: (parseInt(option.jenis_berkas_id) === 5 ? option.filename : ''),
                                //     gambar_piagam: (parseInt(option.jenis_berkas_id) === 5 ? option.filename.split("/")[3] : ''),
                                //     berkas_calon: [
                                //         ...this.state.berkas_calon,
                                //         option
                                //     ]
                                // });
                            });

                            console.log(arrJenis);

                            this.setState({
                                ...this.state,
                                ...arrJenis,
                                berkas_calon: this.props.berkas_calon.rows
                            },()=>{
                                console.log(this.state);
                            });
                        });
                    });
                });
            }
        });

    }
    
    

    simpan = () => {

        this.setState({
            routeParams: {
                // ...this.state.routeParams,
                calon_peserta_didik_id: this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null,
                berkas_calon: JSON.stringify(this.state.berkas_calon)
            }
        },()=>{
            // console.log(this.state.routeParams);
            this.props.simpanBerkasCalon(this.state.routeParams).then((result)=>{
                this.$f7router.navigate('/tambahKonfirmasi/'+this.state.routeParams.calon_peserta_didik_id);
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

    acceptedFile = (jenis) => (file) => {
        console.log(jenis);

        if(file[0].size >= 2000000){ //2Mb
            this.$f7.dialog.alert('Ukuran gambar tidak boleh melebihi 2MB!', 'Peringatan');
            return true;
        }

        if(file[0].name.substr(file[0].name.length - 3) === 'jpg' || file[0].name.substr(file[0].name.length - 4) === 'jpeg' || file[0].name.substr(file[0].name.length - 3) === 'png'){

            this.setState({
                [jenis]: file[0].name
            },()=>{
                //uploading
                // const formData = new FormData();

                // formData.append('avatar',file[0]);
                console.log(localStorage.getItem('api_base') + '/api/CalonPesertaDidik/upload');
                return new Promise(
                    (resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('POST', localStorage.getItem('api_base') + '/api/CalonPesertaDidik/upload');
                        xhr.onload = this.uploadBerhasil;
                        xhr.onerror = this.uploadGagal;
                        const data = new FormData();
                        data.append('image', file[0]);
                        // data.append('pengguna_id', JSON.parse(localStorage.getItem('user')).pengguna_id);
                        data.append('jenis', 'file_'+jenis);
                        xhr.send(data);
                    }
                );
            });

        }else{
            this.$f7.dialog.alert('Hanya dapat mengupload file gambar dengan format .jpg atau .png!', 'Peringatan');
            return true;
        }

    }

    uploadBerhasil = (xhr) => {
        console.log(JSON.parse(xhr.currentTarget.responseText));
        let response = JSON.parse(xhr.currentTarget.responseText);
        if(response.msg == 'sukses'){
            
            let arrBerkas = {
                berkas_calon_id: null,
                calon_peserta_didik_id: this.state.routeParams.calon_peserta_didik_id,
                jenis_berkas_id: response.jenis_berkas_id,
                nama_file: response.filename,
                keterangan: ''
            };

            this.setState({
                [response.jenis]: response.filename,
                loading: false,
                berkas_calon: [
                    ...this.state.berkas_calon,
                    arrBerkas
                ]
            },()=>{
                console.log(this.state);
            });
        }
    }

    uploadGagal = (xhr) => {
        this.$f7.dialog.alert('Ada kesalahan pada sistema atau jaringan Anda, mohon cek kembali sebelum melakukan upload ulang', 'Mohon maaf');
    }

    render()
    {
        return (
            <Page name="tambahBerkas" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Tambah Peserta Didik</NavTitle>
                    <NavTitleLarge>
                        Tambah Peserta Didik
                    </NavTitleLarge>
                </Navbar>
                {/* <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '70px', marginBottom: '8px'}}>
                    <Button style={{borderRadius:'20px 50px 50px 20px'}}>Identitas Peserta Didik</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Jalur dan Pilihan Sekolah</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}} tabLinkActive>Kelengkapan Berkas</Button>
                    <Button style={{borderRadius:'0px 0px 0px 0px'}}>Konfirmasi</Button>
                </Segmented> */}
                <Block className="pageWithTitle">
                    <Segmented className="steps" raised>
                        <Button onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/"+(this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null))}>Identitas Peserta Didik</Button>
                        <Button onClick={()=>this.$f7router.navigate("/tambahJalurSekolah/"+(this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null))}>Jalur dan Pilihan Sekolah</Button>
                        <Button tabLinkActive>Kelengkapan Berkas</Button>
                        <Button disabled>Konfirmasi</Button>
                    </Segmented>
                </Block>

                <Row noGap>
                    {/* {this.state.routeParams.jalur_id === '0100' && this.state.routeParams.jalur_id === '0200' && this.state.routeParams.jalur_id === '0400' && */}
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardHeader>
                                Pas Foto
                            </CardHeader>
                            <CardContent>
                                <Dropzone className="droping" onDrop={this.acceptedFile('gambar_pas_foto')}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()} style={{height:'250px',border:'4px dashed #ccc', textAlign: 'center', paddingTop:(this.state.file_gambar_pas_foto !== '' ? '16px' : '10%'), paddingLeft:'16px', paddingRight:'16px'}}>
                                                <input {...getInputProps()} />
                                                {this.state.file_gambar_pas_foto === '' &&
                                                <i slot="media" className="f7-icons" style={{fontSize:'60px', color:'#434343'}}>square_arrow_up</i>
                                                }
                                                {this.state.file_gambar_pas_foto !== '' &&
                                                <>
                                                <img style={{height:'150px'}} src={localStorage.getItem('api_base')+this.state.file_gambar_pas_foto} />
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_pas_foto === '' &&
                                                <>
                                                <p>Tarik dan seret gambar pas foto Anda ke sini, atau klik/Sentuh untuk cari gambar</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Ukuran maksimal berkas adalah 2MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_pas_foto !== '' && this.state.file_gambar_pas_foto === '' &&
                                                <>
                                                <p style={{fontSize:'20px'}}>{this.state.gambar_pas_foto}</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </CardContent>
                        </Card>
                    </Col>
                    {/* // } */}
                    {this.state.routeParams.jalur_id === '0100' &&
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardHeader>
                                Kartu Keluarga (KK)
                            </CardHeader>
                            <CardContent>
                                <Dropzone className="droping" onDrop={this.acceptedFile('gambar_kk')}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()} style={{height:'250px',border:'4px dashed #ccc', textAlign: 'center', paddingTop:(this.state.file_gambar_kk !== '' ? '16px' : '10%'), paddingLeft:'16px', paddingRight:'16px'}}>
                                                <input {...getInputProps()} />
                                                {this.state.file_gambar_kk === '' &&
                                                <i slot="media" className="f7-icons" style={{fontSize:'60px', color:'#434343'}}>square_arrow_up</i>
                                                }
                                                {this.state.file_gambar_kk !== '' &&
                                                <>
                                                <img style={{height:'150px'}} src={localStorage.getItem('api_base')+this.state.file_gambar_kk} />
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_kk === '' &&
                                                <>
                                                <p>Tarik dan seret gambar KK Anda ke sini, atau klik/Sentuh untuk cari gambar</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Ukuran maksimal berkas adalah 2MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_kk !== '' && this.state.file_gambar_kk === '' &&
                                                <>
                                                <p style={{fontSize:'20px'}}>{this.state.gambar_kk}</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </CardContent>
                        </Card>
                    </Col>
                    }
                    {this.state.routeParams.jalur_id === '0100' &&
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardHeader>
                                KIP/PKH
                            </CardHeader>
                            <CardContent>
                                <Dropzone className="droping" onDrop={this.acceptedFile('gambar_kip')}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()} style={{height:'250px',border:'4px dashed #ccc', textAlign: 'center', paddingTop:(this.state.file_gambar_kip !== '' ? '16px' : '10%'), paddingLeft:'16px', paddingRight:'16px'}}>
                                                <input {...getInputProps()} />
                                                {this.state.file_gambar_kip === '' &&
                                                <i slot="media" className="f7-icons" style={{fontSize:'60px', color:'#434343'}}>square_arrow_up</i>
                                                }
                                                {this.state.file_gambar_kip !== '' &&
                                                <>
                                                <img style={{height:'150px'}} src={localStorage.getItem('api_base')+this.state.file_gambar_kip} />
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_kip === '' &&
                                                <>
                                                <p>Tarik dan seret gambar KIP/PKH Anda ke sini, atau klik/Sentuh untuk cari gambar</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Ukuran maksimal berkas adalah 2MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_kip !== '' && this.state.file_gambar_kip === '' &&
                                                <>
                                                <p style={{fontSize:'20px'}}>{this.state.gambar_kip}</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </CardContent>
                        </Card>
                    </Col>
                    }
                    {this.state.routeParams.jalur_id === '0100' &&
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardHeader>
                                Surat Pernyataan Tidak Mampu
                            </CardHeader>
                            <CardContent>
                                <Dropzone className="droping" onDrop={this.acceptedFile('gambar_surat_tidak_mampu')}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()} style={{height:'250px',border:'4px dashed #ccc', textAlign: 'center', paddingTop:(this.state.file_gambar_surat_tidak_mampu !== '' ? '16px' : '10%'), paddingLeft:'16px', paddingRight:'16px'}}>
                                                <input {...getInputProps()} />
                                                {this.state.file_gambar_surat_tidak_mampu === '' &&
                                                <i slot="media" className="f7-icons" style={{fontSize:'60px', color:'#434343'}}>square_arrow_up</i>
                                                }
                                                {this.state.file_gambar_surat_tidak_mampu !== '' &&
                                                <>
                                                <img style={{height:'150px'}} src={localStorage.getItem('api_base')+this.state.file_gambar_surat_tidak_mampu} />
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_surat_tidak_mampu === '' &&
                                                <>
                                                <p>Tarik dan seret gambar Surat Pernyataan Tidak Mampu Anda ke sini, atau klik/Sentuh untuk cari gambar</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Ukuran maksimal berkas adalah 2MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_surat_tidak_mampu !== '' && this.state.file_gambar_surat_tidak_mampu === '' &&
                                                <>
                                                <p style={{fontSize:'20px'}}>{this.state.gambar_surat_tidak_mampu}</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </CardContent>
                        </Card>
                    </Col>
                    }
                    {this.state.routeParams.jalur_id === '0200' &&
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardHeader>
                                Surat Pindah Tugas Orang tua/wali
                            </CardHeader>
                            <CardContent>
                                <Dropzone className="droping" onDrop={this.acceptedFile('gambar_surat_pindah')}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()} style={{height:'250px',border:'4px dashed #ccc', textAlign: 'center', paddingTop:(this.state.file_gambar_surat_pindah !== '' ? '16px' : '10%'), paddingLeft:'16px', paddingRight:'16px'}}>
                                                <input {...getInputProps()} />
                                                {this.state.file_gambar_surat_pindah === '' &&
                                                <i slot="media" className="f7-icons" style={{fontSize:'60px', color:'#434343'}}>square_arrow_up</i>
                                                }
                                                {this.state.file_gambar_surat_pindah !== '' &&
                                                <>
                                                <img style={{height:'150px'}} src={localStorage.getItem('api_base')+this.state.file_gambar_surat_pindah} />
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_surat_pindah === '' &&
                                                <>
                                                <p>Tarik dan seret gambar Surat Pindah Tugas Orang tua/wali Anda ke sini, atau klik/Sentuh untuk cari gambar</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Ukuran maksimal berkas adalah 2MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_surat_pindah !== '' && this.state.file_gambar_surat_pindah === '' &&
                                                <>
                                                <p style={{fontSize:'20px'}}>{this.state.gambar_surat_pindah}</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </CardContent>
                        </Card>
                    </Col>
                    }
                    {this.state.routeParams.jalur_id === '0500' && this.state.routeParams.jalur_id === '0300' &&
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardHeader>
                                Piagam/Sertifikat Prestasi
                            </CardHeader>
                            <CardContent>
                                <Dropzone className="droping" onDrop={this.acceptedFile('gambar_piagam')}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()} style={{height:'250px',border:'4px dashed #ccc', textAlign: 'center', paddingTop:(this.state.file_gambar_piagam !== '' ? '16px' : '10%'), paddingLeft:'16px', paddingRight:'16px'}}>
                                                <input {...getInputProps()} />
                                                {this.state.file_gambar_piagam === '' &&
                                                <i slot="media" className="f7-icons" style={{fontSize:'60px', color:'#434343'}}>square_arrow_up</i>
                                                }
                                                {this.state.file_gambar_piagam !== '' &&
                                                <>
                                                <img style={{height:'150px'}} src={localStorage.getItem('api_base')+this.state.file_gambar_piagam} />
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_piagam === '' &&
                                                <>
                                                <p>Tarik dan seret gambar Piagam/Sertifikat Prestasi Anda ke sini, atau klik/Sentuh untuk cari gambar</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Ukuran maksimal berkas adalah 2MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                                {this.state.gambar_piagam !== '' && this.state.file_gambar_piagam === '' &&
                                                <>
                                                <p style={{fontSize:'20px'}}>{this.state.gambar_piagam}</p>
                                                <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                                </>
                                                }
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </CardContent>
                        </Card>
                    </Col>
                    }
                    <Col width="100" style={{padding:'8px', marginBottom:'70px'}}>
                        <Button raised fill large style={{width:'100%', maxWidth:'5   00px', margin:'auto', marginBottom:'20px'}} onClick={this.simpan}>
                            Simpan dan Lanjutkan
                        </Button>
                    </Col>
                </Row>
                <Sheet opened={this.state.sheetOpened} className="demo-sheet" push style={{height:'50%'}}>
                <Toolbar>
                    <div className="left"></div>
                    <div className="right">
                    <Link sheetClose>Tutup</Link>
                    </div>
                </Toolbar>
                <PageContent>
                    
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
      simpanBerkasCalon: Actions.simpanBerkasCalon,
      getBerkasCalon: Actions.getBerkasCalon
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        mst_wilayah: Ref.mst_wilayah,
        calon_peserta_didik: PPDBPesertaDidik.calon_peserta_didik,
        berkas_calon: PPDBPesertaDidik.berkas_calon
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahBerkas));
  