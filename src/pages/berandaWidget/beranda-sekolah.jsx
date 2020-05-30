import React, { Component } from 'react';
import { Row, Col, Card, CardContent, Button } from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';

const bulan = [
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

class BerandaSekolah extends Component {
  constructor(props) {
    super(props);
        this.state = {
            loading: false
        }
    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    formatTanggal = (val) => {
        const time = new Date(val);
        return time.getDate() + " " + bulan[time.getMonth()] + " " + time.getFullYear();
    }

    componentDidMount = () => {
        
    }

    render() {
        const { loading } = this.state;

        const dataPie = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        }

        const dataDiagram = {
            labels: ['Kuota', 'Pendaftar', 'Konfirmasi',],
            datasets: [
                {
                    label: 'Rekap Pilihan',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [80, 50, 45]
                }
            ]
        }

        return (
            <Row noGap>
                <Col width="100" tabletWidth="100">
                    <Card>
                        <CardContent>
                            <img src="https://lampung17.com/wp-content/uploads/2020/04/61sek.jpg" height="100"/>
                            <span>SMP N 1</span><br/>
                            <span>Kecamatan</span><br/>
                            <span>Alamat</span><br/>
                            <span>Lokasi</span><br/>
                            <span>Kuota</span><br/>
                        </CardContent>
                    </Card>
                </Col>

                <Col width="50" tabletWidth="50">
                    <Card>
                        <CardContent>
                            <Row>
                                <Col width="40" tabletWidth="40">
                                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" height="80"/>
                                </Col>
                                <Col width="60" tabletWidth="60">
                                    <span>Kuota Zonasi : <b>0</b> </span><br/>
                                    <b style={{fontSize:'15px'}}><span>Pendaftar : 0 (0.0%) </span></b>
                                    <hr/>
                                    <span>Diterima : 0 </span><br/>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>

                <Col width="50" tabletWidth="50">
                    <Card>
                        <CardContent>
                            <Row>
                                <Col width="40" tabletWidth="40">
                                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" height="80"/>
                                </Col>
                                <Col width="60" tabletWidth="60">
                                    <span>Kuota Alternatif : <b>0</b> </span><br/>
                                    <b style={{fontSize:'15px'}}><span>Pendaftar : 0 (0.0%) </span></b>
                                    <hr/>
                                    <span>Diterima : 0 </span><br/>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>

                <Col width="50" tabletWidth="50">
                    <Card>
                        <CardContent>
                            <Row>
                                <Col width="40" tabletWidth="40">
                                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" height="80"/>
                                </Col>
                                <Col width="60" tabletWidth="60">
                                    <span>Kuota Pindah Tugas Ortu : <b>0</b> </span><br/>
                                    <b style={{fontSize:'15px'}}><span>Pendaftar : 0 (0.0%) </span></b>
                                    <hr/>
                                    <span>Diterima : 0 </span><br/>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>

                <Col width="50" tabletWidth="50">
                    <Card>
                        <CardContent>
                            <Row>
                                <Col width="40" tabletWidth="40">
                                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" height="80"/>
                                </Col>
                                <Col width="60" tabletWidth="60">
                                    <span>Kuota Tahfidz : <b>0</b> </span><br/>
                                    <b style={{fontSize:'15px'}}><span>Pendaftar : 0 (0.0%) </span></b>
                                    <hr/>
                                    <span>Diterima : 0 </span><br/>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>

                <Col width="50" tabletWidth="50">
                    <Card>
                        <CardContent>
                            <Row>
                                <Col width="40" tabletWidth="40">
                                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" height="80"/>
                                </Col>
                                <Col width="60" tabletWidth="60">
                                    <span>Kuota Prestasi : <b>0</b> </span><br/>
                                    <b style={{fontSize:'15px'}}><span>Pendaftar : 0 (0.0%) </span></b>
                                    <hr/>
                                    <span>Diterima : 0 </span><br/>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>

                <Col width="50" tabletWidth="50">
                    <Card>
                        <CardContent>
                            <Row>
                                <Col width="40" tabletWidth="40">
                                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" height="80"/>
                                </Col>
                                <Col width="60" tabletWidth="60">
                                    <span>Kuota Rekap Pendahan Pendaftar : <b>0</b> </span><br/>
                                    <b style={{fontSize:'15px'}}><span>Pendaftar : 0 (0.0%) </span></b>
                                    <hr/>
                                    <span>Diterima : 0 </span><br/>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setLoading: Actions.setLoading,
    }, dispatch);
}

function mapStateToProps({ App }) {
  return {
    loading: App.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BerandaSekolah);
