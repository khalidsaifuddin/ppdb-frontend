import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, BlockTitle, Tabs, Tab, Toolbar, Segmented, Actions, ActionsGroup, ActionsButton, ActionsLabel, Chip, Icon
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import io from 'socket.io-client';
import moment from 'moment';

class tampilRuang extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            ruang_id: this.$f7route.params['ruang_id'],
        },
        ruang: {
            rows: [{
                nama: '-',
                deskripsi: '-',
                self_pengguna_ruang: {}
            }],
            total: 0
        },
        pertanyaan: {
            rows: [],
            result: 0
        },
        pengguna_ruang: {
            rows: [],
            total: 0
        },
        kuis_ruang: {
            rows: [],
            total: 0
        }
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

        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                pengguna_id: null
            }
        },()=>{

            this.props.getRuang(this.state.routeParams).then((result)=>{
                this.setState({
                    ruang: this.props.ruang,
                    routeParams: {
                        ...this.state.routeParams,
                        pengguna_id: null,
                        dengan_rows: 'Y'
                    }
                },()=>{
                    this.props.getPenggunaRuang(this.state.routeParams).then((result)=>{
                        this.setState({
                            ...this.state,
                            pengguna_ruang: this.props.pengguna_ruang
                        })
                    });
    
                    this.props.getPertanyaan(this.state.routeParams).then((result)=>{
                        this.setState({
                            ...this.state,
                            pertanyaan: this.props.pertanyaan
                        })
                    });
    
                    this.props.getKuisRuang(this.state.routeParams).then((result)=>{
                        this.setState({
                            ...this.state,
                            kuis_ruang: this.props.kuis_ruang
                        })
                    });
                });
            });

        });

    }

    tambahPertanyaanRuang = () => {
        // alert('tes');
        this.$f7router.navigate('/tambahPertanyaanRuang/'+this.$f7route.params['ruang_id']);
    }

    simpanPantauan = (pertanyaan_id) => {
        // alert(pertanyaan_id);
        this.setState({
          routeParamsPantauan: {
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            pertanyaan_id: pertanyaan_id
          }
        },()=>{
          this.props.simpanPantauan(this.state.routeParamsPantauan).then((result)=>{
    
            this.props.getPertanyaan(this.state.routeParams).then((result)=>{
              this.setState({
                pertanyaan: this.props.pertanyaan,
                notifikasi: this.props.notifikasi,
                loadingPertanyaan: false,
              });
            });
    
          })
        });
    }

    ikutiRuang = () => {
        // alert('tes');
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
            }
        },()=>{

            this.props.simpanPenggunaRuang(this.state.routeParams).then((result)=>{
                // this.props.getPenggunaRuang(this.state.routeParams).then((result)=>{
                //     this.setState({
                //         ...this.state,
                //         pengguna_ruang: this.props.pengguna_ruang
                //     })
                // });
                this.props.getRuang(this.state.routeParams).then((result)=>{
                    this.setState({
                        ruang: this.props.ruang,
                        routeParams: {
                            ...this.state.routeParams,
                            pengguna_id: null
                        }
                    },()=>{
                        this.props.getPenggunaRuang(this.state.routeParams).then((result)=>{
                            this.setState({
                                ...this.state,
                                pengguna_ruang: this.props.pengguna_ruang
                            })
                        });
        
                        this.props.getPertanyaan(this.state.routeParams).then((result)=>{
                            this.setState({
                                ...this.state,
                                pertanyaan: this.props.pertanyaan
                            })
                        });
                    });
                });
            });



        });
    }

    hapusIkutiRuang = () => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                soft_delete: 1
            }
        },()=>{

            this.props.simpanPenggunaRuang(this.state.routeParams).then((result)=>{
                // this.props.getPenggunaRuang(this.state.routeParams).then((result)=>{
                //     this.setState({
                //         ...this.state,
                //         pengguna_ruang: this.props.pengguna_ruang
                //     })
                // });
                this.props.getRuang(this.state.routeParams).then((result)=>{
                    this.setState({
                        ruang: this.props.ruang,
                        routeParams: {
                            ...this.state.routeParams,
                            pengguna_id: null
                        }
                    },()=>{
                        this.props.getPenggunaRuang(this.state.routeParams).then((result)=>{
                            this.setState({
                                ...this.state,
                                pengguna_ruang: this.props.pengguna_ruang
                            })
                        });
        
                        this.props.getPertanyaan(this.state.routeParams).then((result)=>{
                            this.setState({
                                ...this.state,
                                pertanyaan: this.props.pertanyaan
                            })
                        });
                    
                    });
                });
            });


        });
    }

    render()
    {
        let tanggal = '';
        let tgl = new Date(this.state.ruang.rows[0].create_date);

        tanggal = moment(this.state.ruang.rows[0].create_date).format('D') + ' ' + this.bulan[(moment(this.state.ruang.rows[0].create_date).format('M')-1)] + ' ' + moment(this.state.ruang.rows[0].create_date).format('YYYY');
        // tanggal = tgl.getDate() + ' ' + this.bulan[tgl.getMonth()] + ' ' + tgl.getFullYear();

        return (
            <Page name="tampilRuang" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.state.ruang.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        {this.state.ruang.rows[0].nama}
                    </NavTitleLarge>
                    {/* <NavRight>
                        <Link style={{marginLeft:'0px'}} iconIos="f7:plus_app" iconAurora="f7:plus_app" iconMd="material:plus_app" tooltip="Buat Ruang Baru" href="/tambahRuang">&nbsp; Ruang Baru</Link>
                    </NavRight> */}
                </Navbar>
                <Block strong style={{
                    height:'150px', 
                    backgroundImage:'url('+localStorage.getItem('api_base')+'/assets/berkas/'+this.state.ruang.rows[0].gambar_ruang+')', 
                    backgroundSize:'100%', 
                    // backgroundPosition:'center', 
                    backgroundRepeat:'no-repeat',
                    backgroundAttachment:'fixed',
                    marginTop:'0px', 
                    marginBottom:'0px'
                }}>
                </Block>
                <Row noGap>
                   <Col width="100" tabletWidth="100">
                        <Card>
                            <CardContent>
                                <div style={{marginTop:'-10px'}} dangerouslySetInnerHTML={{ __html: this.state.ruang.rows[0].deskripsi }} />
                                {/* <br/> */}
                                <div style={{color:'#636363', fontSize:'12px'}}>
                                    Sejak {tanggal}<br/>
                                    Dibuat oleh <b>{this.state.ruang.rows[0].pengguna}</b>
                                </div>
                                {/* <div style={{color:'#636363', fontSize:'12px'}}>
                                    {this.state.pertanyaan.result} Pertanyaan<br/>
                                    {this.state.pengguna_ruang.total} Pengikut
                                </div> */}
                            </CardContent>
                            <CardFooter>
                                {parseInt(this.state.ruang.rows[0].jenis_ruang_id) === 1 &&
                                <>
                                {this.state.ruang.rows[0].self_pengguna_ruang.pengguna_id === JSON.parse(localStorage.getItem('user')).pengguna_id &&
                                <Button large onClick={this.hapusIkutiRuang} style={{width:'100%', background:'#fefefe'}} raised iconIos="f7:checkmark_circle" iconAurora="f7:checkmark_circle" iconMd="material:checkmark_circle">&nbsp; Mengikuti</Button>
                                }
                                {this.state.ruang.rows[0].self_pengguna_ruang.pengguna_id !== JSON.parse(localStorage.getItem('user')).pengguna_id &&
                                <Button large onClick={this.ikutiRuang} style={{width:'100%', background:'#007AFF', color:'white'}} raised iconIos="f7:person_crop_circle_badge_plus" iconAurora="f7:person_crop_circle_badge_plus" iconMd="material:person_crop_circle_badge_plus">&nbsp; Ikuti</Button>
                                }
                                </>
                                }
                                {parseInt(this.state.ruang.rows[0].jenis_ruang_id) === 2 &&
                                <>
                                <Button raised fill onClick={()=>this.$f7router.navigate('/kodeRuang/'+this.state.ruang.rows[0].ruang_id)} style={{background:'#bf360c', width:'100%'}}>
                                    <Icon ios={"f7:qrcode"} aurora={"f7:qrcode"} md={"material:qrcode"} tooltip="Tampilkan Kode Ruang"/>&nbsp;
                                    Kode Ruang
                                </Button>
                                </>
                                }
                            </CardFooter>
                        </Card>
                    </Col> 
                    <Col width="100" tabletWidth="100">
                        {/* <Toolbar tabbar>
                            <Link tabLink="#tab-1" tabLinkActive>Pertanyaan ({this.state.pertanyaan.result ? this.state.pertanyaan.result : "0"})</Link>
                            <Link tabLink="#tab-2">Pengikut ({this.state.pengguna_ruang.total ? this.state.pengguna_ruang.total : "0"})</Link>
                            <Link tabLink="#tab-3">Kuis (0)</Link>
                        </Toolbar> */}
                        <Block strong style={{marginTop:'0px',marginBottom:'0px'}}>
                            <Segmented raised>
                                <Button tabLink="#tab-1" tabLinkActive>Pertanyaan ({this.state.pertanyaan.result ? this.state.pertanyaan.result : "0"})</Button>
                                <Button tabLink="#tab-2">Pengikut ({this.state.pengguna_ruang.total ? this.state.pengguna_ruang.total : "0"})</Button>
                                <Button tabLink="#tab-3">Kuis ({this.state.kuis_ruang.total ? this.state.kuis_ruang.total : '0'})</Button>
                            </Segmented>
                        </Block>
                        <Tabs animated>
                            <Tab id="tab-1" tabActive>
                                <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
                                    <Button raised style={{background:'#434343', color:'white'}} onClick={this.tambahPertanyaanRuang}>
                                        <i className="f7-icons" style={{fontSize:'17px'}}>plus</i>&nbsp;Tambah Pertanyaan
                                    </Button>
                                </Block>
                                <Block strong style={{marginTop:'0px'}}>
                                    {this.state.pertanyaan.rows.map((option)=>{
                                        return(
                                            <Card>
                                                <CardHeader style={{display:'inline-flex', paddingTop:'8px',paddingBottom:'0px',minHeight:'0px',fontSize:'12px'}}>
                                                    {option.ruang.map((optionRuang)=>{
                                                    return (
                                                        <Link href={"/tampilRuang/"+optionRuang.ruang_id}>
                                                        <span>&nbsp;/ {optionRuang.nama}</span>
                                                        </Link>
                                                    )
                                                    })}
                                                </CardHeader>
                                                <CardHeader>
                                                    <Link href={"/tampilPertanyaan/"+option.pertanyaan_id}>
                                                        <b style={{fontSize:'23px'}}>{option.judul}</b>
                                                    </Link>
                                                </CardHeader>
                                                <CardContent style={{paddingTop:'8px'}}>
                                                    {/* {option.konten} */}
                                                    <span style={{fontSize:'12px', color: '#8c8c8c'}}>Ditanyakan pada tanggal <b>{tanggal}</b></span><br/>
                                                    <span style={{fontSize:'12px', color: '#8c8c8c'}}>Oleh <b>{option.pengguna}</b></span>
                                                    <hr style={{borderTop:'1px solid #eeeeee'}}/>
                                                    <div style={{marginTop:'-8px', maxHeight:'100px', width:'100%',overflowX:'hidden',overflowY:'hidden'}}>
                                                        <div dangerouslySetInnerHTML={{ __html: option.konten }} />
                                                        <p className="read-more" style={{textAlign:'center'}}>
                                                        </p>
                                                    </div>
                                                    <Link style={{width:'100%', marginTop:'8px'}} href={"/tampilPertanyaan/"+option.pertanyaan_id}>Baca Selengkapnya</Link>
                                                </CardContent>
                                                <CardFooter>
                                                    <Link iconIos="f7:bubble_right" iconAurora="f7:bubble_right" iconMd="material:bubble_right" href={"/tampilPertanyaan/"+option.pertanyaan_id}>&nbsp; {option.jumlah_jawaban} Jawaban</Link>
                                                    <Link iconIos="f7:bell_circle" iconAurora="f7:bell_circle" iconMd="material:bell_circle" onClick={()=>this.simpanPantauan(option.pertanyaan_id)}>&nbsp; {option.jumlah_pantauan} Pantauan</Link>
                                                    <Link iconIos="f7:pencil_ellipsis_rectangle" iconAurora="f7:pencil_ellipsis_rectangle" iconMd="material:pencil_ellipsis_rectangle">&nbsp; Jawab</Link>
                                                    {/* <Link iconIos="f7:square_pencil" iconAurora="f7:square_pencil" iconMd="material:square_pencil">&nbsp; Ubah</Link> */}
                                                </CardFooter>
                                            </Card>
                                        )
                                    })}
                                </Block>
                                {/* <BlockTitle>Pertanyaan</BlockTitle> */}
                            </Tab>
                            <Tab id="tab-2">
                                {/* <BlockTitle>Pengikut</BlockTitle> */}
                                <List mediaList>
                                {this.state.pengguna_ruang.rows.map((optionPengguna)=>{
                                    let tanggalPengguna = '';
                                    let tgl = new Date(optionPengguna.create_date);
                            
                                    tanggalPengguna = moment(optionPengguna.create_date).format('D') + ' ' + this.bulan[(moment(optionPengguna.create_date).format('M')-1)] + ' ' + moment(optionPengguna.create_date).format('YYYY');
                                    // tanggalPengguna = tgl.getDate() + ' ' + this.bulan[tgl.getMonth()] + ' ' + tgl.getFullYear();

                                    return (
                                            <ListItem
                                                title={optionPengguna.pengguna}
                                                subtitle={"Mengikuti sejak " + tanggalPengguna}>
                                                <img slot="media" src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" width="44" />
                                            </ListItem>
                                    )
                                })}
                                </List>
                            </Tab>
                            <Tab id="tab-3">
                                <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
                                    <Button raised style={{background:'#434343', color:'white'}} actionsOpen="#actions-two-groups">
                                        <i className="f7-icons" style={{fontSize:'17px'}}>plus</i>&nbsp;Tambah Kuis
                                    </Button>
                                </Block>
                                {/* <Block strong style={{marginTop:'0px', marginBottom:'0px'}}> */}
                                    {this.state.kuis_ruang.rows.map((option)=>{
                                        let tanggal = '';
                                        let tgl = new Date(option.create_date);
                                        tanggal = moment(option.create_date).format('D') + ' ' + this.bulan[(moment(option.create_date).format('M')-1)] + ' ' + moment(option.create_date).format('YYYY');
                                        
                                        let waktu_mulai = '';
                                        let tgl_waktu_mulai = new Date(option.waktu_mulai);
                                        waktu_mulai = moment(option.waktu_mulai).format('D') + ' ' + this.bulan[(moment(option.waktu_mulai).format('M')-1)] + ' ' + moment(option.waktu_mulai).format('YYYY') + ', pukul ' + moment(option.waktu_mulai).format('H') + ':' + moment(option.waktu_mulai).format('m');
                                        
                                        let waktu_selesai = '';
                                        let tgl_waktu_selesai = new Date(option.waktu_selesai);
                                        waktu_selesai = moment(option.waktu_selesai).format('D') + ' ' + this.bulan[(moment(option.waktu_selesai).format('M')-1)] + ' ' + moment(option.waktu_selesai).format('YYYY') + ', pukul ' + moment(option.waktu_selesai).format('H') + ':' + moment(option.waktu_selesai).format('m');


                                        return (
                                            <Col width="100" tabletWidth="50">
                                                <Card style={{borderBottom:'4px solid #4dd0e1'}}>
                                                    <CardHeader style={{height:'100px', backgroundImage:'url('+localStorage.getItem('api_base')+'/assets/berkas/'+option.gambar_kuis+')', backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat'}}>
                                                        {/* <Link href={""}>
                                                            <b style={{fontSize:'23px'}}>{option.judul}</b>
                                                        </Link> */}
                                                        <div className="mantab" style={{
                                                            backgroundColor:'rgba(0, 0, 0, 0.6)',
                                                            width:'1000%',
                                                            marginLeft:'-15px',
                                                            marginRight:'-15px',
                                                            paddingLeft:'10px',
                                                            marginBottom:'-50px',
                                                            color:'white',
                                                            paddingBottom:'0px',
                                                            height:'40px',
                                                            paddingTop:'10px'
                                                        }}>
                                                            <Link href={""} style={{color:'white'}}>
                                                                <h2 style={{marginTop:'0px',marginBottom:'0px'}}>
                                                                    {option.judul}
                                                                </h2>
                                                            </Link>
                                                        </div>
                                                    </CardHeader>
                                                    <CardHeader style={{fontSize:'15px', minHeight:'10px', paddingTop:'4px', paddingBottom: '4px'}}>
                                                        <Row style={{width:'100%'}}>
                                                            <Col width="80">
                                                                <span style={{fontSize:'12px', color: '#8c8c8c'}}>Dibuat pada tanggal <b>{tanggal}</b></span><br/>
                                                                <span style={{fontSize:'12px', color: '#8c8c8c'}}>Oleh <b>{option.pengguna}</b></span>
                                                            </Col>
                                                            <Col width="20" style={{textAlign:'right'}}>
                                                                <div style={{width:'100%', textAlign:'right'}}>
                                                                    {option.publikasi === 1  &&
                                                                    // <span>Rilis</span>
                                                                    <Chip text="Rilis" color="green" style={{color:'black'}}/>
                                                                    }
                                                                    {option.publikasi !== 1  &&
                                                                    // <span>Draft</span>
                                                                    <Chip text="Draft" />
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardHeader>
                                                    <CardContent style={{paddingTop:'8px'}}>
                                                        {/* <span style={{fontSize:'12px', color: '#8c8c8c'}}>Dibuat pada tanggal <b>{tanggal}</b></span><br/>
                                                        <span style={{fontSize:'12px', color: '#8c8c8c'}}>Oleh <b>{option.pengguna}</b></span> */}
                                                        {/* <hr style={{borderTop:'1px solid #434343'}}/> */}
                                                        <div style={{marginTop:'10px', maxHeight:'200px', width:'100%',overflowX:'hidden',overflowY:'hidden'}}>
                                                            <Row noGap>
                                                                {/* {option.keterangan !== '' && option.keterangan !== null &&
                                                                <Col width="100" style={{borderBottom:'1px solid #434343', marginBottom:'8px'}}>
                                                                    <i>{option.keterangan}</i><br/>
                                                                </Col>
                                                                } */}
                                                                <Col width="100" style={{paddingTop:'0px', paddingBottom:'4px'}}>
                                                                    <b>{option.jenjang} {option.tingkat_pendidikan}</b><br/>
                                                                    <b>{option.mata_pelajaran}</b><br/>
                                                                </Col>
                                                                {/* <Col width="100">
                                                                    Waktu Mulai: <b>{waktu_mulai}</b><br/>
                                                                    {option.waktu_selesai !== '' && option.waktu_selesai !== null &&
                                                                    <span>Waktu Selesai: <b>{waktu_selesai}</b><br/></span>
                                                                    }
                                                                </Col> */}
                                                            </Row>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter>
                                                        <Button raised fill onClick={()=>this.$f7router.navigate('/kodeKuis/'+option.kuis_id)} style={{background:'#bf360c'}}>
                                                            <Icon ios={"f7:qrcode"} aurora={"f7:qrcode"} md={"material:qrcode"} tooltip="Tampilkan Kode Kuis"/>&nbsp;
                                                            Kode Kuis
                                                        </Button>
                                                        <Button raised fill onClick={()=>this.$f7router.navigate('/peringkatKuis/'+option.kuis_id)}>
                                                            <Icon ios={"f7:stopwatch"} aurora={"f7:stopwatch"} md={"material:stopwatch"} tooltip="Edit Kuis"/>&nbsp;
                                                            Peringkat
                                                        </Button>
                                                        {JSON.parse(localStorage.getItem('user')).pengguna_id === option.pengguna_id &&
                                                        <Button raised fill onClick={()=>this.$f7router.navigate('/tambahKuis/'+option.pengguna_id+'/'+option.kuis_id)} style={{background:'#2e7d32'}}>
                                                            <Icon ios={"f7:pencil_circle"} aurora={"f7:pencil_circle"} md={"material:pencil_circle"} tooltip="Edit Kuis"/>&nbsp;
                                                            Edit
                                                        </Button>
                                                        }
                                                        {/* <Button raised fill>
                                                            <Icon ios={"f7:today"} aurora={"f7:today"} md={"material:today"} tooltip="Buat Kuis Baru"/>&nbsp;
                                                            Live Report
                                                        </Button> */}
                                                    </CardFooter>
                                                </Card>
                                                {/* <Card raised style={{border:'0px solid #434343'}}>
                                                    <CardHeader>
                                                        {option.judul}
                                                    </CardHeader>
                                                    <CardContent>
                                                        <Row noGap>
                                                            <Col width="100">
                                                                Keterangan: {option.keterangan}<br/>
                                                            </Col>
                                                            <Col width="50">
                                                                Jenjang: {option.jenjang}<br/>
                                                                Tingkat: {option.tingkat_pendidikan}<br/>
                                                            </Col>
                                                            <Col width="50">
                                                                Mapel: {option.mata_pelajaran}<br/>
                                                            </Col>
                                                        </Row>
                                                    </CardContent>
                                                    <CardFooter>

                                                    </CardFooter>
                                                </Card> */}

                                            </Col>
                                        )
                                    })}
                                {/* </Block> */}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                <Actions id="actions-two-groups">
                    <ActionsGroup>
                        <ActionsLabel>Tambah Kuis untuk Ruang</ActionsLabel>
                        <ActionsButton bold onClick={()=>this.$f7router.navigate('/tambahKuisRuang/'+JSON.parse(localStorage.getItem('user')).pengguna_id+"/"+this.state.ruang.rows[0].ruang_id)}>Buat Kuis Baru</ActionsButton>
                        <ActionsButton>Tambah dari Kuis yang sudah ada</ActionsButton>
                    </ActionsGroup>
                    <ActionsGroup>
                        <ActionsButton color="red">Batal</ActionsButton>
                    </ActionsGroup>
                </Actions>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: actions.updateWindowDimension,
      setLoading: actions.setLoading,
      getRuang: actions.getRuang,
      getPenggunaRuang: actions.getPenggunaRuang,
      getPertanyaan: actions.getPertanyaan,
      simpanPantauan: actions.simpanPantauan,
      simpanPenggunaRuang: actions.simpanPenggunaRuang,
      getKuisRuang: actions.getKuisRuang
    }, dispatch);
}

function mapStateToProps({ App, Ruang, Pertanyaan, Kuis }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ruang: Ruang.ruang,
        pengguna_ruang: Ruang.pengguna_ruang,
        pertanyaan: Pertanyaan.pertanyaan,
        kuis_ruang: Kuis.kuis_ruang
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tampilRuang));
  