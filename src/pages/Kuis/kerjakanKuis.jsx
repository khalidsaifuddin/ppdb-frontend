import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button, Card, CardContent, List, ListInput, CardHeader, Appbar, Searchbar, Progressbar, BlockTitle, Sheet, PageContent
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

let socket;

class kerjakanKuis extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id_peserta: JSON.parse(localStorage.getItem('user')).pengguna_id,
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
        },
        pertanyaan_kuis: [{
            pertanyaan_kuis_id: '',
            nama: '-'
        }],
        sekuen_pertanyaan: 1,
        pilihan_pertanyaan_kuis: [],
        benar: 0,
        skor: 0,
        sheetOpened: false
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

    warna = [
        '#E65100',
        '#1B5E20',
        '#006064',
        '#311B92',
        '#1565C0',
        '#E040FB'
    ]

    componentDidMount = () => {
        // let socket = io(localStorage.getItem('socket_url'));

        this.props.getKuis(this.state.routeParams).then((result)=>{

            this.setState({
                loading:false,
                kuis: this.props.kuis.rows[0]
            },()=>{

                let pertanyaanKuis = [];

                for (const key in this.state.kuis.pertanyaan_kuis) {
                    if (this.state.kuis.pertanyaan_kuis.hasOwnProperty(key)) {
                        const element = this.state.kuis.pertanyaan_kuis[key];
                        
                        pertanyaanKuis = [
                            ...pertanyaanKuis,
                            element
                        ];
                    }
                }

                this.setState({
                    ...this.state,
                    pertanyaan_kuis: pertanyaanKuis
                },()=>{
                    // console.log(this.state.pertanyaan_kuis);

                    let pilihanPertanyaanKuis = [];

                    for (const key in this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].pilihan_pertanyaan_kuis) {
                        if (this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].pilihan_pertanyaan_kuis.hasOwnProperty(key)) {
                            const elementPilihan = this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].pilihan_pertanyaan_kuis[key];
                            
                            pilihanPertanyaanKuis = [
                                ...pilihanPertanyaanKuis,
                                elementPilihan
                            ];
                        }
                    }

                    this.setState({
                        ...this.state,
                        pilihan_pertanyaan_kuis: pilihanPertanyaanKuis
                    });
                })
            });
        });

    }

    pilihJawaban = (id) => {

        console.log(parseInt(this.state.sekuen_pertanyaan));
        console.log(parseInt(this.state.kuis.jumlah_pertanyaan));
        if(parseInt(this.state.sekuen_pertanyaan) < parseInt(this.state.kuis.jumlah_pertanyaan)){

            this.setState({
                routeParamsJawabanKuis: {
                    ...this.state.routeParamsJawabanKuis,
                    pengguna_id:JSON.parse(localStorage.getItem('user')).pengguna_id,
                    kuis_id:this.$f7route.params['kuis_id'],
                    pertanyaan_kuis_id:this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].pertanyaan_kuis_id,
                    pilihan_pertanyaan_kuis_id:id,
                    nilai:1,
                    isian:''
                }
            },()=>{
                this.props.simpanJawabanKuis(this.state.routeParamsJawabanKuis).then((result)=>{
                    // console.log(result.payload.rows[0].benar);
                    this.setState({
                        ...this.state,
                        benar: parseInt(this.state.benar)+parseInt(result.payload.rows[0].benar),
                        skor: ((parseInt(this.state.benar)+parseInt(result.payload.rows[0].benar))/this.state.kuis.jumlah_pertanyaan)*100,
                        sekuen_pertanyaan: parseInt(this.state.sekuen_pertanyaan)+1
                    },()=>{
                        // console.log(this.state);
                        this.setState({
                            ...this.state,
                            routeParams: {
                                ...this.state.routeParams,
                                kuis_id: this.$f7route.params['kuis_id'],
                                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                                status_mengerjakan_id: 1,
                                skor: this.state.skor,
                                total: this.state.kuis.jumlah_pertanyaan,
                                benar: this.state.benar,
                                salah: parseInt(this.state.kuis.jumlah_pertanyaan)-parseInt(this.state.benar)
                            }
                        },()=>{
                
                            this.props.simpanPenggunaKuis(this.state.routeParams).then((result)=>{
                                
                                let pilihanPertanyaanKuis = [];
        
                                for (const key in this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].pilihan_pertanyaan_kuis) {
                                    if (this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].pilihan_pertanyaan_kuis.hasOwnProperty(key)) {
                                        const elementPilihan = this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].pilihan_pertanyaan_kuis[key];
                                        
                                        pilihanPertanyaanKuis = [
                                            ...pilihanPertanyaanKuis,
                                            elementPilihan
                                        ];
                                    }
                                }
        
                                this.setState({
                                    ...this.state,
                                    pilihan_pertanyaan_kuis: pilihanPertanyaanKuis
                                },()=>{
                                    let socket = io(localStorage.getItem('socket_url'));

                                    socket.emit('createMessage', this.state.routeParams.kuis_id, (data) => { });
                                });

                            });
                
                        });

                    });

                });
            });

        }else{

            this.setState({
                routeParamsJawabanKuis: {
                    ...this.state.routeParamsJawabanKuis,
                    pengguna_id:JSON.parse(localStorage.getItem('user')).pengguna_id,
                    kuis_id:this.$f7route.params['kuis_id'],
                    pertanyaan_kuis_id:this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].pertanyaan_kuis_id,
                    pilihan_pertanyaan_kuis_id:id,
                    nilai:1,
                    isian:''
                }
            },()=>{
                
                this.props.simpanJawabanKuis(this.state.routeParamsJawabanKuis).then((result)=>{

                    this.setState({
                        ...this.state,
                        benar: parseInt(this.state.benar)+parseInt(result.payload.rows[0].benar),
                        skor: ((parseInt(this.state.benar)+parseInt(result.payload.rows[0].benar))/this.state.kuis.jumlah_pertanyaan)*100,
                        // sekuen_pertanyaan: parseInt(this.state.sekuen_pertanyaan)+1
                    },()=>{

                        
                        this.setState({
                            ...this.state,
                            routeParams: {
                                ...this.state.routeParams,
                                kuis_id: this.$f7route.params['kuis_id'],
                                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                                status_mengerjakan_id: 1,
                                skor: this.state.skor,
                                total: this.state.kuis.jumlah_pertanyaan,
                                benar: this.state.benar,
                                salah: parseInt(this.state.kuis.jumlah_pertanyaan)-parseInt(this.state.benar)
                            }
                        },()=>{
                
                            this.props.simpanPenggunaKuis(this.state.routeParams).then((result)=>{
                                
                                // console.log('akhir dari kuis');
                                let socket = io(localStorage.getItem('socket_url'));
                                socket.emit('createMessage', this.state.routeParams.kuis_id, (data) => { });
            
                                this.setState({
                                    ...this.state,
                                    sheetOpened: true
                                });
                                
                            });
                
                        });

                    });
                

                });
            });


        }
    }

    lihatHasilAkhir = () => {
        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                kuis_id: this.$f7route.params['kuis_id'],
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                status_mengerjakan_id: 2,
                skor: this.state.skor,
                total: this.state.kuis.jumlah_pertanyaan,
                benar: this.state.benar,
                salah: parseInt(this.state.kuis.jumlah_pertanyaan)-parseInt(this.state.benar)
            }
        },()=>{

            this.props.simpanPenggunaKuis(this.state.routeParams).then((result)=>{
                this.setState({
                    sheetOpened:false
                },()=>{
                    let socket = io(localStorage.getItem('socket_url'));
                    socket.emit('createMessage', this.state.routeParams.kuis_id, (data) => { });

                    this.$f7router.navigate('/hasilAkhirKuis/'+this.state.routeParams.kuis_id);
                });
            });

        });
    }

    render()
    {
        return (
            <Page name="kerjakanKuis" hideBarsOnScroll>
                <Navbar>
                    {/* <Appbar> */}
                        <div className="left" style={{width:'100%'}}>
                            {/* <Button small panelToggle="left" className="display-flex" iconF7="bars" /> */}
                            <Button small className="display-flex margin-left-half" iconF7="pause_fill" />
                            <Button small className="display-flex margin-left-half">
                                {this.state.sekuen_pertanyaan}/{this.state.kuis.jumlah_pertanyaan}
                            </Button>
                            <Progressbar style={{height:'20px'}} progress={((this.state.sekuen_pertanyaan/this.state.kuis.jumlah_pertanyaan)*100)} id="demo-inline-progressbar"></Progressbar>
                            {/* <Button small className="display-flex margin-left-half" iconF7="arrowshape_turn_up_left_fill" /> */}
                        </div>
                        {/* <div className="right" style={{width:'65%'}}>
                        </div> */}
                    {/* </Appbar> */}
                </Navbar>
                {/* <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Kuis</NavTitle>
                    <NavTitleLarge>
                        Kuis
                    </NavTitleLarge>
                </Navbar> */}
                <Card>
                    <CardContent style={{fontSize:'15px', fontWeight:'bold'}}>
                        Skor: {this.state.skor ? parseFloat(this.state.skor).toFixed(1) : "0"}/100
                    </CardContent>
                </Card>
                <Card>
                    <CardContent style={{fontSize:'20px', fontWeight:'bold', minHeight:'100px'}}>
                        {this.state.pertanyaan_kuis[(this.state.sekuen_pertanyaan-1)].teks}
                    </CardContent>
                </Card>
                <BlockTitle>Pilihan Jawaban</BlockTitle>
                
                {this.state.pilihan_pertanyaan_kuis.map((option)=>{
                    return (
                        <Link style={{display:'initial', color:'white'}} onClick={()=>this.pilihJawaban(option.pilihan_pertanyaan_kuis_id)}>
                            <Card>
                                <CardContent style={{fontSize:'20px', fontWeight:'bold', minHeight:'50px', backgroundColor:this.warna[this.state.pilihan_pertanyaan_kuis.indexOf(option)]}}>
                                    {option.teks}
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
                <Sheet
                    className="demo-sheet-swipe-to-close"
                    style={{height: 'auto', '--f7-sheet-bg-color': '#fff'}}
                    // swipeToClose
                    backdrop
                    opened={this.state.sheetOpened}
                    closeByBackdropClick={false}
                    closeByOutsideClick={false}
                    // onSheetClosed={() => {
                    //     //do nothing
                    // }}
                    >
                    <PageContent>
                        {/* <BlockTitle large>Hello!</BlockTitle> */}
                        <Block>
                            <h3>Selamat!</h3>
                            <p>Anda telah sampai pada akhir dari kuis ini</p>
                            <Button raised fill large onClick={this.lihatHasilAkhir}>
                                Lihat Hasil Akhir
                            </Button>
                        </Block>
                    </PageContent>
                </Sheet>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getKuis: Actions.getKuis,
      getPertanyaanKuis: Actions.getPertanyaanKuis,
      simpanJawabanKuis: Actions.simpanJawabanKuis,
      simpanPenggunaKuis: Actions.simpanPenggunaKuis
    }, dispatch);
}

function mapStateToProps({ App, Kuis }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        kuis: Kuis.kuis,
        pertanyaan_kuis: Kuis.pertanyaan_kuis
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(kerjakanKuis));
  