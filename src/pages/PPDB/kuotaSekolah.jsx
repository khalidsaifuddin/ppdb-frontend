import React, {Component} from 'react';
import { Page, Navbar, NavTitle, Subnavbar, Searchbar, Card, CardContent, Row, Col, Button } from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import Pagination from "react-js-pagination";

class Kuotasekolah extends Component {
    state = {
        loading: true,
        disabled: true,
        routeParams:{
            searchText : '',
            kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi') : '',
        },
        activePage: 1,
        start: 0,
        limit: 20,
    }

    getData = () => {
        this.props.getSekolah(this.state.routeParams).then(e => {
            this.setState({ loading: false });
        });
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            start: ((parseInt(pageNumber)-1)*parseInt(this.state.limit)),
            routeParams: {
                ...this.state.routeParams,
                start: ((parseInt(pageNumber)-1)*parseInt(this.state.limit))
            },
            activePage: pageNumber,
            loading: true
        },()=>{
            this.getData();
        });
    }

    ketikCari = (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                searchText: e.target.value
            }
        })
    }

    cari = () => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                start: 0
            },
            loading: true
        },()=>{
            this.getData();
        });
      }

    componentDidMount(){
        this.setState({ loading: true });
        this.getData();
    }

    render()
    {
        const { sekolah } = this.props;
        const { limit, activePage, loading } = this.state;

        return (
            <Page name="cari" style={{paddingBottom:'50px'}}>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Kuota Sekolah</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                        className="searchbar-demo"
                        placeholder="Cari Sekolah"
                        searchContainer=".search-list"
                        searchIn=".item-title"
                        onSubmit={this.cari}
                        customSearch={true}
                        onChange={this.ketikCari}
                        value={this.state.routeParams.searchText}
                        />
                    </Subnavbar>
                </Navbar>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.props.sekolah.countAll}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    // style={{marginTop:'44px'}}
                />

                <div className="card data-table">
                    <table>
                        <thead>
                            <tr>
                                <th className="text-center">No</th>
                                <th className="text-center">npsn</th>
                                <th className="label-cell">Sekolah</th>
                                <th className="text-center">Total Kuota</th>
                                <th className="text-center">Affirmasi</th>
                                <th className="text-center">Perpindahan<br/>Orang Tua</th>
                                <th className="text-center">Minat dan Bakat</th>
                                <th className="text-center">Zonasi</th>
                                <th className="text-center">Tahfidz</th>
                                <th className="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading && (<tr><td colSpan={9}><i>Memuat...</i></td></tr>)
                            }
                            {
                                !loading && sekolah.rows.map((n, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="text-center">{ (limit * (activePage-1)) + key + 1}</td>
                                            <td className="text-center">{ n.npsn }</td>
                                            <td className="lebel-cell">{ n.nama }</td>
                                            <td className="text-center">{ n.kuota ? n.kuota : '-' }</td>
                                            <td className="text-center">{ n.kuota_0100 ? n.kuota_0100 : '-' }</td>
                                            <td className="text-center">{ n.kuota_0200 ? n.kuota_0200 : '-' }</td>
                                            <td className="text-center">{ n.kuota_0300 ? n.kuota_0300 : '-' }</td>
                                            <td className="text-center">{ n.kuota_0400 ? n.kuota_0400 : '-' }</td>
                                            <td className="text-center">{ n.kuota_0500 ? n.kuota_0500 : '-' }</td>
                                            <td className="text-center">
                                                <Button fillIos href={ "/editKuotaSekolah/" + n.sekolah_id }>Ubah</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.props.sekolah.countAll}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    // style={{marginTop:'44px'}}
                />
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSekolah                                  : Actions.KUOTA_getSekolah,
    }, dispatch);
}

function mapStateToProps({ App, KuotaSekolah }) {
    return {
        window_dimension                            : App.window_dimension,
        sekolah                                     : KuotaSekolah.sekolah,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Kuotasekolah));
  