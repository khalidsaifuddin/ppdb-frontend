import React, { Component } from 'react';
import { 
    Row, 
    Col, 
    Card, 
    CardContent, 
    CardFooter,
    Link,
    Icon
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import { Doughnut, Bar, HorizontalBar } from 'react-chartjs-2';

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
            loading: false,
            kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi') : '052100'
        }
    }

    formatAngka = (num) => {
        if(num){
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }else{
            return 0
        }
    }

    formatTanggal = (val) => {
        const time = new Date(val);
        return time.getDate() + " " + bulan[time.getMonth()] + " " + time.getFullYear();
    }

    componentDidMount(){
        this.setState({ loading: true });
        this.props.BERANDA_getBerandaDinas({kode_wilayah : this.state.kode_wilayah}).then(e => {
            this.setState({ loading: false });
        });

        console.log(this.props);
    }

    render() {
        const { rekap_total, beranda_dinas } = this.props;

        const { loading } = this.state;

        const dataPieKuota = {
            labels: beranda_dinas.kuota_chart.label,
            datasets: [{
                data: beranda_dinas.kuota_chart.data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ]
            }]
        }

        const dataPieJalur = {
            labels: beranda_dinas.jalur_chart.label,
            datasets: [
                {
                    label: 'Pilihan Jalur',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: beranda_dinas.jalur_chart.data
                }
              ]
        }

        const dataDiagramPilihan = {
            labels: beranda_dinas.pilihan_sekolah_chart.label,
            datasets: [
                {
                label: 'Rekap Pilihan',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: beranda_dinas.pilihan_sekolah_chart.data,
                }
            ]
        }

        const dataDiagramStatus = {
            labels: ['SD','SMP'],
            datasets: [
                {
                label: 'Rekap Status Terima',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [
                    beranda_dinas.status_terima.sd,
                    beranda_dinas.status_terima.smp
                ],
                }
            ]
        }

        return (
            <div className="dashboardService">
                <div className="serviceWidgets">
                <Row noGap>
                    <Col width="50" tabletWidth="25">
                    <Card className="serviceItem" style={{backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, #2196f3 0%, #8bccff 100.2%)", minHeight:'120px'}}>
                        <CardContent padding={false}>
                            <h2>{rekap_total.total ? this.formatAngka(rekap_total.total) : '0'} <span>Pendaftar</span></h2>
                            <Link href="/">Lihat Selengkapnya <Icon f7="arrow_right" size="14px"></Icon></Link>
                        </CardContent>
                    </Card>
                    </Col>
                    <Col width="50" tabletWidth="25">
                    <Card className="serviceItem" style={{backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, #4cd964 0%, #6df884 100.2%)", minHeight:'120px'}}>
                        <CardContent padding={false}>
                            <h2>{rekap_total.berkas_valid ? this.formatAngka(rekap_total.berkas_valid) : '0'} <span>Pendaftar Berkas Lengkap</span></h2>
                            <Link href="/">Lihat Selengkapnya <Icon f7="arrow_right" size="14px"></Icon></Link>
                        </CardContent>
                    </Card>
                    </Col>
                    <Col width="50" tabletWidth="25">
                    <Card className="serviceItem" style={{backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, #ff9500 0%, #ffbf65 100.2%)", minHeight:'120px'}}>
                        <CardContent padding={false}>
                            <h2>{rekap_total.konfirmasi ? this.formatAngka(rekap_total.konfirmasi) : '0'} <span>Pendaftar Terkonfirmasi</span></h2>
                            <Link href="/">Lihat Selengkapnya <Icon f7="arrow_right" size="14px"></Icon></Link>
                        </CardContent>
                    </Card>
                    </Col>
                    <Col width="50" tabletWidth="25">
                    <Card className="serviceItem" style={{backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, #9c27b0 0%, #c75ada 100.2%)", minHeight:'120px'}}>
                        <CardContent padding={false}>
                            <h2>{rekap_total.diterima ? this.formatAngka(rekap_total.diterima) : '0'} <span>Pendaftar Diterima</span></h2>
                            <Link href="/">Lihat Selengkapnya <Icon f7="arrow_right" size="14px"></Icon></Link>
                        </CardContent>
                    </Card>
                    </Col>
                </Row>
                </div>
                <div className="serviceWidgets">
                <Row noGap>
                    <Col width="100" tabletWidth="50">
                    <Card className="serviceRecap">
                        <CardContent padding={false}>
                        <div className="serviceChart">
                            <Doughnut
                                data={dataPieKuota}
                                width={100}
                                height={70}
                                options={{
                                    legend: {
                                    display: false,
                                    }
                                }}
                            />
                        </div>
                        <div className="serviceDesc">
                            <h4>Rekap Kuota</h4>
                            <p><span>Kuota</span>{ this.formatAngka(beranda_dinas.kuota.kuota) }</p>
                            <p><span>Pendaftar</span>{ this.formatAngka(beranda_dinas.kuota.pendaftar) }</p>
                            <p><span>Diterima</span>{ this.formatAngka(beranda_dinas.kuota.terima) }</p>
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="serviceRecap">
                        <CardContent padding={false}>
                        <div className="serviceChart">
                            <Bar
                                data={dataDiagramPilihan}
                                width={100}
                                height={70}
                                options={{
                                    maintainAspectRatio: true,
                                    legend: {
                                        display: false,
                                    },
                                    scales: { 
                                        xAxes: [{ 
                                            display: false, 
                                        }], 
                                        yAxes: [{ 
                                            display: false, 
                                        }], 
                                    },
                                }}
                            />
                        </div>
                        <div className="serviceDesc">
                            <h4>Rekap Pilihan</h4>
                            {
                                beranda_dinas.pilihan_sekolah.map((n, key) => {
                                    return (
                                    <p key={key}><span>Pilihan {n.urut_pilihan}</span> { this.formatAngka(n.count) }</p>
                                    )
                                })
                            }
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="serviceRecap">
                        <CardContent padding={false}>
                            <div className="serviceChart">
                                <HorizontalBar
                                    data={dataPieJalur}
                                    width={100}
                                    height={70}
                                    options={{
                                        maintainAspectRatio: true,
                                        legend: {
                                            display: false,
                                        },
                                        scales: { 
                                            xAxes: [{ 
                                                display: false, 
                                            }], 
                                            yAxes: [{ 
                                                display: false, 
                                            }], 
                                        },
                                    }}
                                />
                            </div>
                            <div className="serviceDesc">
                                <h4>Rekap Jalur</h4>
                                {
                                    beranda_dinas.jalur.rows.map((n, key) => {
                                        return (
                                            <p key={key}><span>{n.nama}</span> { this.formatAngka(n.total_semua) }</p>
                                        )
                                    })
                                }
                            </div>
                        </CardContent>
                        {/* <CardFooter>
                            <p className="laneUpdate">Pembaharuan per <b>01-06-2020 12:00</b></p>
                        </CardFooter> */}
                    </Card>
                    <Card className="serviceRecap">
                        <CardContent padding={false}>
                        <div className="serviceChart">
                            <Bar
                                data={dataDiagramStatus}
                                width={100}
                                height={70}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        xAxes: [{
                                            display: false, 
                                        }], 
                                        yAxes: [{ 
                                            display: false, 
                                        }], 
                                    },
                                }}
                            />
                        </div>
                        <div className="serviceDesc">
                            <h4>Rekap Diterima</h4>
                            <p><span>SD</span> { this.formatAngka(beranda_dinas.status_terima.sd) } Anak</p>
                            <p><span>SMP</span> { this.formatAngka(beranda_dinas.status_terima.smp) } Anak</p>
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="serviceRecap">
                        <CardContent className="no-padding" padding={false}>
                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Rekap Jalur</td>
                                        <td>SMP</td>
                                        <td>SD</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.loading && (<tr><td colSpan="3" className="text-center"><i>Loading...</i></td></tr>)
                                    }

                                    {
                                        !this.state.loading && beranda_dinas.jalur.rows.map((n, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{ n.nama }</td>
                                                    <td>{ this.formatAngka(n.smp) }</td>
                                                    <td>{ this.formatAngka(n.sd) }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                    <tr>
                                        <td>Total Rombel</td>
                                        <td>{ this.formatAngka(beranda_dinas.jalur.count_smp) }</td>
                                        <td>{ this.formatAngka(beranda_dinas.jalur.count_sd) }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </CardContent>
                    </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">
                    <Card className="serviceRecap">
                        <CardContent padding={false}>
                        <div className="serviceDesc">
                            <h4>Jadwal PPDB <Link href="/">Lainnya <Icon f7="chevron_right" size="14px"></Icon></Link></h4>
                            <div className="eventList">
                            {
                                this.state.loading && (<i className="text-center">Loading...</i>)
                            }
                            {
                                !this.state.loading && beranda_dinas.jadwal.length === 0 && (<i className="text-center">Tidak ada data untuk ditampilkan</i>)
                            }
                            {
                                !this.state.loading && beranda_dinas.jadwal.map((n, key) => {
                                    return (
                                        <Link href="/" className="eventItem" key={key}>
                                            <h5><Icon f7="calendar_today" size="18px"></Icon> { n.nama } <span> {this.formatTanggal(n.tanggal_mulai)} </span></h5>
                                        </Link>
                                    )
                                })
                            }
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="serviceRecap">
                        <CardContent padding={false}>
                        <div className="serviceDesc">
                            <h4>Dokumentasi PPDB <Link href="/">Lainnya <Icon f7="chevron_right" size="14px"></Icon></Link></h4>
                            <div className="documentList">
                            <Link href="/" className="documentItem">
                                <h5><Icon f7="doc" size="14px"></Icon> Pendaftaran Baru <span>Unduh PDF</span></h5>
                            </Link>
                            <Link href="/" className="documentItem">
                                <h5><Icon f7="doc" size="14px"></Icon> Pedoman Teknis <span>Unduh PDF</span></h5>
                            </Link>
                            <Link href="/" className="documentItem">
                                <h5><Icon f7="doc" size="14px"></Icon> Panduan Pengguna <span>Unduh PDF</span></h5>
                            </Link>
                            <Link href="/" className="documentItem">
                                <h5><Icon f7="doc" size="14px"></Icon> Video Pedoman <span>Unduh PDF</span></h5>
                            </Link>
                            <Link href="/" className="documentItem">
                                <h5><Icon f7="doc" size="14px"></Icon> Jurnal PPDB <span>Unduh PDF</span></h5>
                            </Link>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </Col>        
                </Row>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        BERANDA_getBerandaDinas                         : Actions.BERANDA_getBerandaDinas,
    }, dispatch);
}

function mapStateToProps({ Beranda }) {
    return {
        beranda_dinas                                   : Beranda.beranda_dinas,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BerandaDinas);
