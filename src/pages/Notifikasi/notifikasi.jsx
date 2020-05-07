import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

class notifikasi extends Component {
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
                ...this.state.routeParams,
                dibaca: null
            }
        },()=>{
            this.props.getNotifikasi(this.state.routeParams);
        });

    }

    klikNotifikasi = (notifikasi_id, tautan) => {
        // alert('oke');
        this.setState({
            ...this.state,
            routeParamsBaca:{
                notifikasi_id: notifikasi_id,
                dibaca: "2"
            }
        },()=>{
            this.props.simpanNotifikasi(this.state.routeParamsBaca).then((result)=>{
                // this.props.getNotifikasi(this.state.routeParams);
                this.$f7router.navigate(tautan);
            });
        });
    }

    render()
    {
        return (
            <Page name="notifikasi" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Notifikasi</NavTitle>
                    <NavTitleLarge>
                        Notifikasi
                    </NavTitleLarge>
                </Navbar>
                <Block strong style={{marginTop:'0px', marginBottom:'8px'}}>
                    {this.props.notifikasi.result_belum_dibaca > 0 &&
                        <span>Ada {this.props.notifikasi.result_belum_dibaca} notifikasi baru untuk Anda</span>
                    }
                    {this.props.notifikasi.result_belum_dibaca < 1 &&
                        <span>Belum ada notifikasi baru untuk Anda</span>
                    }
                </Block>
                {this.props.notifikasi.rows.map((option)=>{

                    let tanggal = '';
                    let tgl = new Date(option.create_date);

                    tanggal = tgl.getDate() + ' ' + this.bulan[tgl.getMonth()] + ' ' + tgl.getFullYear();

                    return(
                        <Link style={{width:'100%'}} onClick={()=>this.klikNotifikasi(option.notifikasi_id, option.tautan)}>
                            <Block strong style={{marginTop:'0px', marginBottom:'0px', backgroundColor:parseInt(option.dibaca) === 2 ? '#ffffff' : '#dfdfdf', fontWeight:parseInt(option.dibaca) === 2 ? 'none' : 'bold', width:'100%'}}>
                                
                                <p style={{color:'#007AFF'}}>
                                    <Icon style={{fontSize:'15px', color:'#ff0000'}} ios={parseInt(option.dibaca) === 1 ? "f7:circle_fill" : "f7:circle"} aurora={parseInt(option.dibaca) === 1 ? "f7:circle_fill" : "f7:circle"} md={parseInt(option.dibaca) === 1 ? "material:circle_fill" : "material:circle"} tooltip="Notifikasi"/>&nbsp;&nbsp;
                                    {option.judul}<br/>
                                </p>
                                Tanggal {tanggal} pukul {option.create_date.substring(11,16)}
                            </Block>
                        </Link>
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
      getNotifikasi: Actions.getNotifikasi,
      simpanNotifikasi: Actions.simpanNotifikasi
    }, dispatch);
}

function mapStateToProps({ App, Notifikasi }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        notifikasi: Notifikasi.notifikasi
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(notifikasi));
  