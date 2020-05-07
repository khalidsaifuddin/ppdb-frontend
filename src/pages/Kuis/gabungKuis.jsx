import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button, Card, CardContent, List, ListInput
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

class gabungKuis extends Component {
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
            // this.props.getKuis(this.state.routeParams).then((result)=>{
            //     this.setState({
            //         loading:false
            //     });
            // });
        });

    }

    copyCodeToClipboard = () => {
        // console.log(this.textArea);
        const el = this.textArea;
        el.select();
        document.execCommand("copy");
    }

    prosesGabungKuis = () =>{
        this.$f7router.navigate('/praTampilKuis/'+this.state.routeParams.kode_kuis);
    }

    setStateValue = (key) => (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: e.currentTarget.value
            }
        },()=>{

        });

    }

    render()
    {
        return (
            <Page name="gabungKuis" hideBarsOnScroll>
                <Card>
                    <CardContent style={{textAlign:'center'}}>
                        <h3>Ikut Kuis Sekarang!</h3>
                        <h4>Masukkan kode kuis:</h4>
                        <List>
                            <ListInput
                                // label={"Kode Kuis"}
                                outline
                                floatingLabel
                                clearButton
                                type="text"
                                // resizable
                                placeholder={"Kode Kuis"}
                                style={{width:'100%'}}
                                onChange={this.setStateValue('kode_kuis')}
                                // defaultValue={element.teks}
                                >
                            </ListInput>
                        </List>
                        <br/>
                        <Button raised large fill onClick={this.prosesGabungKuis}>
                        Ikuti Kuis Sekarang
                        </Button>
                    </CardContent>
                </Card>
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

export default (connect(mapStateToProps, mapDispatchToProps)(gabungKuis));
  