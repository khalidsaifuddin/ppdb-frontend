import React, { Component } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Block,
  Card,
  BlockHeader,
  List,
  ListItem,
  Row,
  Col,
  Icon,
  CardHeader,
  CardContent,
  Badge,
  Progressbar
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import io from 'socket.io-client';
import Countdown from 'react-countdown';

class Beranda extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      loading: true,
      data: {
        r_kelas: [],
        perpustakaan: [],
      },
      pertanyaan: {
        rows: [],
        total: 0,
      },
      users: [],
      loadingPertanyaan: true,
      notifikasi: {
        rows: [],
        total: 0,
      },
    };
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
    'Desember',
  ]

  formatAngka = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  componentDidMount = () => {
    if(parseInt(localStorage.getItem('sudah_login')) !== 1) {
      this.$f7router.navigate('/login/');
    }

    localStorage.setItem('current_url', '/');

    let socket = io(localStorage.getItem('socket_url'));

    socket.on('updateUserList', (users) => {
      this.setState({
        users
      }, ()=> {
        console.log(this.state.users);
      });
    });

    if(parseInt(localStorage.getItem('sudah_login')) === 1) {
      this.setState({
        routeParamsNotifikasi: {
          pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
          dibaca: "1",
        }
      }, ()=> {
        this.props.getNotifikasi(this.state.routeParamsNotifikasi).then((result)=> {
          this.setState({
            notifikasi: this.props.notifikasi,
          });
        });

        this.props.getKuisDiikuti(this.state.routeParamsNotifikasi).then((result)=> {});

        this.props.getRuangDiikuti(this.state.routeParamsNotifikasi).then((result)=> {});  
      });
    }
  }

  render() {
    const Completionist = () => <span>Kegiatan akan segera dimulai!</span>;
    
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return <Completionist />;
      } else {
        return <div className="jadwalCountdown">
          <div className="jadwalItem">
            {days}
            <span>Hari</span>
          </div>
          <div className="jadwalItem">
            {hours}
            <span>Jam</span>
          </div>
          <div className="jadwalItem">
            {minutes}
            <span>Menit</span>
          </div>
          <div className="jadwalItem">
            {seconds}
            <span>Detik</span>
          </div>
        </div>;
      }
    };

    return (
      <Page name="Beranda" hideBarsOnScroll>
        {localStorage.getItem('sudah_login') === '1' &&
          <Navbar 
            sliding={false} 
            large
          >
            <NavLeft>
              <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" className="sideMenuToggle" />
            </NavLeft>
            <NavTitle sliding>{localStorage.getItem('judul_aplikasi')}</NavTitle>
            <NavRight>
              <Link iconOnly href="/notifikasi" style={{marginLeft:'0px'}}> 
                <Icon ios={this.state.notifikasi.result > 0 ? "f7:bell_fill" : "f7:bell"} aurora={this.state.notifikasi.result > 0 ? "f7:bell_fill" : "f7:bell"} md={this.state.notifikasi.result > 0 ? "material:bell_fill" : "material:bell"} tooltip="Notifikasi">
                  {this.state.notifikasi.result > 0 && <Badge color="red">{this.state.notifikasi.result}</Badge>}
                </Icon>
              </Link>
              <Link href="/ProfilPengguna">
                <img style={{height:'30px', borderRadius:'50%', marginLeft:'0px'}} src={JSON.parse(localStorage.getItem('user')).gambar} />
              </Link>
            </NavRight>
          </Navbar>
        }
        <div className="contentApp">
          <Block className="gridMenu">
            <Link href="/Cari">
              <img src="./static/images/icons/cari-data.svg" alt="cari-data" />
              Cari Data
            </Link>
            <Link href="/tambahCalonPesertaDidik/">
              <img src="./static/images/icons/formulir.svg" alt="formulir" />
              Formulir
            </Link>
            <Link href="/">
              <img src="./static/images/icons/jadwal.svg" alt="jadwal" />
              Jadwal
            </Link>
            <Link href="/">
              <img src="./static/images/icons/petunjuk.svg" alt="petunjuk" />
              Petunjuk
            </Link>
            <Link href="/">
              <img src="./static/images/icons/kuota.svg" alt="kuota" />
              Kuota
            </Link>
            <Link href="/">
              <img src="./static/images/icons/pengumuman.svg" alt="pengumuman" />
              Pengumuman
            </Link>
          </Block>
          <Block className="rekapitulasiProgres">
            <BlockHeader>JALUR PENDAFTARAN PROGRES</BlockHeader>
            <Row>
              <Col width="50" tabletWidth="25">
                <div className="rekapItem rekap--zonasi">
                  <div className="rekapDesc">
                    <h4>Jalur Zonasi : <strong>17943</strong></h4>
                    <h5><span>Pendaftar : <i>12682</i></span> <strong>(70.68%)</strong></h5>
                    <Progressbar color="black" progress={70.86}></Progressbar>
                    <div className="rekapAction">
                      <p>Diterima : <strong>11539</strong></p>
                      <Link href="/"><Icon f7="arrow_right_circle" size="18px" color="white"></Icon></Link>
                    </div>
                  </div>
                  <img className="bgIcon" src="./static/images/icons/zonasi.svg" alt="zonasi"/>
                </div>
              </Col>
              <Col width="50" tabletWidth="25">
                <div className="rekapItem rekap--afirmasi">
                  <div className="rekapDesc">
                    <h4>Jalur Afirmasi : <strong>269</strong></h4>
                    <h5><span>Pendaftar : <i>248</i></span> <strong>(92.19%)</strong></h5>
                    <Progressbar color="black" progress={92.19}></Progressbar>
                    <div className="rekapAction">
                      <p>Diterima : <strong>208</strong></p>
                      <Link href="/"><Icon f7="arrow_right_circle" size="18px" color="white"></Icon></Link>
                    </div>
                  </div>
                  <img className="bgIcon" src="./static/images/icons/afirmasi.svg" alt="afirmasi"/>
                </div>
              </Col>
              <Col width="50" tabletWidth="25">
                <div className="rekapItem rekap--prestasi">
                  <div className="rekapDesc">
                    <h4>Jalur Prestasi : <strong>101</strong></h4>
                    <h5><span>Pendaftar : <i>34</i></span> <strong>(33.66%)</strong></h5>
                    <Progressbar color="black" progress={33.66}></Progressbar>
                    <div className="rekapAction">
                      <p>Diterima : <strong>34</strong></p>
                      <Link href="/"><Icon f7="arrow_right_circle" size="18px" color="white"></Icon></Link>
                    </div>
                  </div>
                  <img className="bgIcon" src="./static/images/icons/prestasi.svg" alt="prestasi"/>
                </div>
              </Col>
              <Col width="50" tabletWidth="25">
                <div className="rekapItem rekap--ortu">
                  <div className="rekapDesc">
                    <h4>Jalur Perpindahan Ortu : <strong>26894</strong></h4>
                    <h5><span>Pendaftar : <i>12217</i></span> <strong>(45.43%)</strong></h5>
                    <Progressbar color="black" progress={45.43}></Progressbar>
                    <div className="rekapAction">
                      <p>Diterima : <strong>12216</strong></p>
                      <Link href="/"><Icon f7="arrow_right_circle" size="18px" color="white"></Icon></Link>
                    </div>
                  </div>
                  <img className="bgIcon" src="./static/images/icons/perpindahan-ortu.svg" alt="perpindahan ortu"/>
                </div>
              </Col>
            </Row>
          </Block>
          <Block className="pelaksanaanPpdb">
            <Row>
              <Col width="100" tabletWidth="33">
                <BlockHeader>JADWAL SAAT INI</BlockHeader>
                <div className="jadwalPpdb">
                  <Card>
                    <CardHeader>
                      Sosialisasi PPDB ke SMP
                      <div className="subHeader">
                        <div>
                          <Icon f7="location" size="18px"></Icon>
                          <span>Video Conference</span>
                        </div>
                        <div>
                          <Icon f7="calendar" size="18px"></Icon>
                          <span>12 Mei 2020</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Countdown
                        date={Date.now() + 259200000}
                        renderer={renderer}
                      />
                    </CardContent>
                  </Card>
                </div>
                <BlockHeader>JADWAL SELANJUTNYA</BlockHeader>
                <div className="jadwalPpdb">
                  <List mediaList>
                    <ListItem link="/" title="Sosialisasi PPDB ke SD" after="13 Mei 2020" />
                    <ListItem link="/" title="Pendaftaran Periode Pendataan Calon Peserta Didik di Aplikasi PPDB" after="14-22 Mei 2020" />
                    <ListItem link="/" title="Pendaftaran Periode Seleksi PPDB Online Utama" after="1-6 Juni 2020"/>
                  </List>
                </div>
              </Col>
              <Col width="100" tabletWidth="66">
                <BlockHeader className="onlyOnDesktop">RESUME (RINGKASAN)</BlockHeader>
                <div className="resumeTable">
                  <Row>
                    <Col width="100" tabletWidth="66">
                      <BlockHeader className="onlyOnMobile" style={{marginTop: 16}}>JALUR RESUME (RINGKASAN)</BlockHeader>
                      <div className="data-table card">
                        <table>
                          <thead>
                            <tr>
                              <th className="label-cell">Jalur</th>
                              <th className="numeric-cell">Kuota</th>
                              <th className="numeric-cell">Siswa</th>
                              <th className="numeric-cell">Lulus</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="label-cell">Afirmasi</td>
                              <td className="numeric-cell">150</td>
                              <td className="numeric-cell">80</td>
                              <td className="numeric-cell">75</td>
                            </tr>
                            <tr>
                              <td className="label-cell">Pindahan</td>
                              <td className="numeric-cell">20</td>
                              <td className="numeric-cell">10</td>
                              <td className="numeric-cell">10</td>
                            </tr>
                            <tr>
                              <td className="label-cell">Zonasi</td>
                              <td className="numeric-cell">320</td>
                              <td className="numeric-cell">340</td>
                              <td className="numeric-cell">300</td>
                            </tr>
                            <tr>
                              <td className="label-cell">Prestasi</td>
                              <td className="numeric-cell">180</td>
                              <td className="numeric-cell">150</td>
                              <td className="numeric-cell">100</td>
                            </tr>
                            <tr>
                              <td className="label-cell">Tahfiz</td>
                              <td className="numeric-cell">15</td>
                              <td className="numeric-cell">13</td>
                              <td className="numeric-cell">5</td>
                            </tr>
                            <tr>
                              <td className="label-cell"><b>Jumlah</b></td>
                              <td className="numeric-cell"><b>485</b></td>
                              <td className="numeric-cell"><b>493</b></td>
                              <td className="numeric-cell"><b>300</b></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                    <Col width="100" tabletWidth="33">
                      <BlockHeader className="onlyOnMobile" style={{marginTop: 16}}>JARAK RESUME (RINGKASAN)</BlockHeader>
                      <div className="data-table card">
                        <table>
                          <thead>
                            <tr>
                              <th className="label-cell">Jarak</th>
                              <th className="numeric-cell">Jumlah Siswa</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="label-cell">0m - 500m</td>
                              <td className="numeric-cell">75</td>
                            </tr>
                            <tr>
                              <td className="label-cell">500m - 1km</td>
                              <td className="numeric-cell">10</td>
                            </tr>
                            <tr>
                              <td className="label-cell">1km - 2km</td>
                              <td className="numeric-cell">300</td>
                            </tr>
                            <tr>
                              <td className="label-cell">2km - 4km</td>
                              <td className="numeric-cell">100</td>
                            </tr>
                            <tr>
                              <td className="label-cell">> 4km</td>
                              <td className="numeric-cell">5</td>
                            </tr>
                            <tr>
                              <td className="label-cell"><b>Jumlah</b></td>
                              <td className="numeric-cell"><b>300</b></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Block>
        </div>
      </Page>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
    setTabActive: Actions.setTabActive,
    getPertanyaan: Actions.getPertanyaan,
    getNotifikasi: Actions.getNotifikasi,
    simpanPantauan: Actions.simpanPantauan,
    getKuisDiikuti: Actions.getKuisDiikuti,
    getRuangDiikuti: Actions.getRuangDiikuti,
  }, dispatch);
}

function mapStateToProps({ App, Pertanyaan, Notifikasi, Kuis, Ruang }) {
  return {
    window_dimension: App.window_dimension,
    loading: App.loading,
    tabBar: App.tabBar,
    wilayah: App.wilayah,
    pertanyaan: Pertanyaan.pertanyaan,
    dummy_rows: App.dummy_rows,
    notifikasi: Notifikasi.notifikasi,
    kuis_diikuti: Kuis.kuis_diikuti,
    ruang_diikuti: Ruang.ruang_diikuti,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beranda);
