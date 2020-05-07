import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button, Card, CardContent, List, ListInput, CardHeader, Row, Col, Progressbar
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

class peringkatKuis extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            kuis_id: this.$f7route.params['kuis_id'],
            kode_kuis: this.$f7route.params['kode_kuis'],
            tampil_jumlah_peserta: 'Y',
            order_by_peringkat: 'Y'
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
        localStorage.setItem('current_url', this.$f7route.url);

        //socket
        let socket = io(localStorage.getItem('socket_url'));

        socket.on('newMessage', (kuis_id) => {
            console.log(kuis_id);
            console.log(this.state.routeParams.kuis_id);

            if(kuis_id === this.state.routeParams.kuis_id){
                this.props.getPenggunaKuis(this.state.routeParams).then((result)=>{
                    //todo
                });
            }
        });


        this.props.getKuis(this.state.routeParams).then((result)=>{
            this.setState({
                loading:false,
                kuis_id: this.props.kuis.rows[0].kuis_id, 
                kuis: this.props.kuis,
                routeParams: {
                    ...this.state.routeParams,
                    kuis_id: this.props.kuis.rows[0].kuis_id,
                    // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
                }
            },()=>{
                this.props.getPenggunaKuis(this.state.routeParams).then((result)=>{
                    
                });
            });
        });
    }

    refreshPeringkat = () => {
        this.props.getPenggunaKuis(this.state.routeParams).then((result)=>{
                    
        });
    }

    render()
    {
        return (
            <Page name="peringkatKuis" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Peringkat</NavTitle>
                    <NavTitleLarge>
                        Peringkat
                    </NavTitleLarge>
                </Navbar>
                {this.state.kuis.rows.map((option)=>{
                    return (
                        <Card style={{borderBottom:'4px solid #4dd0e1'}}>
                            <CardHeader style={{height:'70px', backgroundImage:'url('+localStorage.getItem('api_base')+'/assets/berkas/'+option.gambar_kuis+')', backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat'}}>
                                <div className="mantab" style={{
                                    backgroundColor:'rgba(0, 0, 0, 0.6)',
                                    width:'1000%',
                                    marginLeft:'-15px',
                                    marginRight:'-15px',
                                    paddingLeft:'10px',
                                    marginBottom:'-20px',
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
                            <CardContent>
                                {option.jumlah_peserta} peserta 
                                {/* <Button raised fill onClick={this.refreshPeringkat}>Refresh</Button> */}
                            </CardContent>
                        </Card>
                    )
                })}
                <Block strong>
                    {this.props.pengguna_kuis.rows.map((option)=>{
                        return (
                            <Card style={{background:'#434343'}}>
                                <CardContent>
                                    <Row>
                                        <Col width="10">
                                            {option.peringkat}
                                        </Col>
                                        <Col width="80">
                                            <Progressbar style={{height:'25px',background:'#D50000'}} progress={parseInt(option.skor)} id="demo-inline-progressbar"> 
                                            </Progressbar>
                                            <div>
                                                <Row>
                                                    <Col width="80">
                                                        {option.nama_pengguna} ({option.benar}/{option.total})
                                                    </Col>
                                                    <Col width="20" style={{textAlign:'right'}}>
                                                        {/* {parseInt(option.status_mengerjakan_id)} */}
                                                        {parseInt(option.status_mengerjakan_id) === 2 &&
                                                        <Icon style={{color:'#61d800', fontSize:'15px'}} ios="f7:checkmark_alt_circle_fill" aurora="f7:checkmark_alt_circle_fill" md="material:checkmark_alt_circle_fill" tooltip="Selesai"/>
                                                        }
                                                        
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col width="10">
                                            {option.skor}
                                        </Col>
                                    </Row>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Block>
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

export default (connect(mapStateToProps, mapDispatchToProps)(peringkatKuis));
  