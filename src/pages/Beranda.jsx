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
  List,
  ListItem,
  Row,
  Col,
  Icon,
  CardHeader,
  CardContent,
  Badge,
  Button
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import io from 'socket.io-client';

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

class Beranda extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      loading: true,
      loadingPendaftaran : true,
      loadingJadwal: true,
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
      entities:{
        rows: [],
        count: 0,
      }
    };
  }

  formatAngka = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  formatTanggal = (val) => {
    const time = new Date(val);

    return time.getDate() + " " + bulan[time.getMonth()] + " " + time.getFullYear();
  }

  componentDidMount = () => {
    if(parseInt(localStorage.getItem('sudah_login')) !== 1) {
      // console.log(this.$f7route.url);
      let arrUrl = window.location.href.split("#");

      if(arrUrl.length > 1){
        switch (arrUrl[1]) {
          case 'loginsekolah':
            this.$f7router.navigate('/loginSekolah/');
            break;
        
          default:
            // this.$f7router.navigate('/loginSekolah/');
            this.$f7router.navigate('/login/');
            break;
        }
      }else{
        this.$f7router.navigate('/login/');
      }

    }

    localStorage.setItem('current_url', '/');

    let socket = io(localStorage.getItem('socket_url'));

    socket.on('updateUserList', (users) => {
      this.setState({
        users
      }, ()=> {});
    });

    if(parseInt(localStorage.getItem('sudah_login')) === 1) {
      this.setState({
        loadingPendaftaran: true,
        loadingJadwal: true,
        routeParamsNotifikasi: {
          pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
          dibaca: "1",
        },
        routeParams: {
          ...this.state.routeParams,
          limit: 2,
          pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
        }
      }, ()=> {
        this.props.getNotifikasi(this.state.routeParamsNotifikasi).then((result)=> {
          this.setState({
            notifikasi: this.props.notifikasi,
          });
        });

        this.props.getCalonPD(this.state.routeParams).then(e => {
          this.setState({ 
            loadingPendaftaran: false ,
            entities: this.props.entities,
          });
        });

        this.props.getJKberanda().then(e => {
          this.setState({
            loadingJadwal: false,
          });
        });
      });
    }
  }

  render() {
    const { jkBeranda } = this.props;

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
            {parseInt(localStorage.getItem('sudah_pilih_kota')) === 1  &&
              <NavRight>
                {/* <Button raised fill href="/loginSekolah/">
                  <Icon ios="f7:building_2_fill" style={{fontSize:'17px'}} tooltip="Notifikasi"/>
                  Dasbor Sekolah
                </Button> */}
                <Link iconOnly href="/notifikasi/">
                  <Icon ios={this.state.notifikasi.result > 0 ? "f7:bell_fill" : "f7:bell"} aurora={this.state.notifikasi.result > 0 ? "f7:bell_fill" : "f7:bell"} md={this.state.notifikasi.result > 0 ? "material:bell_fill" : "material:bell"} tooltip="Notifikasi">
                    {this.state.notifikasi.result > 0 && <Badge color="red">{this.state.notifikasi.result}</Badge>}
                  </Icon>
                </Link>
                <Link href="/ProfilPengguna/">
                  <img style={{height:'30px', borderRadius:'50%', marginLeft:'0px'}} src={JSON.parse(localStorage.getItem('user')).gambar} />
                </Link>
              </NavRight>
            }
          </Navbar>
        }
        <div className="contentApp">
          <div className="bgMain"></div>
          <div className="titleMain">
            <img src={localStorage.getItem('logo_wilayah')} height="70" alt="logo" />
            <h2>{localStorage.getItem('judul_aplikasi')}</h2>
            <h6>{localStorage.getItem('sub_judul_aplikasi')}</h6>
          </div>
          <Block className="gridMenu">
            <Link href="/Cari/">
              <img src="./static/images/icons/cari-data.svg" alt="cari data" />
              Cari<br/>Data
            </Link>
            <Link href="/tambahCalonPesertaDidik/">
              <img src="./static/images/icons/formulir-pendaftaran.svg" alt="formulir pendaftaran" />
              Formulir<br/> Pendaftaran
            </Link>
            <Link href="/Daftar/">
              <img src="./static/images/icons/data-pendaftar.svg" alt="data pendaftar" />
              Data<br/>Pendaftar
            </Link>
            <Link href="/detailCalonpdSekolah/">
              <img src="./static/images/icons/daftar-sekolah.svg" alt="daftar sekolah" />
              Daftar<br/>Sekolah
            </Link>
            <Link href="/JadwalKegiatan/">
            <img src="./static/images/icons/jadwal-kegiatan.svg" alt="jadwal kegiatan" />
              Jadwal<br/>Kegiatan
            </Link>
            <Link href="/ProfilPengguna/">
              <img src="./static/images/icons/profil-pengguna.svg" alt="profil pengguna" />
              Profil<br/>Pengguna
            </Link>
          </Block>
          <Block className="pelaksanaanPpdb">
            <Row>
              <Col width="100" tabletWidth="65">
                <Block className="rekapitulasiProgres">
                  <div className="headerWidget">
                    <h2>PENDAFTARAN ANDA</h2>
                    <Button raised fill onClick={()=>this.$f7router.navigate("/Daftar/")} color="gray">Selengkapnya</Button>
                  </div>
                  {this.state.loadingPendaftaran && (<div>Loading...</div>)}
                  {!this.state.loadingPendaftaran && this.state.entities.rows.length === 0 ? (
                    <Card className="noRegistration" noShadow noBorder>
                      <CardContent padding={false}>
                        <img src="/static/images/icons/no-sekolah.svg" alt="sekolah"/>
                        <h4>Anda belum mendaftar ke sekolah manapun.</h4>
                        <Button raised fill onClick={()=>this.$f7router.navigate("/tambahCalonPesertaDidik/")}>Daftar disini!</Button>
                      </CardContent>
                    </Card>
                  ) : ''}
                  {!this.state.loadingPendaftaran && this.props.entities.rows.map((option, key)=> {
                    return (
                      <Card key={key} noShadow noBorder style={{marginLeft:'0px', marginRight:'0px'}}>
                        <CardHeader>
                          <Link href="#">
                            <div>
                              {option.nama}&nbsp;({option.nik})
                            </div>
                          </Link>
                        </CardHeader>
                        <CardContent style={{padding:'4px'}}>
                          <Row noGap>
                            {option.pilihan_sekolah.map((optionSekolah, key)=>{
                              return (
                                <Col width="33" tabletWidth="33" key={key}>
                                  <Card style={{minHeight:'100px', margin:'8px', textAlign:'center', backgroundImage:'url(http://foto.data.kemdikbud.go.id/getImage/' + optionSekolah.npsn + '/1.jpg)', backgroundSize:'cover'}}>
                                    <CardContent style={{padding:'4px', background: 'rgba(0, 0, 0, 0.5)', minHeight:'100px'}}>
                                      <div style={{fontSize:'12px', color:'white', minHeight:'35px'}}><b>{optionSekolah.nama_sekolah}</b></div>
                                      <div style={{fontSize:'12px', color:'#FFF9C4', fontWeight:'bold'}}>Jalur {optionSekolah.jalur}</div>
                                      <div style={{fontSize:'12px', color:'white'}}>No.Urut Sementara</div>
                                      <div style={{fontSize:'25px', fontWeight:'bold', color:'white'}}>{optionSekolah.urutan}/{optionSekolah.kuota}</div>
                                    </CardContent>
                                  </Card>
                                </Col>
                              )
                            })}
                          </Row>
                        </CardContent>
                      </Card>
                    )
                  })}
                </Block>
              </Col>
              <Col width="100" tabletWidth="35">
                <Block className="rekapitulasiProgres">
                  <div className="headerWidget">
                    <h2>JADWAL KEGIATAN</h2>
                  </div>
                  <div className="jadwalPpdb">
                    {this.state.loadingJadwal && (<div>Loading...</div>)}
                    {!this.state.loadingJadwal && jkBeranda.length === 0 ? (
                      <Card className="noDaftarKegiatan" noShadow noBorder>
                        <CardContent padding={false}>
                          <img src="/static/images/icons/no-jadwal.svg" alt="jadwal"/>
                          <h4>Belum ada kegiatan untuk saat ini.</h4>
                          <Button raised fill onClick={()=>this.$f7router.navigate("/JadwalKegiatan/")} color="deeppurple">Buat jadwal disini!</Button>
                        </CardContent>
                      </Card>
                    ) : ''}
                    <List mediaList>
                      {!this.state.loadingJadwal && jkBeranda.map((n, key)=> {
                        return (
                          <ListItem link="/" title={ n.nama } key={key} after={ this.formatTanggal(n.tanggal_mulai) } />
                        )
                      })}
                    </List>
                  </div>
                </Block>
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
    getCalonPD: Actions.getCalonPD,
    getJKberanda: Actions.getJKberanda,
  }, dispatch);
}

function mapStateToProps({ App, Pertanyaan, Notifikasi, Kuis, Ruang, DaftarPendaftaran, JadwalKegiatan }) {
  return {
    window_dimension: App.window_dimension,
    loading: App.loading,
    tabBar: App.tabBar,
    wilayah: App.wilayah,
    dummy_rows: App.dummy_rows,
    pertanyaan: Pertanyaan.pertanyaan,
    notifikasi: Notifikasi.notifikasi,
    kuis_diikuti: Kuis.kuis_diikuti,
    ruang_diikuti: Ruang.ruang_diikuti,
    entities: DaftarPendaftaran.entities,
    jkBeranda: JadwalKegiatan.beranda,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beranda);
