import React, { Component } from 'react';
import { Row, Col, Card, CardContent } from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

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
            loading: false,
            sekolah_id : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).sekolah_id : '',
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
        this.props.BERANDA_getBerandaSekolah({ sekolah_id : this.state.sekolah_id }).then(e => {
            this.setState({ loading: false });
        });
    }

    render() {
      const { loading } = this.state;
      const { beranda_sekolah } = this.props;

      return (
        <>
            <div className="dashboardService">
                <div className="serviceWidgets">
                    <Row noGap>
                        <Col width="100" tabletWidth="100">
                            <Card className="serviceRecap">
                                <CardContent padding={false}>
                                <div className="serviceChart">
                                    <img src="https://lampung17.com/wp-content/uploads/2020/04/61sek.jpg" height="80"/>
                                </div>
                                <div className="serviceDesc">
                                    <h4>{ beranda_sekolah.sekolah.nama }</h4>
                                    <span>{ beranda_sekolah.sekolah.kecamatan }</span><br/>
                                    <span>{ beranda_sekolah.sekolah.alamat_jalan }</span><br/>
                                    <span>Lokasi = lintang: { beranda_sekolah.sekolah.lintang }, Bujur: { beranda_sekolah.sekolah.bujur }</span><br/>
                                    <span>Kuota: { beranda_sekolah.sekolah.kuota }</span><br/>
                                </div>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col width="100" tabletWidth="50">
                            <Card className="serviceRecap">
                                <CardContent padding={false}>
                                <div className="serviceChart">
                                    <img src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png" height="80"/>
                                </div>
                                <div className="serviceDesc">
                                    <h4>{beranda_sekolah.pendaftar.kuota_0400.nama}</h4> {/* Zonasi */}
                                    <p><span>Kuota</span>{ this.formatAngka(beranda_sekolah.sekolah.kuota_0400) }</p>
                                    <p><span>Pendaftar</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0400.pendaftar) }</p>
                                    <p><span>Diterima</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0400.terima) }</p>
                                </div>
                                </CardContent>
                            </Card>
                        </Col>

                        <Col width="100" tabletWidth="50">
                            <Card className="serviceRecap">
                                <CardContent padding={false}>
                                <div className="serviceChart">
                                    <img src="https://lh3.googleusercontent.com/proxy/b4-38f7EmDOoy333KtydPHGRG1YvGlArerQuDRE9g1aJDgdcPedUFoGYY_Fb34B_-cMv7ibngeeJCfF87o2ibokwAtHlGLene6PnGQ" height="80"/>
                                </div>
                                <div className="serviceDesc">
                                    <h4>{beranda_sekolah.pendaftar.kuota_0100.nama}</h4> {/* Affirmasi */}
                                    <p><span>Kuota</span>{ this.formatAngka(beranda_sekolah.sekolah.kuota_0100) }</p>
                                    <p><span>Pendaftar</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0100.pendaftar) }</p>
                                    <p><span>Diterima</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0100.terima) }</p>
                                </div>
                                </CardContent>
                            </Card>
                        </Col>

                        <Col width="100" tabletWidth="50">
                            <Card className="serviceRecap">
                                <CardContent padding={false}>
                                <div className="serviceChart">
                                    <img src="https://cdn.statically.io/img/pngimage.net/wp-content/uploads/2018/06/orang-tua-png.png" height="80"/>
                                </div>
                                <div className="serviceDesc">
                                    <h4>{beranda_sekolah.pendaftar.kuota_0200.nama}</h4> {/* Perpindahan Orang Tua */}
                                    <p><span>Kuota</span>{ this.formatAngka(beranda_sekolah.sekolah.kuota_0200) }</p>
                                    <p><span>Pendaftar</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0200.pendaftar) }</p>
                                    <p><span>Diterima</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0200.terima) }</p>
                                </div>
                                </CardContent>
                            </Card>
                        </Col>

                        <Col width="100" tabletWidth="50">
                            <Card className="serviceRecap">
                                <CardContent padding={false}>
                                <div className="serviceChart">
                                    <img src="https://lh3.googleusercontent.com/proxy/frl1BN6A6er7d3JPbGAIKqc1KqtVwG677Z5U3plrRuGQ0bXGxudlW8INSCnFKEj6Js_WrUBudso6jaOs7zGh7OQwuupN50ymFaNmNan0JrJvMRF5naHByw" height="80"/>
                                </div>
                                <div className="serviceDesc">
                                    <h4>{beranda_sekolah.pendaftar.kuota_0500.nama}</h4> {/* Tahfidz */}
                                    <p><span>Kuota</span>{ this.formatAngka(beranda_sekolah.sekolah.kuota_0500) }</p>
                                    <p><span>Pendaftar</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0500.pendaftar) }</p>
                                    <p><span>Diterima</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0500.terima) }</p>
                                </div>
                                </CardContent>
                            </Card>
                        </Col>

                        <Col width="100" tabletWidth="50">
                            <Card className="serviceRecap">
                                <CardContent padding={false}>
                                <div className="serviceChart">
                                    <img src="https://yosca.id/img/medal.png" height="80"/>
                                </div>
                                <div className="serviceDesc">
                                    <h4>{beranda_sekolah.pendaftar.kuota_0300.nama}</h4> {/* Minat dan Bakat */}
                                    <p><span>Kuota</span>{ this.formatAngka(beranda_sekolah.sekolah.kuota_0300) }</p>
                                    <p><span>Pendaftar</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0300.pendaftar) }</p>
                                    <p><span>Diterima</span>{ this.formatAngka(beranda_sekolah.pendaftar.kuota_0300.terima) }</p>
                                </div>
                                </CardContent>
                            </Card>
                        </Col>

                        <Col width="100" tabletWidth="50">
                            <Card className="serviceRecap">
                                <CardContent padding={false}>
                                <div className="serviceChart">
                                    <img src="https://image.flaticon.com/icons/svg/2192/2192432.svg" height="80"/>
                                </div>
                                <div className="serviceDesc">
                                    <h4>Rekap Pilihan Pendaftar</h4>
                                    {
                                        beranda_sekolah.pilihan_sekolah.map((n, key) => {
                                            return (
                                            <p key={key}><span>Pilihan {n.urut_pilihan}</span>{ this.formatAngka(n.count) }</p>
                                            )
                                        })
                                    }
                                </div>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        BERANDA_getBerandaSekolah           : Actions.BERANDA_getBerandaSekolah,
    }, dispatch);
}

function mapStateToProps({ Beranda }) {
    return {
        beranda_sekolah                     : Beranda.beranda_sekolah,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BerandaSekolah);
