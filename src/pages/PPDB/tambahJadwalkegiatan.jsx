import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, Card, CardContent, Icon, List, ListInput, ListItem, ListButton, Button
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

const newperJadwalkegiatan = {
    jadwal_kegiatan_id : '',
    periode_kegiatan_id : '',
    nama : '',
    kode_wilayah : '',
    tanggal_mulai : [],
    tanggal_selesai : [],
    jalur_id: '',
    soft_delete: 0,

}

class TambahJadwalkegiatan extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            jadwal_kegiatan_id : this.$f7route.params['jadwal_kegiatan_id'] ? this.$f7route.params['jadwal_kegiatan_id'] : null,
            searchText : '',
        },
        perJadwalkegiatan: [],
    }

    ketikCari = (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                searchText: e.target.value,
            }
        })
    }

    handleChange = (event) => {
        this.setState({
            perJadwalkegiatan: {
                ...this.state.perJadwalkegiatan,
                [event.target.name]: event.target.value
            }
        });
    }

    handleChangedateMulai = (val) => {
        this.setState({
            perJadwalkegiatan: {
                ...this.state.perJadwalkegiatan,
                tanggal_mulai: val
            }
        })
    }

    handleChangedateSelesai = (val) => {
        this.setState({
            perJadwalkegiatan: {
                ...this.state.perJadwalkegiatan,
                tanggal_selesai: val
            }
        })
    }
    
    handleSave = () => {
        const params = {
            ...this.state.perJadwalkegiatan,
            tanggal_mulai: this.state.perJadwalkegiatan.tanggal_mulai[0],
            tanggal_selesai: this.state.perJadwalkegiatan.tanggal_selesai[0],
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
        }

        this.props.saveJadwalKegiatan(params).then(e => {
            this.$f7router.navigate("/jadwalKegiatan/");
            this.$f7.dialog.alert("Simpan Berhasil", "Simpan");
            // this.getData();
        }).catch(error => {
            this.$f7.dialog.alert("Simpan data gagal !", "Error");
            console.log(error)
        });
    }

    getData = () => {
        this.setState({
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            this.props.getJadwalKegiatan(this.state.routeParams);
        });
    }

    componentDidMount = () => {
        if(this.state.routeParams.jadwal_kegiatan_id === 'create'){
            this.setState({
                ...this.state,
                perJadwalkegiatan: newperJadwalkegiatan
            });
        }else{
            this.setState({
                ...this.state,
                perJadwalkegiatan: {
                    ...this.props.perJadwalkegiatan,
                    tanggal_mulai: [new Date(this.props.perJadwalkegiatan.tanggal_mulai)],
                    tanggal_selesai: [new Date(this.props.perJadwalkegiatan.tanggal_selesai)]
                },
            });
        }
    }

    render()
    {
        const { ref_jalur, ref_wilayah } = this.props;
        const { perJadwalkegiatan, routeParams } = this.state;

        return (
            <Page name="cari" style={{paddingBottom:'40px'}}>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding> { routeParams.jadwal_kegiatan_id === 'create' ? 'Tambah' : 'Edit' } Jadwal Kegiatan</NavTitle>
                </Navbar>
                
                <Card>
                    <CardContent>
                        <List noHairlinesMd>
                            <ListInput
                                label="Name"
                                id="nama"
                                type="text"
                                name="nama"
                                value={ perJadwalkegiatan.nama }
                                onChange={this.handleChange}
                                placeholder="Nama kegiatan"
                                info="Default validation"
                                required
                                validate
                                clearButton
                            />
                            <ListItem
                                title="Wilayah"
                                smartSelect
                                smartSelectParams={{openIn: 'sheet'}}
                            >
                                <select
                                    id="kode_wilayah"
                                    name="kode_wilayah"
                                    value={ perJadwalkegiatan.kode_wilayah }
                                    onChange={this.handleChange}
                                >
                                    {
                                        ref_wilayah.map((n, key) =>
                                            <option key={key} value={ n.kode_wilayah }>{ n.nama }</option>
                                        )
                                    }
                                </select>
                            </ListItem>
                            <ListInput
                                label="Periode"
                                type="text"
                                od="periode_kegiatan_id"
                                name="periode_kegiatan_id"
                                value={ perJadwalkegiatan.periode_kegiatan_id }
                                onChange={this.handleChange}
                                placeholder="2020"
                                info="With custom error message"
                                errorMessage="Only numbers please!"
                                required
                                validate
                                pattern="[0-9]*"
                                clearButton
                            />
                            <ListItem
                                title="Jalur"
                                smartSelect
                                smartSelectParams={{openIn: 'sheet'}}
                            >
                                <select
                                    id="jalur_id"
                                    name="jalur_id"
                                    value={ perJadwalkegiatan.jalur_id }
                                    onChange={this.handleChange}
                                >
                                    {
                                        ref_jalur.map((n, key) =>
                                            <option key={key} value={ n.jalur_id }>{ n.nama }</option>
                                        )
                                    }
                                </select>
                            </ListItem>
                            <ListInput
                                label="Tanggal Mulai"
                                type="datepicker"
                                placeholder="Select date"
                                id="tanggal_mulai"
                                name="tanggal_mulai"
                                value={ perJadwalkegiatan.tanggal_mulai }
                                readonly
                                calendarParams={{dateFormat: 'DD, MM dd, yyyy'}}
                                onCalendarChange={this.handleChangedateMulai}
                            />
                            <ListInput
                                label="Tanggal Selesai"
                                type="datepicker"
                                placeholder="Select date"
                                id="tanggal_selesai"
                                name="tanggal_selesai"
                                value={ perJadwalkegiatan.tanggal_selesai }
                                readonly
                                calendarParams={{dateFormat: 'DD, MM dd, yyyy'}}
                                onCalendarChange={this.handleChangedateSelesai}
                            />
                        </List>
                        <div
                            style={{
                                marginTop: 20
                            }}
                        >
                            <Button fillIos onClick={e => this.handleSave()}>Simpan</Button>
                        </div>
                    </CardContent>
                </Card>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveJadwalKegiatan                          : Actions.saveJadwalKegiatan,
        getJadwalKegiatan                           : Actions.getJadwalKegiatan
    }, dispatch);
}

function mapStateToProps({ App, JadwalKegiatan }) {
    return {
        window_dimension                            : App.window_dimension,
        perJadwalkegiatan                           : JadwalKegiatan.perJadwalkegiatan,
        ref_jalur                                   : JadwalKegiatan.ref_jalur,
        ref_wilayah                                 : JadwalKegiatan.ref_wilayah
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(TambahJadwalkegiatan));
  