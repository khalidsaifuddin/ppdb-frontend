import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

class kodeKuis extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            kuis_id: this.$f7route.params['kuis_id']
        },
        loading:true
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
                this.setState({
                    loading:false
                });
            });
        });

    }

    copyCodeToClipboard = () => {
        // console.log(this.textArea);
        const el = this.textArea;
        el.select();
        document.execCommand("copy");
    }

    render()
    {
        return (
            <Page name="kodeKuis" hideBarsOnScroll>
                {this.state.loading ? 
                <>
                    <Block strong style={{marginTop:'0px', marginBottom:'8px', textAlign:'center'}}>
                        <span style={{fontSize:'20px'}} className="skeleton-text skeleton-effect-blink">Kode Kuis</span>
                        <br/>
                        <b className="skeleton-text skeleton-effect-blink">xxxxxxxxxxxxxxxxxxxxx</b>
                        <br/>
                        <textarea
                            className="skeleton-text skeleton-effect-blink"
                            style={{textAlign:'center', width:'100%', fontSize:'45px', fontWeight:'bold', marginTop:'40px', color:'#fdd835'}}
                            ref={(textarea) => this.textArea = textarea}
                            value="xxxxxxxxxxxxxxxxxxxxx"
                        />
                        {/* <h1 style={{fontSize:'45px', color:'#fdd835'}}>{option.kode_kuis}</h1> */}
                        <Button raised fill large onClick={this.copyCodeToClipboard} className="skeleton-text skeleton-effect-blink">
                            <Icon ios={"f7:doc_on_doc"} aurora={"f7:doc_on_doc"} md={"material:doc_on_doc"} tooltip="Salin Kode Kuis"/>
                            &nbsp;Salin Kode
                        </Button>
                    </Block>
                    <Block strong style={{marginTop:'0px', marginBottom:'8px', textAlign:'center'}} className="skeleton-text skeleton-effect-blink">
                        Silakan bagikan kode kuis diatas kepada calon peserta kuis ini
                        <br/>
                        <br/>
                        <Button style={{width:'100px', margin:'auto', background:'#cccccc', color:'#434343'}} raised fill onClick={()=>this.$f7router.navigate('/kuis/'+JSON.parse(localStorage.getItem('user')).pengguna_id)}>
                            Tutup
                        </Button>
                    </Block>
                </>
                :
                <>
                {this.props.kuis.rows.map((option)=>{
                    return (
                        <>
                            <Block strong style={{marginTop:'0px', marginBottom:'8px', textAlign:'center'}}>
                                <span style={{fontSize:'20px'}}>Kode Kuis</span>
                                <br/>
                                <b>"{option.judul}"</b>
                                <br/>
                                <textarea
                                    style={{textAlign:'center', width:'100%', fontSize:'45px', fontWeight:'bold', marginTop:'40px', color:'#fdd835'}}
                                    ref={(textarea) => this.textArea = textarea}
                                    value={option.kode_kuis}
                                />
                                {/* <h1 style={{fontSize:'45px', color:'#fdd835'}}>{option.kode_kuis}</h1> */}
                                <Button raised fill large onClick={this.copyCodeToClipboard}>
                                    <Icon ios={"f7:doc_on_doc"} aurora={"f7:doc_on_doc"} md={"material:doc_on_doc"} tooltip="Salin Kode Kuis"/>
                                    &nbsp;Salin Kode
                                </Button>
                            </Block>
                            <Block strong style={{marginTop:'0px', marginBottom:'8px', textAlign:'center'}}>
                                Silakan bagikan kode kuis diatas kepada calon peserta kuis ini
                                <br/>
                                <br/>
                                <Button style={{width:'100px', margin:'auto', background:'#cccccc', color:'#434343'}} raised fill onClick={()=>this.$f7router.navigate('/kuis/'+JSON.parse(localStorage.getItem('user')).pengguna_id)}>
                                    Tutup
                                </Button>
                            </Block>
                        </>
                    )
                })}
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
      getKuis: Actions.getKuis
    }, dispatch);
}

function mapStateToProps({ App, Kuis }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        kuis: Kuis.kuis
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(kodeKuis));
  