import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button, Card, CardContent, List, ListInput, CardHeader, Row, Col
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

class hasilAkhirKuis extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            kuis_id: this.$f7route.params['kuis_id']
        },
        loading:true,
        kuis: {
            kuis_id: '',
            nama: '-'
        },
        pengguna_kuis: {
            kuis_id: '',
            pengguna_id: '',
            create_date: '2000-01-02 00:00:00'
        },
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
        this.props.getPenggunaKuis(this.state.routeParams).then((result)=>{
            this.setState({
                ...this.state,
                routeParams: {
                    ...this.state.routeParams,
                    pengguna_id: null
                }
            },()=>{
                this.props.getKuis(this.state.routeParams).then((result)=>{
                    this.setState({
                        ...this.state,
                        pengguna_kuis: this.props.pengguna_kuis.rows[0],
                        kuis: this.props.kuis.rows[0]
                    },()=>{
                        console.log(this.state);
                    })
                });
            })
        });

    }


    render()
    {
        let tanggal = '';
        let tgl = new Date(this.state.pengguna_kuis.create_date);

        tanggal = moment(this.state.pengguna_kuis.create_date).format('D') + ' ' + this.bulan[(moment(this.state.pengguna_kuis.create_date).format('M')-1)] + ' ' + moment(this.state.pengguna_kuis.create_date).format('YYYY');

        return (
            <Page name="hasilAkhirKuis" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Hasil Akhir</NavTitle>
                    <NavTitleLarge>
                        Hasil Akhir
                    </NavTitleLarge>
                </Navbar>
                <Card>
                    <CardHeader>
                        <b style={{fontSize:'20px'}}>{this.state.kuis.judul}</b>
                    </CardHeader>
                    <CardContent>
                        <Row style={{borderBottom:'2px solid #434343', marginBottom:'20px'}}>
                            <Col width={100}>
                                oleh {this.state.pengguna_kuis.nama_pengguna}<br/>
                                dikerjakan pada tanggal {tanggal}
                            </Col>
                        </Row>
                        <Row style={{borderBottom:'2px solid #434343'}}>
                            <Col width={80}>
                                Jumlah Pertanyaan
                            </Col>
                            <Col width={20} style={{textAlign:'right', fontWeight:'bold'}}>
                                {this.state.pengguna_kuis.total}
                            </Col>
                        </Row>
                        <Row style={{borderBottom:'2px solid #434343'}}>
                            <Col width={80}>
                                Jawaban Benar
                            </Col>
                            <Col width={20} style={{textAlign:'right', fontWeight:'bold'}}>
                                {this.state.pengguna_kuis.benar}
                            </Col>
                        </Row>
                        <Row style={{borderBottom:'2px solid #434343'}}>
                            <Col width={80}>
                                Jawaban Salah
                            </Col>
                            <Col width={20} style={{textAlign:'right', fontWeight:'bold'}}>
                                {this.state.pengguna_kuis.salah}
                            </Col>
                        </Row>
                        <Row>
                            <Col width={100} style={{textAlign:'center', fontWeight:'bold', paddingTop:'20px'}}>
                                Skor Akhir<br/>
                                <h1 style={{fontSize:'40px', fontWeight:'bold', color:'#E040FB'}}>
                                    {this.state.pengguna_kuis.skor}/100
                                </h1>
                            </Col>
                            <Col width={100} style={{textAlign:'center', fontWeight:'bold', paddingTop:'20px'}}>
                                
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent style={{textAlign:'center'}}>
                        Peringkat<br/>
                        <h1 style={{fontSize:'40px', color:'#8BC34A'}}>{this.state.pengguna_kuis.peringkat}</h1>
                        dari {this.state.pengguna_kuis.total_peserta} peserta
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Button raised fill large onClick={()=>this.$f7router.navigate('/kuis/'+this.state.routeParams.pengguna_id)}>
                            Selesai
                        </Button>
                    </CardContent>
                </Card>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getKuis: Actions.getKuis,
      getPenggunaKuis: Actions.getPenggunaKuis,
      simpanPenggunaKuis: Actions.simpanPenggunaKuis
    }, dispatch);
}

function mapStateToProps({ App, Kuis }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        kuis: Kuis.kuis,
        pengguna_kuis: Kuis.pengguna_kuis
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(hasilAkhirKuis));
  