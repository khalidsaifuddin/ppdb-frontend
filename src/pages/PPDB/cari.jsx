import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, CardHeader, Row, Col, Card, CardContent, CardFooter, Link, NavRight, Subnavbar, BlockTitle, Searchbar, Segmented, Tabs, Tab
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';
import moment from 'moment';

import CariPesertaDidik from './cariPesertaDidik';
import CariSekolah from './cariSekolah';
import PPDBSekolahReducer from '../../store/reducers/PPDB/Sekolah.reducers';

class cari extends Component {
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

    cari = () => {
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
                keyword: event.target[0].value,
                searchText: event.target[0].value
            }
        },()=>{
            this.props.setKeyword(this.state.routeParams.keyword);

            this.props.getPesertaDidik(this.state.routeParams);
            this.props.getPPDBSekolah(this.state.routeParams);

        })
    }

    ketikCari = (e) => {
        // console.log(e.currentTarget.value);
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                keyword: e.currentTarget.value,
                searchText: e.currentTarget.value
            }
        },()=>{
            this.props.setKeyword(this.state.routeParams.keyword);
        });
    }

    repeatKataKunci = (kata_kunci) => {
        // alert(kata_kunci);
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: kata_kunci,
                searchText: kata_kunci,

            }
        },()=>{
            this.props.setKeyword(kata_kunci);
            this.props.getPesertaDidik(this.state.routeParams);
            this.props.getPPDBSekolah(this.state.routeParams);
        })
    }

    render()
    {
        return (
            <Page name="cari" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Pencarian</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari peserta didik/sekolah..."
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.cari}
                            customSearch={true}
                            onChange={this.ketikCari}
                            value={this.state.routeParams.keyword}
                            // clickClear={this.clickClear}
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>
                
                <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>

                    Riwayat Pencarian:<br/>
                    <div style={{background:'#FAFAFA',border:'0px solid #ccc', padding:'8px', borderRadius:'4px'}}>
                    {this.state.riwayat_kata_kunci.map((option)=>{
                        
                        if(this.state.riwayat_kata_kunci.indexOf(option) <= 10){
                            return (
                                <><a onClick={()=>this.repeatKataKunci(option.kata_kunci)}><b><i>{option.kata_kunci}</i></b></a>, </>
                            )
                        }
                        
                    })}

                    </div>
                    {/* <br/> */}
                    {/* <b><i>{localStorage.getItem('riwayat_kata_kunci').substring(2,localStorage.getItem('riwayat_kata_kunci').length)}</i></b><br/> */}
                    <a onClick={()=>{localStorage.setItem('riwayat_kata_kunci','');this.setState({riwayat_kata_kunci:[]});}}>Bersihkan riwayat pencarian</a>
                </Block>
                
                <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '8px', marginBottom: '8px'}}>
                    <Button tabLink="#tab-1" tabLinkActive>Peserta Didik ({this.props.peserta_didik.countAll ? this.props.peserta_didik.countAll : "0"})</Button>
                    <Button tabLink="#tab-2">Sekolah ({this.props.ppdb_sekolah.countAll ? this.props.ppdb_sekolah.countAll : "0"})</Button>
                </Segmented>
                <Tabs animated style={{height:'initial'}}>
                    <Tab id="tab-1" className="page-content" tabActive style={{padding:'0px', overflow:'hidden'}}>
                        <CariPesertaDidik />
                        
                    </Tab>
                    <Tab id="tab-2" className="page-content" style={{padding:'0px', overflow:'hidden'}}>
                        <CariSekolah />
                    
                    </Tab>
                </Tabs>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getPesertaDidik: Actions.getPesertaDidik,
      getPPDBSekolah: Actions.getPPDBSekolah,
      setKeyword: Actions.setKeyword
    }, dispatch);
}

function mapStateToProps({ App, PPDBPesertaDidik, PPDBSekolah }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        peserta_didik: PPDBPesertaDidik.peserta_didik,
        ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
        keyword: App.keyword
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(cari));
  