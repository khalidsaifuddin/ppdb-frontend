import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Button, Card, CardContent, List, ListInput, CardHeader, Row, Col
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

class tampilKuis extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            // pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            kuis_id: this.$f7route.params['kuis_id']
        },
        loading:true,
        kuis: {
            kuis_id: '',
            nama: '-'
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
                ...this.state,
                pengguna_kuis: this.props.pengguna_kuis.rows[0],
                kuis: this.props.kuis.rows[0]
            },()=>{
                console.log(this.state);
            })
        });

    }


    render()
    {
        let tanggal = '';
        let tgl = new Date(this.state.pengguna_kuis.create_date);

        tanggal = moment(this.state.pengguna_kuis.create_date).format('D') + ' ' + this.bulan[(moment(this.state.pengguna_kuis.create_date).format('M')-1)] + ' ' + moment(this.state.pengguna_kuis.create_date).format('YYYY');

        return (
            <Page name="tampilKuis" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>...</NavTitle>
                    <NavTitleLarge>
                        ...
                    </NavTitleLarge>
                </Navbar>
                
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

export default (connect(mapStateToProps, mapDispatchToProps)(tampilKuis));
  