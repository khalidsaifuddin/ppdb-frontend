import React, { Component } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Link,
  Segmented,
  Button,
  CardContent,
  Row,
  Col,
  Card,
  CardHeader,
  List,
  ListInput,
  ListItem,
  Searchbar,
  Sheet,
  Toolbar,
  PageContent,
  Radio,
  Block,
  AccordionContent
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
  constructor(props) {
    super(props);
    
    this.state = {
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
        kode_wilayah_provinsi: null,
        kode_wilayah_kabupaten: null,
        kode_wilayah_kecamatan: null,
        alamat_tempat_tinggal: null,
        nama_ayah: null,
        nama_ibu: null,
        nama_wali: null,
        calon_peserta_didik_id: (this.$f7route.params['peserta_didik_id'] !== "null" ? (this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null) : null),
      },
      sekolah_terpilih: {
        sekolah_id: null,
        nama: null,
      },
      provinsi: {
        rows: [],
        count: 0,
      },
      kabupaten: {
        rows: [],
        count: 0,
      },
      kecamatan: {
        rows: [],
        count: 0,
      },
      smartSelectJenisKelamin: (<></>),
      disabledInput: true,
      labelNik: 'NIK belum pernah didaftarkan sebelumnya',
      labelNISN: 'NISN belum pernah didaftarkan sebelumnya',
      lng: 113.141552,
      lat: -8.109038,
      zoom: 10,
      map_besar: (<div></div>),
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
    'Desember',
  ]

  componentDidMount = () => {
    let arrURL = this.$f7route.url.split("#");

    let lintang = -8.109038;
    let bujur = 113.141552;

    if(arrURL.length > 1) {
      let linbuj = arrURL[1].split(",");
      lintang = linbuj[0];
      bujur = linbuj[1];
    }

    localStorage.setItem('current_url', this.$f7route.url);

    this.setState({
      routeParams: {
        ...this.state.routeParams,
        lintang: lintang,
        bujur: bujur,
      },
      lintang: lintang,
      bujur: bujur,
      routeParamsWilayah: {
        ...this.state.routeParamsWilayah,
        id_level_wilayah: 1,
      }
    }, ()=> {
      this.props.getMstWilayah(this.state.routeParamsWilayah).then((result)=> {
        this.setState({
          provinsi: this.props.mst_wilayah,
        });
      });

      if(this.state.routeParams.calon_peserta_didik_id && this.state.routeParams.calon_peserta_didik_id !== "null") {

        this.props.getCalonPesertaDidik(this.state.routeParams).then((result)=> {
          this.setState({
            routeParams: {
              ...this.state.routeParams,
              ...this.props.calon_peserta_didik.rows[0],
              lintang: (this.state.lintang ? this.state.lintang : this.props.calon_peserta_didik.rows[0].lintang),
              bujur: (this.state.bujur ? this.state.bujur : this.props.calon_peserta_didik.rows[0].bujur),
            },
            disabledInput: false,
            sekolah_terpilih: this.props.calon_peserta_didik.rows[0].sekolah_asal
          }, ()=> {
            // console.log(this.state.sekolah_terpilih);
            // console.log(this.state.routeParams.kode_wilayah_kabupaten);
            // console.log(this.state.routeParams.kode_wilayah_provinsi);
            this.setState({
              routeParamsKabupaten:{
                mst_kode_wilayah: this.state.routeParams.kode_wilayah_provinsi
              },
              routeParamsKecamatan:{
                mst_kode_wilayah: this.state.routeParams.kode_wilayah_kabupaten
              }
            },()=>{
              this.props.getMstWilayah(this.state.routeParamsKabupaten).then((result)=>{
                this.setState({
                  kabupaten: this.props.mst_wilayah
                },()=>{
                  this.props.getMstWilayah(this.state.routeParamsKecamatan).then((result)=>{
                    this.setState({
                      kecamatan: this.props.mst_wilayah
                    });
                  });
                });
              });
            });

          });
        });

      } else {

        this.setState({
          ...this.state
        }, ()=> {
          // console.log(this.state.routeParams);
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
        searchText: e.currentTarget.value,
      }
    });
  }

  klikPilihSekolah = (sekolah_id, nama, npsn, alamat) => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        asal_sekolah_id: sekolah_id,
      },
      sekolah_terpilih: {
        sekolah_id: sekolah_id,
        nama: nama,
        npsn: npsn,
        alamat: alamat,
      }
    },()=>{
      console.log('sekolah_id')
    });
  }

  simpan = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        sekolah_asal: null,
      }
    }, ()=> {
      if(this.state.routeParams.nama === null || this.state.routeParams.nik === null || this.state.routeParams.tempat_lahir === null || this.state.routeParams.tanggal_lahir === null) {
        this.$f7.dialog.alert('Nama/NISN/tempat dan tanggal lahir tidak boleh kosong!','Peringatan');
        return false;
      }
      
      if(this.state.routeParams.kode_wilayah_provinsi === null || this.state.routeParams.kode_wilayah_kabupaten === null || this.state.routeParams.kode_wilayah_kecamatan === null || this.state.routeParams.alamat_tempat_tinggal === null) {
        this.$f7.dialog.alert('Alamat tidak boleh kosong!','Peringatan');
        return false;
      }
      
      if(this.state.routeParams.orang_tua_utama === 'ayah' && this.state.routeParams.nama_ayah === null) {
        this.$f7.dialog.alert('Nama ayah tidak boleh kosong!','Peringatan');
        return false;

      } else if(this.state.routeParams.orang_tua_utama === 'ibu' && this.state.routeParams.nama_ibu === null) {
        this.$f7.dialog.alert('Nama ibu tidak boleh kosong!','Peringatan');
        return false;

      } else if(this.state.routeParams.orang_tua_utama === 'wali' && this.state.routeParams.nama_wali === null) {
        this.$f7.dialog.alert('Nama wali tidak boleh kosong!','Peringatan');
        return false;
      }

      this.props.simpanCalonPesertaDidik(this.state.routeParams).then((result)=> {
        if(result.payload.peserta_didik_id) {
          this.$f7router.navigate('/tambahJalurSekolah/'+result.payload.peserta_didik_id)
        } else {
          this.$f7.dialog.alert('Ada kesalahan pada sistem atau jaringan internet Anda. Mohon coba beberapa saat lagi');
        }
      });
    });
  }    

  setSelectValue = (key) => (b) => {
    // console.log(c);
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        [key]: b.target.value,
      }
    }, ()=> {
      if(key === 'kode_wilayah_provinsi') {
        let prov = '';
        this.state.provinsi.rows.map((op)=>{
          if(op.kode_wilayah === this.state.routeParams.kode_wilayah_provinsi){
            prov = op.nama;
          }
        });

        this.setState({
          routeParamsWilayah: {
            id_level_wilayah: 2,
            mst_kode_wilayah: this.state.routeParams.kode_wilayah_provinsi,
          },
          routeParams:{
            ...this.state.routeParams,
            provinsi: prov
          }
        }, ()=> {
          this.props.getMstWilayah(this.state.routeParamsWilayah).then((result)=> {
            this.setState({
              kabupaten: this.props.mst_wilayah,
            })
          });
        });
      } else if (key === 'kode_wilayah_kabupaten') {
        let kab = '';
        this.state.kabupaten.rows.map((op)=>{
          if(op.kode_wilayah === this.state.routeParams.kode_wilayah_kabupaten){
            kab = op.nama;
          }
        });

        this.setState({
          routeParamsWilayah: {
            id_level_wilayah: 3,
            mst_kode_wilayah: this.state.routeParams.kode_wilayah_kabupaten,
          },
          routeParams: {
            ...this.state.routeParams,
            kabupaten: kab
          }
        }, ()=> {
          this.props.getMstWilayah(this.state.routeParamsWilayah).then((result)=> {
            this.setState({
              kecamatan: this.props.mst_wilayah,
            })
          });
        });
      } else if(key === 'kode_wilayah_kecamatan'){
        let kec = '';
        this.state.kecamatan.rows.map((op)=>{
          if(op.kode_wilayah === this.state.routeParams.kode_wilayah_kecamatan){
            kec = op.nama;
          }
        });

        this.setState({
          routeParams: {
            ...this.state.routeParams,
            kecamatan: kec
          }
        });
      }
    });
  }

  setFieldValue = (key) => (e) => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        [key]: e.target.value,
      }
    }, ()=> {
      console.log(this.state.routeParams);
    });
  }
    
  cekNik = (e) => {
    this.setState({
      routeParamsCek: {
        nik: e.target.value,
        calon_peserta_didik_id: (this.$f7route.params['peserta_didik_id'] !== "null" ? (this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null) : null),
      }
    }, ()=> {
      this.props.cekNik(this.state.routeParamsCek).then((result)=>{
        if(this.props.cek_nik.count > 0) {
          this.setState({
            disabledInput: true,
            labelNik: 'NIK yang dimasukkan telah terdaftar sebelumnya. Mohon masukkan NIK lain',
          });
        } else {
          this.setState({
            disabledInput: false,
            labelNik: 'NIK valid dan dapat didaftarkan',
          });
        }
      })
    });
  }

  cekNISN = (e) => {
    this.setState({
      routeParamsCek: {
        nisn: e.target.value,
        calon_peserta_didik_id: (this.$f7route.params['peserta_didik_id'] !== "null" ? (this.$f7route.params['peserta_didik_id'] ? this.$f7route.params['peserta_didik_id'] : null) : null),
      }
    }, ()=> {
      this.props.cekNISN(this.state.routeParamsCek).then((result)=>{
        if(this.props.cek_nisn.count > 0) {
          this.setState({
            disabledInput: true,
            labelNISN: 'NISN yang dimasukkan telah terdaftar sebelumnya. Mohon masukkan NISN lain',
          });
        } else {
          this.setState({
            disabledInput: false,
            labelNISN: 'NISN valid dan dapat didaftarkan',
          });
        }
      })
    });
  }

  cekNikEnter = (e) => {
    // console.log(e);
  }

  bukaPeta = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        sekolah_asal: null,
      }
    }, ()=> {
      if(this.state.routeParams.nama === null || this.state.routeParams.nik === null || this.state.routeParams.tempat_lahir === null || this.state.routeParams.tanggal_lahir === null) {
        this.$f7.dialog.alert('Mohon lengkapi Nama/NISN/tempat dan tanggal lahir sebelum mengisi titik koordinat!','Peringatan');
        return false;
      }
      
      if(this.state.routeParams.kode_wilayah_provinsi === null || this.state.routeParams.kode_wilayah_kabupaten === null || this.state.routeParams.kode_wilayah_kecamatan === null || this.state.routeParams.alamat_tempat_tinggal === null) {
        this.$f7.dialog.alert('Mohon lengkapi alamat sebelum mengisi titik koordinat!','Peringatan');
        return false;
      }

      this.props.simpanCalonPesertaDidik(this.state.routeParams).then((result)=> {
        if(result.payload.peserta_didik_id) {
          // this.$f7router.navigate('/tambahJalurSekolah/'+result.payload.peserta_didik_id)
          this.$f7router.navigate("/petaPD/"+result.payload.peserta_didik_id+"/"+this.state.routeParams.lintang+"/"+this.state.routeParams.bujur);
          // this.$f7router.navigate("/petaPD/"+this.state.routeParams.calon_peserta_didik_id+"/"+this.state.routeParams.lintang+"/"+this.state.routeParams.bujur);
        } else {
          this.$f7.dialog.alert('Ada kesalahan pada sistem atau jaringan internet Anda. Mohon coba beberapa saat lagi');
        }
      });
    });
  }

  render() {
    return (
      <Page name="tambahCalonPesertaDidik" hideBarsOnScroll>
        <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
          <NavTitle sliding>Tambah Peserta Didik</NavTitle>
          <NavTitleLarge>
            Tambah Peserta Didik
          </NavTitleLarge>
        </Navbar>
        <Block className="pageWithTitle">
          <Segmented className="steps" raised>
            <Button tabLinkActive>Identitas Peserta Didik</Button>
            <Button disabled>Jalur dan Pilihan Sekolah</Button>
            <Button disabled>Kelengkapan Berkas</Button>
            <Button disabled>Konfirmasi</Button>
          </Segmented>
          <Row>
            <Col width="100" tabletWidth="50">
              <Card noShadow noBorder>
                <CardHeader>
                  Identitas Calon Peserta Didik
                </CardHeader>
                <CardContent>
                  <Button style={{width:'100px', position:'absolute',right:'0px', marginTop:'15px', marginRight:'15px', zIndex:'999999'}} onClick={this.cekNikEnter}>
                    Cek NIK
                  </Button>
                  <Button style={{width:'100px', position:'absolute',right:'0px', marginTop:'95px', marginRight:'15px', zIndex:'999999'}} onClick={this.cekNisnEnter}>
                    Cek NISN
                  </Button>
                  <List>
                    <ListInput
                      label="Nomor Induk Kependudukan / NIK"
                      // type="text"
                      type="tel"
                      placeholder="Ketikkan NIK dan enter..."
                      clearButton
                      onChange={this.setFieldValue('nik')}
                      onBlur={this.cekNik}
                      // onInput={this.cekNikEnter}
                      // onSubmit={this.cekNik}
                      pattern="[0-9]*"
                      validate
                      errorMessage="Mohon hanya masukkan Angka!"
                      defaultValue={this.state.routeParams.nik}
                    >
                      <span slot="info"><b style={{color:(this.state.disabledInput ? 'red' : 'green')}}>{this.state.labelNik}</b></span>
                    </ListInput>
                    <ListInput
                      label="NISN"
                      type="text"
                      placeholder="NISN Calon Peserta Didik..."
                      // info="Sesuai Ijazah"
                      clearButton
                      onChange={this.setFieldValue('nisn')}
                      defaultValue={this.state.routeParams.nisn}
                      disabled={this.state.disabledInput}
                      onBlur={this.cekNISN}
                    >
                      <span slot="info"><b style={{color:(this.state.disabledInput ? 'red' : 'green')}}>{this.state.labelNISN}</b></span>
                    </ListInput>
                    <ListInput
                      label="Nama Calon Peserta Didik"
                      type="text"
                      placeholder="Nama Calon Peserta Didik..."
                      info="Sesuai Ijazah"
                      clearButton
                      onChange={this.setFieldValue('nama')}
                      defaultValue={this.state.routeParams.nama}
                      disabled={this.state.disabledInput}
                    />
                    {/* {this.state.smartSelectJenisKelamin} */}
                    <ListItem accordionItem title={"Jenis Kelamin"} after={this.state.routeParams.jenis_kelamin}>
                      <AccordionContent>
                        <ListItem
                          title={"Edit"}
                          smartSelect
                          smartSelectParams={{
                            openIn: 'sheet', 
                            closeOnSelect: true,
                          }}
                        >
                          <select name="jenis_kelamin" defaultValue={0} onChange={this.setSelectValue('jenis_kelamin')}>
                            <option disabled value={"0"}>-</option>
                            <option value={"L"}>Laki-laki</option>
                            <option value={"P"}>Perempuan</option>
                          </select>
                        </ListItem>
                      </AccordionContent>
                    </ListItem>


                    <ListInput
                      label="Tempat Lahir"
                      type="text"
                      placeholder="Tempat Lahir..."
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
                    <ListItem accordionItem title={"Provinsi"} after={this.state.routeParams.provinsi}>
                      <AccordionContent>
                        <ListItem
                          title={"Edit"}
                          smartSelect
                          disabled={this.state.disabledInput}
                          smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                        >
                          <select name="kode_wilayah_provinsi" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_provinsi')}>
                            <option disabled value={"0"}>-</option>
                            {this.state.provinsi.rows.map((optionProvinsi)=> {
                              return (
                                <option key={optionProvinsi.kode_wilayah} value={optionProvinsi.kode_wilayah}>{optionProvinsi.nama}</option>
                              )
                            })}
                          </select>
                        </ListItem>
                      </AccordionContent>
                    </ListItem>
                    <ListItem accordionItem title={"Kabupaten/Kota"} after={this.state.routeParams.kabupaten}>
                      <AccordionContent>
                        <ListItem
                          title={"Edit"}
                          smartSelect
                          disabled={this.state.disabledInput}
                          smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                        >
                          <select name="kode_wilayah_kabupaten" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_kabupaten')}>
                            <option value={"0"}>-</option>
                            {this.state.kabupaten.rows.map((optionKabupaten)=> {
                              return (
                                <option key={optionKabupaten.kode_wilayah} value={optionKabupaten.kode_wilayah}>{optionKabupaten.nama}</option>
                              )
                            })}
                          </select>
                        </ListItem>
                      </AccordionContent>
                    </ListItem>
                    <ListItem accordionItem title={"Kecamatan"} after={this.state.routeParams.kecamatan}>
                      <AccordionContent>
                        <ListItem
                          title={"Edit"}
                          smartSelect
                          disabled={this.state.disabledInput}
                          smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                        >
                          <select name="kode_wilayah_kecamatan" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_kecamatan')}>
                            <option value={"0"}>-</option>
                            {this.state.kecamatan.rows.map((optionKecamatan)=> {
                              return (
                                <option key={optionKecamatan.kode_wilayah} value={optionKecamatan.kode_wilayah}>{optionKecamatan.nama}</option>
                              )
                            })}
                          </select>
                        </ListItem>
                      </AccordionContent>
                    </ListItem>
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
                  </List>
                  <Button onClick={this.bukaPeta}>
                    Lihat / Ubah Posisi Koordinat Rumah
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
                        placeholder="Nama Ayah..."
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
                        placeholder="Tempat Lahir Ayah..."
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
                        placeholder="Nomor Telepon Ayah..."
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
                        placeholder="Nama Ibu..."
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
                        placeholder="Tempat Lahir Ibu..."
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
                        </select>
                      </ListItem>
                    }
                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                      <ListInput
                        label="Alamat Tempat Tinggal Ibu"
                        type="textarea"
                        disabled={this.state.disabledInput}
                        placeholder="Alamat Tempat Tinggal Ibu..."
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
                        placeholder="Nomor Telepon Ibu..."
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
                        placeholder="Nama Wali..."
                        clearButton
                        onChange={this.setFieldValue('nama_wali')}
                        defaultValue={this.state.routeParams.nama_wali}
                      />
                    }
                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                      <ListInput
                        label="Tempat Lahir Wali"
                        type="text"
                        placeholder="Tempat Lahir Wali..."
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
                        placeholder="Alamat Tempat Tinggal Wali..."
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
                        placeholder="Nomor Telepon Wali..."
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
            <Col width="100">
              <Block className="simpanFormulir" style={{marginBottom:'40px'}}>
                <Button disabled={this.state.disabledInput} raised fill large onClick={this.simpan}>
                  Simpan dan Lanjutkan
                </Button>
              </Block>
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
                placeholder="Cari sekolah..."
                onSubmit={this.cariSekolah}
                customSearch={true}
                onChange={this.ketikCariSekolah}
              />
              {this.props.ppdb_sekolah.rows.map((option, key)=> {
                return (
                  <Card key={key}>
                    <CardContent>
                      <Row>
                        <Col width="80">
                          <b>{option.nama} ({option.npsn})</b><br/>
                          {option.alamat_jalan}, {option.kecamatan}, {option.kabupaten}, {option.provinsi}
                        </Col>
                        <Col width="20" style={{textAlign:'right'}}>
                          <Radio 
                            name={"pilih-sekolah"} 
                            value={option.sekolah_id} 
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
        </Block>
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
    cekNik: Actions.cekNik,
    cekNISN: Actions.cekNISN,
  }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
  return {
    window_dimension: App.window_dimension,
    loading: App.loading,
    ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
    mst_wilayah: Ref.mst_wilayah,
    calon_peserta_didik: PPDBPesertaDidik.calon_peserta_didik,
    cek_nik: PPDBPesertaDidik.cek_nik,
    cek_nisn: PPDBPesertaDidik.cek_nisn
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahCalonPesertaDidik));
  