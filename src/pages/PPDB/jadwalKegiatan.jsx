import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, Subnavbar, Searchbar, Card, CardContent, Button, Row, Col, Icon, Block
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class JadwalKegiatan extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            searchText : '',
        }
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

    ketikCari = (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                searchText: e.target.value,
            }
        })
    }

    handleLink = (data, link) => {
        this.props.perJadwalkegiatan(data);
        this.$f7router.navigate(link);
    }

    handleDelete = (opt) => {
        this.$f7.dialog.confirm('Apakah anda yakin untuk hapus', 'Perhatian', () => {
            this.props.deleteJadwalKegiatan(opt.jadwal_kegiatan_id).then(e => {
                this.$f7.dialog.alert("Hapus Berhasil", "Hapus");
                this.getData();
            })
        });
    }

    componentDidMount = () => {
        this.getData();
        this.props.getRefJalurJk();
        this.props.getRefmstwilayahJK({
            mst_kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi')
        });
    }

    render()
    {
        const { entities } = this.props;

        return (
            <Page name="cari" style={{paddingBottom:'40px'}}>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Jadwal Kegiatan</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            placeholder="Cari Jadwal kegiatan"
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.getData}
                            customSearch={true}
                            onChange={this.ketikCari}
                            value={this.state.routeParams.searchText}
                            // clickClear={this.clickClear}
                        ></Searchbar>
                        <Button fillIos onClick={e => this.handleLink([], "/jadwalKegiatan/create") }>
                            <Icon ios="f7:plus_circle"/>
                            Tambah
                        </Button>
                    </Subnavbar>
                </Navbar>

                <Block strong style={{marginTop:'-4px', marginBottom:'0px'}}>Jadwal Kegiatan</Block>

                {
                    entities.rows.map((option, key)=>{

                    return (

                        <Card className="demo-card-header-pic" key={key}>
                            <CardContent>
                                <Row>
                                    <Col width="70" tabletWidth="85">
                                        <Row noGap>
                                            <Col width="100">
                                                <a href="#">
                                                    <h2 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                        { option.nama }
                                                    </h2>
                                                </a>
                                            </Col>
                                            <Col width="100" tabletWidth="25">
                                                Wilayah: <b>{ option.nama_wilayah }</b> <br/>
                                                Periode: <b>{ option.periode_kegiatan_id }</b> <br/>
                                                Jalur: <b>{ option.jalur }</b> <br/>
                                            </Col>
                                            <Col width="100" tabletWidth="25">
                                                Tanggal Mulai <b>{ option.tanggal_mulai }</b> <br/>
                                                Tanggal Selesai <b>{ option.tanggal_selesai }</b> <br/>
                                            </Col>
                                            <Col width="100" tabletWidth="25">
                                                <Button raised fill onClick={e => this.handleLink(option, ("/jadwalKegiatan/" + option.jadwal_kegiatan_id) )}>
                                                    <Icon ios="f7:pencil_circle_fill" style={{fontSize:'20px'}}/>
                                                    Edit
                                                </Button>
                                                <Button raised fill onClick={e => this.handleDelete(option)}>
                                                    <Icon ios="f7:xmark_circle_fill" style={{fontSize:'20px'}}/>
                                                    Hapus
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    )
                    })
                }
                
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getJadwalKegiatan                           : Actions.getJadwalKegiatan,
        getRefJalurJk                               : Actions.getRefJalurJk,
        getRefmstwilayahJK                          : Actions.getRefmstwilayahJK,
        perJadwalkegiatan                           : Actions.perJadwalkegiatan,
        deleteJadwalKegiatan                        : Actions.deleteJadwalKegiatan
    }, dispatch);
}

function mapStateToProps({ App, JadwalKegiatan }) {
    return {
        window_dimension                            : App.window_dimension,
        entities                                    : JadwalKegiatan.entities
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(JadwalKegiatan));
  