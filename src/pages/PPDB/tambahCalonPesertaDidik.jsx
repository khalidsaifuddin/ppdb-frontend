import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

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
            pekerjaan_id_wali: 98
        },
        sekolah_terpilih: {
            sekolah_id: null,
            nama: null
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
        this.setState({
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            
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
                sekolah_id_asal: sekolah_id
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

    setSelectValue = (key) => (b) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: b.target.value
            }
        },()=>{
            console.log(this.state.routeParams);
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
                <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '8px', marginBottom: '8px'}}>
                    <Button style={{borderRadius:'20px 50px 50px 20px'}} tabLinkActive>Identitas Peserta Didik</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Kelengkapan Berkas</Button>
                    <Button style={{borderRadius:'0px 50px 50px 0px'}}>Jalur dan Pilihan Sekolah</Button>
                    <Button style={{borderRadius:'0px 0px 0px 0px'}}>Bukti Pendaftaran</Button>
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
                                        label="Nama Calon Peserta Didik"
                                        type="text"
                                        placeholder="Nama Calon Peserta Didik ..."
                                        info="Sesuai Ijazah"
                                        clearButton
                                        onChange={this.setFieldValue('nama')}
                                    />

                                    <ListInput
                                        label="Nomor Induk Kependudukan / NIK"
                                        type="text"
                                        placeholder="NIK ..."
                                        info="NIK yang belum pernah didaftarkan sebelumnya"
                                        clearButton
                                        onChange={this.setFieldValue('nik')}
                                    />
                                    
                                    <ListItem
                                        title={"Jenis_Kelamin"}
                                        smartSelect
                                        smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                    >
                                        <select name="jenis_kelamin" defaultValue={"L"} onChange={this.setSelectValue('jenis_kelamin')}>
                                            <option disabled value={"0"}>-</option>
                                            <option value={"L"}>Laki-laki</option>
                                            <option value={"P"}>Perempuan</option>
                                            
                                        </select>
                                    </ListItem>
                                    
                                    <ListInput
                                        label="Tempat Lahir"
                                        type="text"
                                        placeholder="Tempat Lahir ..."
                                        // info="NIK yang belum pernah didaftarkan sebelumnya"
                                        clearButton
                                        onChange={this.setFieldValue('tempat_lahir')}
                                    />

                                    <ListInput
                                        label="Tanggal Lahir"
                                        type="date"
                                        placeholder="Tanggal Lahir..."
                                        onChange={this.setFieldValue('tanggal_lahir')}
                                    />

                                    <ListItem
                                        title={"Provinsi"}
                                        smartSelect
                                        smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                    >
                                        <select name="kode_wilayah_provinsi" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_provinsi')}>
                                            <option value={"0"}>-</option>
                                            
                                        </select>
                                    </ListItem>
                                    
                                    <ListItem
                                        title={"Kabupaten/Kota"}
                                        smartSelect
                                        smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                    >
                                        <select name="kode_wilayah_kabupaten" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_kabupaten')}>
                                            <option value={"0"}>-</option>
                                            
                                        </select>
                                    </ListItem>
                                    
                                    <ListItem
                                        title={"Kecamatan"}
                                        smartSelect
                                        smartSelectParams={{openIn: 'sheet', closeOnSelect: true}}
                                    >
                                        <select name="kode_wilayah_kecamatan" defaultValue={"0"} onChange={this.setSelectValue('kode_wilayah_kecamatan')}>
                                            <option value={"0"}>-</option>
                                            
                                        </select>
                                    </ListItem>

                                    <ListInput
                                        label="Alamat Tempat Tinggal"
                                        type="textarea"
                                        placeholder="Alamat Tempat Tinggal ..."
                                        info="Sesuai dengan kartu keluarga (KK)"
                                        clearButton
                                        onChange={this.setFieldValue('alamat_tempat_tinggal')}
                                    />

                                    <ListInput
                                        label="RT"
                                        type="text"
                                        placeholder="RT..."
                                        onChange={this.setFieldValue('rt')}
                                    />

                                    <ListInput
                                        label="RW"
                                        type="text"
                                        placeholder="RW..."
                                        onChange={this.setFieldValue('rw')}
                                    />
                                    
                                    <ListInput
                                        label="Dusun"
                                        type="text"
                                        placeholder="Dusun..."
                                        onChange={this.setFieldValue('dusun')}
                                    />
                                    
                                    <ListInput
                                        label="Desa/Kelurahan"
                                        type="text"
                                        placeholder="Desa/Kelurahan..."
                                        onChange={this.setFieldValue('desa_kelurahan')}
                                    />
                                    
                                    <ListInput
                                        label="Koordinat Rumah Tinggal (Lintang)"
                                        type="text"
                                        placeholder="Lintang..."
                                        onChange={this.setFieldValue('lintang')}
                                    />
                                    
                                    <ListInput
                                        label="Koordinat Rumah Tinggal (Bujur)"
                                        type="text"
                                        placeholder="Bujur..."
                                        onChange={this.setFieldValue('bujur')}
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
                                        placeholder="Nama Ayah ..."
                                        // info="Sesuai Ijazah"
                                        clearButton
                                        onChange={this.setFieldValue('nama_ayah')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListInput
                                            label="Tempat Lahir Ayah"
                                            type="text"
                                            placeholder="Tempat Lahir Ayah ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            onChange={this.setFieldValue('tempat_lahir_ayah')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListInput
                                            label="Tanggal Lahir Ayah"
                                            type="date"
                                            placeholder="Tanggal Lahir Ayah..."
                                            onChange={this.setFieldValue('tanggal_lahir_ayah')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ayah' &&
                                        <ListItem
                                            title={"Pendidikan Terakhir Ayah"}
                                            smartSelect
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
                                            onChange={this.setFieldValue('alamat_tempat_tinggal_ayah')}
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
                                            pattern="[0-9]*"
                                            onChange={this.setFieldValue('no_telepon_ayah')}
                                        />
                                    }

                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListInput
                                            label="Nama Ibu"
                                            type="text"
                                            placeholder="Nama Ibu ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            onChange={this.setFieldValue('nama_ibu')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListInput
                                            label="Tempat Lahir Ibu"
                                            type="text"
                                            placeholder="Tempat Lahir Ibu ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            onChange={this.setFieldValue('tempat_lahir_ibu')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListInput
                                            label="Tanggal Lahir Ibu"
                                            type="date"
                                            placeholder="Tanggal Lahir Ibu..."
                                            onChange={this.setFieldValue('tanggal_lahir_ibu')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'ibu' &&
                                        <ListItem
                                            title={"Pendidikan Terakhir Ibu"}
                                            smartSelect
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
                                            placeholder="Alamat Tempat Tinggal Ibu ..."
                                            info="Sesuai dengan kartu keluarga (KK)"
                                            clearButton
                                            onChange={this.setFieldValue('alamat_tempat_tinggal_ibu')}
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
                                        />
                                    }
                                    
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListInput
                                            label="Nama Wali"
                                            type="text"
                                            placeholder="Nama Wali ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            onChange={this.setFieldValue('nama_wali')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListInput
                                            label="Tempat Lahir Wali"
                                            type="text"
                                            placeholder="Tempat Lahir Wali ..."
                                            // info="Sesuai Ijazah"
                                            clearButton
                                            onChange={this.setFieldValue('tempat_lahir_wali')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListInput
                                            label="Tanggal Lahir Wali"
                                            type="date"
                                            placeholder="Tanggal Lahir Wali..."
                                            onChange={this.setFieldValue('tanggal_lahir_wali')}
                                        />
                                    }
                                    {this.state.routeParams.orang_tua_utama === 'wali' &&
                                        <ListItem
                                            title={"Pendidikan Terakhir Wali"}
                                            smartSelect
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
                                            onChange={this.setFieldValue('alamat_tempat_tinggal_wali')}
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
                                            pattern="[0-9]*"
                                            onChange={this.setFieldValue('no_telepon_wali')}
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
                                <Button fill sheetOpen=".demo-sheet">Pilih Sekolah</Button>
                            </CardContent>
                        </Card>
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
      getPPDBSekolah: Actions.getPPDBSekolah
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahCalonPesertaDidik));
  