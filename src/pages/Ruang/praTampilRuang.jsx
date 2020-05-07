import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button, Card, CardContent, List, ListInput, CardHeader
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

class praTampilRuang extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            ruang_id: this.$f7route.params['ruang_id'],
            kode_ruang: this.$f7route.params['kode_ruang']
        },
        loading:true,
        ruang: {
            rows: [{
                ruang_id: '',
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
        this.props.getRuang(this.state.routeParams).then((result)=>{
            this.setState({
                loading:false,
                ruang_id: this.props.ruang.rows[0].ruang_id, 
                ruang: this.props.ruang,
                routeParams: {
                    ...this.state.routeParams,
                    ruang_id: this.props.ruang.rows[0].ruang_id,
                    pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
                }
            },()=>{
                this.props.getPenggunaRuang(this.state.routeParams).then((result)=>{
                    // this.setState({
                    //     ...this.state,
                    //     routeParams:{
                    //         ...this.state.routeParams,
                    //         pengguna_id: null
                    //     }
                    // },()=>{
        
                    //     this.props.getRuang(this.state.routeParams).then((result)=>{
                    //         this.setState({
                    //             loading:false,
                    //             ruang_id: this.props.ruang.rows[0].ruang_id, 
                    //             kuis: this.props.ruang
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
        //     // this.props.getRuang(this.state.routeParams).then((result)=>{
        //     //     this.setState({
        //     //         loading:false
        //     //     });
        //     // });
        // });
        // this.setState({
        //     ...this.state,
        //     routeParams: {
        //         ...this.state.routeParams,
        //         ruang_id: this.state.ruang_id
        //     }
        // },()=>{
        // this.props.getPenggunaRuang(this.state.routeParams).then((result)=>{
        //     this.setState({
        //         ...this.state,
        //         routeParams:{
        //             ...this.state.routeParams,
        //             pengguna_id: null
        //         }
        //     },()=>{

        //         this.props.getRuang(this.state.routeParams).then((result)=>{
        //             this.setState({
        //                 loading:false,
        //                 ruang_id: this.props.ruang.rows[0].ruang_id, 
        //                 kuis: this.props.ruang
        //             },()=>{
                        
        //             });
        //         });

        //     });
        // });
        // });


    }

    tampilRuang = () => {
        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                ruang_id: this.state.ruang_id,
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
            }
        },()=>{

            this.props.simpanPenggunaRuang(this.state.routeParams).then((result)=>{
                this.$f7router.navigate('/tampilRuang/'+this.state.routeParams.ruang_id);
            });

        });

    }

    render()
    {
        return (
            <Page name="praTampilRuang" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    {/* <NavTitle sliding>Kuis</NavTitle>
                    <NavTitleLarge>
                        Kuis
                    </NavTitleLarge> */}
                </Navbar>
                {this.state.ruang.rows.map((option)=>{
                    let waktu_mulai = '';
                    let tgl_waktu_mulai = new Date(option.waktu_mulai);
                    waktu_mulai = moment(option.waktu_mulai).format('D') + ' ' + this.bulan[(moment(option.waktu_mulai).format('M')-1)] + ' ' + moment(option.waktu_mulai).format('YYYY') + ', pukul ' + moment(option.waktu_mulai).format('H') + ':' + moment(option.waktu_mulai).format('mm');
                    
                    let waktu_selesai = '';
                    let tgl_waktu_selesai = new Date(option.waktu_selesai);
                    waktu_selesai = moment(option.waktu_selesai).format('D') + ' ' + this.bulan[(moment(option.waktu_selesai).format('M')-1)] + ' ' + moment(option.waktu_selesai).format('YYYY') + ', pukul ' + moment(option.waktu_selesai).format('H') + ':' + moment(option.waktu_selesai).format('mm');

                    return (
                        <Card>
                            <CardHeader style={{height:'100px', backgroundImage:'url('+localStorage.getItem('api_base')+'/assets/berkas/'+option.gambar_ruang+')', backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat'}}>
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
                                            {option.nama}
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
                                <Button raised fill large onClick={this.tampilRuang}>
                                    Ikuti Ruang
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
      getRuang: Actions.getRuang,
      getPenggunaRuang: Actions.getPenggunaRuang,
      simpanPenggunaRuang: Actions.simpanPenggunaRuang
    }, dispatch);
}

function mapStateToProps({ App, Ruang }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        ruang: Ruang.ruang
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(praTampilRuang));
  