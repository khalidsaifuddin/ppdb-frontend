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

class BerandaDinas extends Component {
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
        const { rekap_total } = this.props;

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
            <>
                <Row noGap>
                    <Col width="50" tabletWidth="25">
                    <Card style={{minWidth:'200px'}}>
                        <CardContent style={{textAlign:'center'}}>
                        <b style={{fontSize:'30px'}}>{rekap_total.total ? this.formatAngka(rekap_total.total) : '0'}</b><br/>
                        Pendaftar
                        </CardContent>
                    </Card>
                    </Col>
                    <Col width="50" tabletWidth="25">
                    <Card style={{minWidth:'200px'}}>
                        <CardContent style={{textAlign:'center'}}>
                        <b style={{fontSize:'30px'}}>{rekap_total.berkas_valid ? this.formatAngka(rekap_total.berkas_valid) : '0'}</b><br/>
                        Pendaftar Berkas Lengkap
                        </CardContent>
                    </Card>
                    </Col>
                    <Col width="50" tabletWidth="25">
                    <Card style={{minWidth:'200px'}}>
                        <CardContent style={{textAlign:'center'}}>
                        <b style={{fontSize:'30px'}}>{rekap_total.konfirmasi ? this.formatAngka(rekap_total.konfirmasi) : '0'}</b><br/>
                        Pendaftar Terkonfirmasi
                        </CardContent>
                    </Card>
                    </Col>
                    <Col width="50" tabletWidth="25">
                    <Card style={{minWidth:'200px'}}>
                        <CardContent style={{textAlign:'center'}}>
                        <b style={{fontSize:'30px'}}>{rekap_total.diterima ? this.formatAngka(rekap_total.diterima) : '0'}</b><br/>
                        Pendaftar Diterima
                        </CardContent>
                    </Card>
                    </Col>
                </Row>
                
                <Row noGap>
                    <Col width="50" tabletWidth="50">
                        <Row noGap>
                            <Col width="50" tabletWidth="50">
                                <Card>
                                    <CardContent>
                                        <Row>
                                            <Col width="40" tabletWidth="40">
                                                <Doughnut
                                                    data={dataPie}
                                                    width={100}
                                                    height={70}
                                                    options={{
                                                        legend: {
                                                            display: false,
                                                        }
                                                    }}
                                                />
                                            </Col>
                                            <Col width="60" tabletWidth="60">
                                                <span>Kuota : <b>0</b> </span><br/>
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
                                                <Bar
                                                    data={dataDiagram}
                                                    width={100}
                                                    height={70}
                                                    options={{
                                                        maintainAspectRatio: false,
                                                        legend: {
                                                            display: false,
                                                        },
                                                        scales: { xAxes: [{ display: false, }], yAxes: [{ display: false, }], },
                                                    }}
                                                />
                                            </Col>
                                            <Col width="60" tabletWidth="60">
                                                <span>Kuota Pilihan : <b>0</b> </span><br/>
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
                                                <Pie
                                                    data={dataPie}
                                                    width={100}
                                                    height={70}
                                                    options={{
                                                        legend: {
                                                            display: false,
                                                        }
                                                    }}
                                                />
                                            </Col>
                                            <Col width="60" tabletWidth="60">
                                                <span>Kuota Jalur : <b>0</b> </span><br/>
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
                                                <Bar
                                                    data={dataDiagram}
                                                    width={100}
                                                    height={70}
                                                    options={{
                                                        maintainAspectRatio: false,
                                                        legend: {
                                                            display: false,
                                                        },
                                                        scales: { xAxes: [{ display: false, }], yAxes: [{ display: false, }], },
                                                    }}
                                                />
                                            </Col>
                                            <Col width="60" tabletWidth="60">
                                                <span>SD : <b>0</b> </span><br/>
                                                <span>SMP : <b>0</b> </span><br/>
                                            </Col>
                                        </Row>
                                    </CardContent>
                                </Card>
                            </Col>
                            <Col width="100" tabletWidth="100">                                
                                <div className="data-table card table-beranda">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>Rekap Jalur</td>
                                                <td>SMP</td>
                                                <td>SD</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Zonasi</td>
                                                <td>0</td>
                                                <td>0</td>
                                            </tr>
                                            <tr>
                                                <td>ALternatif</td>
                                                <td>0</td>
                                                <td>0</td>
                                            </tr>
                                            <tr>
                                                <td>Pindahan</td>
                                                <td>0</td>
                                                <td>0</td>
                                            </tr>
                                            <tr>
                                                <td>Pestasi</td>
                                                <td>0</td>
                                                <td>0</td>
                                            </tr>
                                            <tr>
                                                <td>Tahfiz</td>
                                                <td>0</td>
                                                <td>0</td>
                                            </tr>
                                        </tbody>
                                        <thead>
                                            <tr>
                                                <td>Total Rombel</td>
                                                <td>0</td>
                                                <td>0</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col width="50" tabletWidth="50">
                        <Row>
                            <Col width="100" tabletWidth="100" style={{ marginBottom: '-10px' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Jadwal PPDB</h4>
                                        <Row>
                                            <Col width="80">Pembukaan Pendaftaran SD</Col>
                                            <Col width="20"><b>30 Mei 2020</b></Col>
                                        </Row>

                                        <Row>
                                            <Col width="80">Pembukaan Pendaftaran SMP</Col>
                                            <Col width="20"><b>30 Mei 2020</b></Col>
                                        </Row>
                                    
                                        <Row>
                                            <Col width="80">Pembukaan Pendaftaran SMA</Col>
                                            <Col width="20"><b>30 Mei 2020</b></Col>
                                        </Row>
                                    </CardContent>
                                </Card>
                            </Col>
                        </Row>

                        <Card style={{ marginTop: 25 }}>
                            <CardContent>
                                <h4>Dokumentasi PPDB</h4>
                                <Row>
                                    <Col width="100" tabletWidth="100" style={{ marginBottom: 5 }}>
                                        <Row>
                                            <Col width="80"><span>Pendaftaran Baru</span></Col>
                                            <Col width="20"><Button fillIos>Download</Button></Col>
                                        </Row>
                                    </Col>
                                    <Col width="100" tabletWidth="100" style={{ marginBottom: 5 }}>
                                        <Row>
                                            <Col width="80"><span>Pedoman Taknis</span></Col>
                                            <Col width="20"><Button fillIos>Download</Button></Col>
                                        </Row>
                                    </Col>
                                    <Col width="100" tabletWidth="100" style={{ marginBottom: 5 }}>
                                        <Row>
                                            <Col width="80"><span>Penduan Pengguna</span></Col>
                                            <Col width="20"><Button fillIos>Download</Button></Col>
                                        </Row>
                                    </Col>
                                    <Col width="100" tabletWidth="100" style={{ marginBottom: 5 }}>
                                        <Row>
                                            <Col width="80"><span>Video Pedoman</span></Col>
                                            <Col width="20"><Button fillIos>Download</Button></Col>
                                        </Row>
                                    </Col>
                                    <Col width="100" tabletWidth="100" style={{ marginBottom: 5 }}>
                                        <Row>
                                            <Col width="80"><span>Jurnal PPDB</span></Col>
                                            <Col width="20"><Button fillIos>Download</Button></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>        
                </Row>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BerandaDinas);
