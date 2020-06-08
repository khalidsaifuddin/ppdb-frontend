import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, Block, Link, Icon, Segmented, Button, CardContent, Row, Col, Card, CardHeader, List, ListInput, ListItem, Searchbar, Sheet, Toolbar, PageContent, Radio, NavLeft, NavRight, Fab, Subnavbar
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

import moment from 'moment';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import Routing from 'leaflet-routing-machine';
import ExtraMarkers from 'leaflet-extra-markers';

class petaPD extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            foo: 'bar'
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
        // console.log(this.$f7route.params['url']);
        console.log(this.$f7route.url.split("#")[1]);
        // localStorage.setItem('current_url', this.$f7route.url);

        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            
        });

    }

    render()
    {
        const position = [this.state.lintang, this.state.bujur];

        return (
            <Page name="petaPD">
                <Navbar sliding={false} backLink="Kembali">
                    <NavTitle sliding>Berkas</NavTitle>
                </Navbar>
                <Block strong style={{overflowX:'auto'}}>
                    <img style={{height:'800px'}} src={localStorage.getItem('api_base')+this.$f7route.url.split("#")[1]} />
                </Block>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading
    }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah, Ref, PPDBPesertaDidik }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(petaPD));
  