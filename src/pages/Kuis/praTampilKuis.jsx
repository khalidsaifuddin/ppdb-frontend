import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button, Card, CardContent, List, ListInput, CardHeader
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

class praTampilKuis extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            kuis_id: this.$f7route.params['kuis_id'],
            kode_kuis: this.$f7route.params['kode_kuis']
        },
        loading:true,
        kuis: {
            rows: [{
                kuis_id: '',
                nama: '-'
            }],
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
        this.props.getKuis(this.state.routeParams).then((result)=>{
            this.setState({
                loading:false,
                kuis_id: this.props.kuis.rows[0].kuis_id, 
                kuis: this.props.kuis,
                routeParams: {
                    ...this.state.routeParams,
                    kuis_id: this.props.kuis.rows[0].kuis_id,
                    pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
                }
            },()=>{
                this.props.getPenggunaKuis(this.state.routeParams).then((result)=>{
                    // this.setState({
                    //     ...this.state,
                    //     routeParams:{
                    //         ...this.state.routeParams,
                    //         pengguna_id: null
                    //     }
                    // },()=>{
        
                    //     this.props.getKuis(this.state.routeParams).then((result)=>{
                    //         this.setState({
                    //             loading:false,
                    //             kuis_id: this.props.kuis.rows[0].kuis_id, 
                    //             kuis: this.props.kuis
                    //         },()=>{
                                
                    //         });
                    //     });
        
                    // });
                });
            });
        });
        // this.setState({
        //     routeParams: {
        //         ...this.state.routeParams
        //     }
        // },()=>{
        //     // this.props.getKuis(this.state.routeParams).then((result)=>{
        //     //     this.setState({
        //     //         loading:false
        //     //     });
        //     // });
        // });
        // this.setState({
        //     ...this.state,
        //     routeParams: {
        //         ...this.state.routeParams,
        //         kuis_id: this.state.kuis_id
        //     }
        // },()=>{
        // this.props.getPenggunaKuis(this.state.routeParams).then((result)=>{
        //     this.setState({
        //         ...this.state,
        //         routeParams:{
        //             ...this.state.routeParams,
        //             pengguna_id: null
        //         }
        //     },()=>{

        //         this.props.getKuis(this.state.routeParams).then((result)=>{
        //             this.setState({
        //                 loading:false,
        //                 kuis_id: this.props.kuis.rows[0].kuis_id, 
        //                 kuis: this.props.kuis
        //             },()=>{
                        
        //             });
        //         });

        //     });
        // });
        // });


    }

    kerjakanKuis = () => {
        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                kuis_id: this.state.kuis_id,
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
            }
        },()=>{

            this.props.simpanPenggunaKuis(this.state.routeParams).then((result)=>{
                this.$f7router.navigate('/kerjakanKuis/'+this.state.routeParams.kuis_id);
            });

        });

    }

    render()
    {
        return (
            <Page name="praTampilKuis" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    {/* <NavTitle sliding>Kuis</NavTitle>
                    <NavTitleLarge>
                        Kuis
                    </NavTitleLarge> */}
                </Navbar>
                {this.state.kuis.rows.map((option)=>{
                    let waktu_mulai = '';
                    let tgl_waktu_mulai = new Date(option.waktu_mulai);
                    waktu_mulai = moment(option.waktu_mulai).format('D') + ' ' + this.bulan[(moment(option.waktu_mulai).format('M')-1)] + ' ' + moment(option.waktu_mulai).format('YYYY') + ', pukul ' + moment(option.waktu_mulai).format('H') + ':' + moment(option.waktu_mulai).format('mm');
                    
                    let waktu_selesai = '';
                    let tgl_waktu_selesai = new Date(option.waktu_selesai);
                    waktu_selesai = moment(option.waktu_selesai).format('D') + ' ' + this.bulan[(moment(option.waktu_selesai).format('M')-1)] + ' ' + moment(option.waktu_selesai).format('YYYY') + ', pukul ' + moment(option.waktu_selesai).format('H') + ':' + moment(option.waktu_selesai).format('mm');

                    return (
                        <Card>
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
                                    marginBottom:'-35px',
                                    color:'white',
                                    paddingBottom:'0px',
                                    height:'55px',
                                    paddingTop:'10px',
                                    paddingLeft: '16px'
                                }}>
                                    <Link href={""} style={{color:'white'}}>
                                        <h2 style={{marginTop:'0px',marginBottom:'0px'}}>
                                            {option.judul}
                                        </h2>
                                    </Link>
                                    <div style={{marginTop:'0px', fontSize:'12px', color: '#cccccc'}}>Oleh <b>{option.pengguna}</b></div><br/>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* <h1 style={{color:'#EEFF41'}}>{option.judul}</h1>
                                <div style={{marginTop:'-10px', fontSize:'12px', color: '#8c8c8c'}}>Oleh <b>{option.pengguna}</b></div><br/> */}
                                <h4>{option.keterangan}</h4>
                                
                                <div style={{borderBottom:'1px solid #434343'}}></div>
                                <span>{option.jenjang} {option.tingkat_pendidikan}</span><br/>
                                <span>{option.mata_pelajaran}</span><br/>
                                <br/>
                                
                                <div style={{borderBottom:'1px solid #434343'}}></div>
                                Waktu Mulai: <b>{waktu_mulai}</b><br/>
                                Waktu Selesai: 
                                {option.waktu_selesai  &&
                                <span>&nbsp;<b>{waktu_selesai}</b><br/></span>
                                }
                                {!option.waktu_selesai  &&
                                <span>&nbsp;<b>Tidak berbatas waktu</b><br/></span>
                                }
                                <br/>
                                
                                <div style={{borderBottom:'1px solid #434343'}}></div>
                                <Button raised fill large onClick={this.kerjakanKuis}>
                                    Mulai
                                </Button>
                            </CardContent>
                        </Card>
                    )
                })}
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

export default (connect(mapStateToProps, mapDispatchToProps)(praTampilKuis));
  