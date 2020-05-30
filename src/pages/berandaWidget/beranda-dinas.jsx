import React, { Component } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  CardContent, 
  CardFooter,
  Button,
  Link,
  Icon
} from 'framework7-react';
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
      loading: false,
    }
  }

  formatAngka = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  formatTanggal = (val) => {
    const time = new Date(val);

    return time.getDate() + " " + bulan[time.getMonth()] + " " + time.getFullYear();
  }

  render() {
    const { rekap_total } = this.props;

    const { loading } = this.state;

    const dataPie = {
      labels: [
        'Red',
        'Green',
        'Yellow',
      ],
      datasets: [{
        data: [300, 50, 100],
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
          data: [80, 50, 45],
        }
      ]
    }

    return (
      <div className="dashboardService">
        <div className="serviceWidgets">
          <Row noGap>
            <Col width="50" tabletWidth="25">
              <Card className="serviceItem" style={{backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, #2196f3 0%, #8bccff 100.2%)"}}>
                <CardContent padding={false}>
                  <h2>{rekap_total.total ? this.formatAngka(rekap_total.total) : '0'} <span>Pendaftar</span></h2>
                  <Link href="/">Lihat Selengkapnya <Icon f7="arrow_right" size="14px"></Icon></Link>
                </CardContent>
              </Card>
            </Col>
            <Col width="50" tabletWidth="25">
              <Card className="serviceItem" style={{backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, #4cd964 0%, #6df884 100.2%)"}}>
                <CardContent padding={false}>
                  <h2>{rekap_total.berkas_valid ? this.formatAngka(rekap_total.berkas_valid) : '0'} <span>Pendaftar Berkas Lengkap</span></h2>
                  <Link href="/">Lihat Selengkapnya <Icon f7="arrow_right" size="14px"></Icon></Link>
                </CardContent>
              </Card>
            </Col>
            <Col width="50" tabletWidth="25">
              <Card className="serviceItem" style={{backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, #ff9500 0%, #ffbf65 100.2%)"}}>
                <CardContent padding={false}>
                  <h2>{rekap_total.konfirmasi ? this.formatAngka(rekap_total.konfirmasi) : '0'} <span>Pendaftar Terkonfirmasi</span></h2>
                  <Link href="/">Lihat Selengkapnya <Icon f7="arrow_right" size="14px"></Icon></Link>
                </CardContent>
              </Card>
            </Col>
            <Col width="50" tabletWidth="25">
              <Card className="serviceItem" style={{backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, #9c27b0 0%, #c75ada 100.2%)"}}>
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
                      data={dataPie}
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
                    <p><span>Kuota</span> 0</p>
                    <p><span>Pendaftar</span> 0 (0.0%)</p>
                    <p><span>Diterima</span> 0</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="serviceRecap">
                <CardContent padding={false}>
                  <div className="serviceChart">
                    <Bar
                      data={dataDiagram}
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
                    <h4>Rekap Pilihan</h4>
                    <p><span>Pilihan 1</span> 10,000</p>
                    <p><span>Pilihan 2</span> 11,000</p>
                    <p><span>Pilihan 3</span> 12,000</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="serviceRecap">
                <CardContent padding={false}>
                  <div className="serviceChart">
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
                  </div>
                  <div className="serviceDesc">
                    <h4>Rekap Jalur</h4>
                    <p><span>Affirmasi</span> 10,000</p>
                    <p><span>Zonasi</span> 11,000</p>
                    <p><span>Prestasi</span> 12,000</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="laneUpdate">Pembaharuan per <b>01-06-2020 12:00</b></p>
                </CardFooter>
              </Card>
              <Card className="serviceRecap">
                <CardContent padding={false}>
                  <div className="serviceChart">
                    <Bar
                      data={dataDiagram}
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
                    <p><span>SD</span> 7,500 Anak</p>
                    <p><span>SMP</span> 3,300 Anak</p>
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
                        <tr>
                          <td>Zonasi</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Alternatif</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Pindahan</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Prestasi</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Tahfiz</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Total Rombel</td>
                          <td>0</td>
                          <td>0</td>
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
                      <Link href="/" className="eventItem">
                        <h5><Icon f7="calendar_today" size="18px"></Icon> Sosialisasi SD <span>28-30 Mei 2020</span></h5>
                      </Link>
                      <Link href="/" className="eventItem">
                        <h5><Icon f7="calendar_today" size="18px"></Icon> Sosialisasi SMP <span>28-30 Mei 2020</span></h5>
                      </Link>
                      <Link href="/" className="eventItem">
                        <h5><Icon f7="calendar_today" size="18px"></Icon> Pembukaan Pendaftaran SD <span>28-30 Mei 2020</span></h5>
                      </Link>
                      <Link href="/" className="eventItem">
                        <h5><Icon f7="calendar_today" size="18px"></Icon> Pembukaan Pendaftaran SMP <span>28-30 Mei 2020</span></h5>
                      </Link>
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
    setLoading: Actions.setLoading,
  }, dispatch);
}

function mapStateToProps({ App }) {
  return {
    loading: App.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BerandaDinas);
