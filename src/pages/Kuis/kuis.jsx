import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button, Card, CardHeader, Row, Col, CardContent, CardFooter, Chip, Toolbar, Tabs, Tab, Segmented
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

class kuis extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
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
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            this.props.getKuis(this.state.routeParams).then((result)=>{

            });

            this.props.getKuisDiikuti(this.state.routeParams).then((result)=>{

            });
        });

    }

    buatKuis = () => {
        this.$f7router.navigate('/tambahKuis/'+JSON.parse(localStorage.getItem('user')).pengguna_id);
    }

    render()
    {
        return (
            <Page name="kuis" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Kuis</NavTitle>
                    <NavTitleLarge>
                        Kuis
                    </NavTitleLarge>
                </Navbar>
                <Row noGap>
                    <Col width="100">

                        {/* <Toolbar tabbar>
                            <Link tabLink="#tab-kuis-1" tabLinkActive>Kuis Anda ({this.props.kuis.total})</Link>
                            <Link tabLink="#tab-kuis-2">Kuis yang diikuti (0)</Link>
                        </Toolbar> */}
                        <Block strong style={{marginTop:'0px',marginBottom:'0px'}}>
                            <Segmented raised>
                                <Button tabLink="#tab-kuis-1" tabLinkActive>Kuis yang diikuti ({this.props.kuis_diikuti.total ? this.props.kuis_diikuti.total : '0'})</Button>
                                <Button tabLink="#tab-kuis-2">Kuis Anda ({this.props.kuis.total ? this.props.kuis.total : '0'})</Button>
                            </Segmented>
                        </Block>
                        <Tabs animated>
                            <Tab id="tab-kuis-1" tabActive>
                                
                                <Block strong style={{marginTop:'0px', marginBottom:'8px'}}>
                                    <Button large fill raised onClick={()=>this.$f7router.navigate('/gabungKuis/')}>
                                        <Icon ios={"f7:paperplane_fill"} aurora={"f7:paperplane_fill"} md={"material:paperplane_fill"} tooltip="Ikuti Kuis"/>
                                        &nbsp;
                                        Ikuti Kuis
                                    </Button>
                                </Block>
                                {this.props.kuis_diikuti.total < 1  &&
                                <Card><CardContent>Belum ada kuis yang Anda ikuti</CardContent></Card>
                                }
                                {this.props.kuis_diikuti.total > 0  &&
                                <>
                                {this.props.kuis_diikuti.rows.map((option)=>{

                                    let waktu_mengerjakan = '';
                                    let tgl_waktu_mengerjakan = new Date(option.waktu_mengerjakan);
                                    waktu_mengerjakan = moment(option.waktu_mengerjakan).format('D') + ' ' + this.bulan[(moment(option.waktu_mengerjakan).format('M')-1)] + ' ' + moment(option.waktu_mengerjakan).format('YYYY') + ', pukul ' + moment(option.waktu_mengerjakan).format('H') + ':' + moment(option.waktu_mengerjakan).format('mm');

                                    return (
                                        <Card style={{background:'#37474F',backgroundImage:'url('+localStorage.getItem('api_base')+'/assets/berkas/'+option.gambar_kuis+')', backgroundSize:'cover'}}>
                                            <CardContent style={{background:'rgba(0, 0, 0, 0.6)'}}>
                                                <Row noGap>
                                                    <Col width={75}>
                                                        <h2 style={{marginTop:'0px'}}>
                                                            {option.judul}
                                                        </h2>
                                                        <p>
                                                            {option.keterangan}<br/>
                                                            Tanggal {waktu_mengerjakan}
                                                        </p>
                                                    </Col>
                                                    <Col width={25} style={{textAlign:'right'}}>
                                                        <div style={{fontSize:'10px'}}>
                                                            Skor
                                                        </div>
                                                        <div style={{fontSize:'30px', fontWeight:'bold', color:'#64FFDA'}}>{(option.skor ? parseFloat(option.skor).toFixed(1) : "0")}</div>
                                                        <div style={{fontSize:'10px'}}>
                                                            Peringkat {option.peringkat} dari {option.total_peserta} peserta
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardContent>
                                            <CardFooter style={{background:'rgba(0, 0, 0, 0.8)'}}>
                                                <Button raised fill>
                                                    Rincian
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    )
                                })}
                                </>
                                }
                                
                            </Tab>
                            <Tab id="tab-kuis-2">

                            <Block strong style={{marginTop:'0px', marginBottom:'8px'}}>
                                    <Button large fill raised onClick={this.buatKuis}>
                                        <Icon ios={"f7:plus_app"} aurora={"f7:plus_app"} md={"material:plus_app"} tooltip="Buat Kuis Baru"/>
                                        &nbsp;
                                        Buat Kuis Baru
                                    </Button>
                                </Block>
                                {/* <Block strong style={{marginTop:'0px', marginBottom:'8px', paddingLeft:'4px', paddingRight:'4px'}}> */}
                                    {this.props.kuis.total < 1 &&
                                        <Card><CardContent>Belum ada kuis yang Anda buat</CardContent></Card>
                                    }
                                    {this.props.kuis.total > 0 &&
                                    <Row noGap>
                                        {this.props.kuis.rows.map((option)=>{

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
                                                            <Button disabled={(parseInt(option.publikasi) === 1 ? true : false)} raised fill onClick={()=>this.$f7router.navigate('/tambahKuis/'+option.pengguna_id+'/'+option.kuis_id)} style={{background:'#2e7d32'}}>
                                                                <Icon ios={"f7:pencil_circle"} aurora={"f7:pencil_circle"} md={"material:pencil_circle"} tooltip="Edit Kuis"/>&nbsp;
                                                                Edit
                                                            </Button>
                                                            {/* <Button raised fill>
                                                                <Icon ios={"f7:today"} aurora={"f7:today"} md={"material:today"} tooltip="Buat Kuis Baru"/>&nbsp;
                                                                Live Report
                                                            </Button> */}
                                                        </CardFooter>
                                                        <CardFooter style={{padding:'4px', minHeight:'0px', paddingRight:'16px'}}>
                                                            {parseInt(option.publikasi) === 1 &&
                                                            <span style={{textAlign:'right', width:'100%', fontSize:'10px', fontStyle:'italic'}}>Kuis yang sudah dirilis tidak bisa diedit</span>
                                                            }
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
                                    </Row>
                                    }
                                {/* </Block> */}
                                
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getKuis: Actions.getKuis,
      getKuisDiikuti: Actions.getKuisDiikuti
    }, dispatch);
}

function mapStateToProps({ App, Kuis }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        kuis: Kuis.kuis,
        kuis_diikuti: Kuis.kuis_diikuti
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(kuis));
  