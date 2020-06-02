import React, {Component} from 'react';
import { Page, Navbar, NavTitle, List, ListItem, Block, Subnavbar, Searchbar, ListInput, Card, CardContent, Row, Col, Button } from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';
import * as Actions from '../../store/actions';

const kuota_kosong = {
    kuota : '',
    kuota_0100: '',
    kuota_0200: '',
    kuota_0300: '',
    kuota_0400: '',
    kuota_0500: '',
}

class EditKuotasekolah extends Component {
    state = {
        loading: false,
        disabled: true,
        routeParams:{
            sekolah_id : this.$f7route.params['sekolah_id'] ? this.$f7route.params['sekolah_id'] : '',
            kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi') : '',
        },
        kuota: {
            ...kuota_kosong,
        }
    }

    getData = () => {
        this.props.getSekolah2(this.state.routeParams).then(e => {
            let disabled = true;
            let data = [];

            if(this.props.sekolah.npsn){
                disabled = false;
                data = this.props.sekolah;
                this.$f7.dialog.close();
            }else{
                disabled = true;
                data = kuota_kosong;
                this.$f7.dialog.alert('Sekolah tidak ditemukan !');
            }

            this.setState({
                kuota: {
                    ...this.state.kuota,
                    ...data
                },
                disabled: disabled,
                loading: false
            })
        });
    }

    Save = () => {
        if(this.props.sekolah.npsn){
            this.$f7.dialog.preloader('Loading...');
            this.props.saveKuota(this.state.kuota).then(e => {
                this.$f7.dialog.close();
                this.$f7.dialog.alert('Simpan Berhasil');
            });
        }else{
            this.$f7.dialog.alert('Tidak dapat melakukan simpan kuota !');
        }
    }

    handleChange = (e) => {
        this.setState({
            kuota: {
                ...this.state.kuota,
                [e.target.name]: e.target.value,
            }
        }, () => {
            const { kuota_0100, kuota_0200, kuota_0300, kuota_0400, kuota_0500 } = this.state.kuota;
            const kuota = (kuota_0100 ? parseInt(kuota_0100) : 0) +
                (kuota_0200 ? parseInt(kuota_0200) : 0) + 
                (kuota_0300 ? parseInt(kuota_0300) : 0) + 
                (kuota_0400 ? parseInt(kuota_0400) : 0) + 
                (kuota_0500 ? parseInt(kuota_0500) : 0);
            this.setState({
                kuota: {
                    ...this.state.kuota,
                    kuota: kuota
                }
            })
        })
    }

    componentDidMount(){
        this.setState({loading: true, disabled: true});
        this.$f7.dialog.preloader('Loading...');
        this.getData();
    }

    render()
    {
        const { sekolah } = this.props;
        console.log(this.state.kuota);

        return (
            <Page name="cari" style={{paddingBottom:'50px'}}>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Ubah Kuota Sekolah</NavTitle>
                </Navbar>
                    <Row noGap>
                        <Col tabletWidth="20" width="20">
                            <Card style={{ height: '200px' }}>
                                <CardContent>
                                    <img
                                        src={ sekolah.npsn ? ('http://foto.data.kemdikbud.go.id/getImage/' + sekolah.npsn + '/1.jpg') : 'https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg' }
                                        height="170px"
                                        width="100%"
                                    />
                                </CardContent>
                            </Card>
                        </Col>
                        <Col tabletWidth="80" width="80">
                            <Card style={{ height: '200px' }}>
                                <CardContent>
                                    <Row>
                                        <Col>
                                            <a href="#">
                                                <h4 className="mb-0">
                                                    {
                                                        (sekolah.nama ? sekolah.nama : '-' ) + 
                                                        " (" + (sekolah.npsn ? sekolah.npsn : '-') + ")"
                                                    }
                                                </h4>
                                            </a>
                                            <hr/>
                                            <span>Provinsi : { sekolah.provinsi }</span><br/>
                                            <span>Kabupaten : { sekolah.kabupaten }</span><br/>
                                            <span>Kecamatan : { sekolah.kecamatan }</span><br/>
                                            <span>Alamat : { sekolah.alamat_jalan }</span><br/>
                                            <span>Lintang: { sekolah.lintang }</span><br/>
                                            <span>Bujur: { sekolah.bujur }</span><br/>
                                        </Col>
                                        <Col className="text-center">
                                            <a href="#">
                                                <h1 className="mb-0">{ this.state.kuota.kuota ? this.state.kuota.kuota : 0 }</h1>
                                                <i>Kuota Siswa</i>
                                            </a>
                                        </Col>
                                    </Row>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col width="100" tabletWidth="100">
                            <Card>
                                <CardContent>
                                    <List noHairlinesMd>
                                        <ListInput
                                            label="Affirmasi"
                                            name="kuota_0100"
                                            value={this.state.kuota.kuota_0100 ? this.state.kuota.kuota_0100 : ''}
                                            type="number"
                                            disabled={ this.state.disabled }
                                            onChange={this.handleChange}
                                            placeholder="0"
                                            clearButton
                                        />
                                        <ListInput
                                            label="Perpindahan Orang Tua"
                                            type="number"
                                            name="kuota_0200"
                                            value={this.state.kuota.kuota_0200 ? this.state.kuota.kuota_0200 : ''}
                                            disabled={ this.state.disabled }
                                            onChange={this.handleChange}
                                            placeholder="0"
                                            clearButton
                                        />
                                        <ListInput
                                            label="Minat dan Bakat"
                                            type="number"
                                            name="kuota_0300"
                                            value={this.state.kuota.kuota_0300 ? this.state.kuota.kuota_0300 : ''}
                                            disabled={ this.state.disabled }
                                            onChange={this.handleChange}
                                            placeholder="0"
                                            clearButton
                                        />
                                        <ListInput
                                            label="Zonasi"
                                            type="number"
                                            name="kuota_0400"
                                            value={this.state.kuota.kuota_0400 ? this.state.kuota.kuota_0400 : ''}
                                            disabled={ this.state.disabled }
                                            onChange={this.handleChange}
                                            placeholder="0"
                                            clearButton
                                        />
                                        <ListInput
                                            label="Tahfidz"
                                            type="number"
                                            name="kuota_0500"
                                            value={this.state.kuota.kuota_0500 ? this.state.kuota.kuota_0500 : ''}
                                            disabled={ this.state.disabled }
                                            onChange={this.handleChange}
                                            placeholder="0"
                                            clearButton
                                        />
                                    </List>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col width="100" tabletWidth="100">
                            <div className="m-8">
                                <Button fillIos onClick={this.Save}>Simpan</Button>
                            </div>
                        </Col>
                    </Row>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSekolah2                                 : Actions.KUOTA_getSekolah2,
        saveKuota                                   : Actions.KUOTA_saveKuota
    }, dispatch);
}

function mapStateToProps({ App, KuotaSekolah }) {
    return {
        window_dimension                            : App.window_dimension,
        sekolah                                     : KuotaSekolah.sekolah_detail,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(EditKuotasekolah));
  