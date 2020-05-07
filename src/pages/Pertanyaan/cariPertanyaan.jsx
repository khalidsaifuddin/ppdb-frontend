import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, Subnavbar, BlockTitle, Searchbar
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';
import moment from 'moment';

class cariPertanyaan extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            // pantauan: 1
        },
        pertanyaan: {
            rows: [],
            total: 0
        },
        riwayat_kata_kunci: []
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
        // this.props.getPertanyaanPantauan(this.state.routeParams).then((result)=>{
        //     this.setState({
        //         pertanyaan: this.props.pertanyaan_pantauan
        //     });
        // });
        let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
        let objRiwayat = [];

        for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
            const element = arrRiwayat[indexRiwayat];

            objRiwayat[indexRiwayat] = {
                kata_kunci: element
            };
            
        }

        this.setState({
            riwayat_kata_kunci: objRiwayat
        },()=>{
            console.log(this.state.riwayat_kata_kunci);
        });
    }

    cariPertanyaan = () => {
        localStorage.setItem('riwayat_kata_kunci', event.target[0].value + ', ' + localStorage.getItem('riwayat_kata_kunci'));
        // console.log(event.target[0].value);
        let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
        let objRiwayat = [];

        for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
            const element = arrRiwayat[indexRiwayat];

            objRiwayat[indexRiwayat] = {
                kata_kunci: element
            };
            
        }

        this.setState({
            riwayat_kata_kunci: objRiwayat
        },()=>{
            console.log(this.state.riwayat_kata_kunci);
        });

        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value
            }
        },()=>{

            this.props.getPertanyaan(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    pertanyaan: this.props.pertanyaan
                });
            });

        })
    }

    ketikCari = (e) => {
        // console.log(e.currentTarget.value);
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                keyword: e.currentTarget.value
            }
        })
    }

    repeatKataKunci = (kata_kunci) => {
        // alert(kata_kunci);
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: kata_kunci
            }
        },()=>{
            this.props.getPertanyaan(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    pertanyaan: this.props.pertanyaan
                });
            });
        })
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

    render()
    {
        return (
            <Page name="cariPertanyaan" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Cari Pertanyaan</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari pertanyaan..."
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.cariPertanyaan}
                            customSearch={true}
                            onChange={this.ketikCari}
                            value={this.state.routeParams.keyword}
                            // clickClear={this.clickClear}
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>
                
                <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
                    Riwayat Pencarian:<br/>
                    {this.state.riwayat_kata_kunci.map((option)=>{

                        if(this.state.riwayat_kata_kunci.indexOf(option) <= 10){
                            return (
                                <><a onClick={()=>this.repeatKataKunci(option.kata_kunci)}><b><i>{option.kata_kunci}</i></b></a>, </>
                            )
                        }

                    })}
                    <br/>
                    {/* <b><i>{localStorage.getItem('riwayat_kata_kunci').substring(2,localStorage.getItem('riwayat_kata_kunci').length)}</i></b><br/> */}
                    <a onClick={()=>{localStorage.setItem('riwayat_kata_kunci','');this.setState({riwayat_kata_kunci:[]});}}>Bersihkan riwayat pencarian</a>
                </Block>

                <BlockTitle style={{marginTop:'8px'}}>Hasil Pencarian</BlockTitle>

                {this.state.loading ? 
                <>
                    <Col width="100">
                        <Card>
                            <CardHeader>
                                <b style={{fontSize:'23px'}} className="skeleton-text skeleton-effect-blink">xxxxxxxxxxxxxxxxxxx</b>
                            </CardHeader>
                            <CardContent style={{paddingTop:'8px'}}>
                                <div style={{marginTop:'-8px', width:'100%', overflowX:'hidden'}} className="skeleton-text skeleton-effect-blink">
                                    xxxxxxxxxxxxxxxxxxx<br/>
                                    xxxxxxxxxxxxxxxxxxxxxxxxx<br/>
                                    xxxxxxxxxxxxxxxxxxxxxx<br/>
                                    xxxxxxxxxxxxxxx<br/>
                                </div>
                                <hr style={{borderTop:'1px solid #eeeeee'}}/>
                                <span style={{fontSize:'12px', color: '#8c8c8c'}} className="skeleton-text skeleton-effect-blink">xxxxxxxxxxxxxxxxxxx <b>xxxxxxxxxxx</b></span><br/>
                                <span style={{fontSize:'12px', color: '#8c8c8c'}} className="skeleton-text skeleton-effect-blink">xxxxxxxxxxxxxxxxxxx <b>xxxxxxxxxxx</b></span>
                            </CardContent>
                            <CardFooter>
                                <Link className="skeleton-text skeleton-effect-blink">xxxxxxxxx</Link>
                                <Link className="skeleton-text skeleton-effect-blink">xxxxxxxxx</Link>
                            </CardFooter>
                        </Card>
                    </Col>  
                </> : 
                <>
                    <Block strong style={{marginBottom:'0px'}}>
                        Menampilkan <b>{this.state.pertanyaan.result}</b> hasil pencarian
                    </Block>
                    <Row>
                        {this.state.pertanyaan.rows.map((option)=>{
                            let tanggal = '';
                            let tgl = new Date(option.create_date);

                            tanggal = moment(option.create_date).format('D') + ' ' + this.bulan[(moment(option.create_date).format('M')-1)] + ' ' + moment(option.create_date).format('YYYY');
                            // tanggal = tgl.getDate() + ' ' + this.bulan[tgl.getMonth()] + ' ' + tgl.getFullYear();

                            return (
                                <Col width="100">
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
                                                <b style={{fontSize:'23px'}}>
                                                    {/* {option.judul} */}
                                                    {this.state.routeParams.keyword ? <span dangerouslySetInnerHTML= {{__html:option.judul.replace(new RegExp(this.state.routeParams.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.state.routeParams.keyword.toUpperCase()+"</span>")}} /> : option.judul}
                                                </b>
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
                                </Col>
                            )
                        })}
                    </Row>
                </>
                }
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getPertanyaan: Actions.getPertanyaan,
      getPertanyaanPantauan: Actions.getPertanyaanPantauan,
      simpanPantauan: Actions.simpanPantauan
    }, dispatch);
}

function mapStateToProps({ App, Pertanyaan }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        pertanyaan: Pertanyaan.pertanyaan,
        pertanyaan_pantauan: Pertanyaan.pertanyaan_pantauan
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(cariPertanyaan));
  