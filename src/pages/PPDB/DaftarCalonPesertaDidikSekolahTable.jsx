import React, {Component} from 'react';
import { Page, Navbar, NavTitle, Subnavbar, Searchbar, Card, CardContent, Row, Col, Button, Block } from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import Pagination from "react-js-pagination";

class DaftarCalonPesertaDidikSekolahTable extends Component {
    state = {
        loading: true,
        disabled: true,
        routeParams:{
            sekolah_id: (localStorage.getItem('kode_aplikasi')  === 'PPDB-sekolah' ? JSON.parse(localStorage.getItem('user')).sekolah_id : null),
            kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi') : '',
            searchText : '',
            start: 0,
            limit: 50,
            urut: 'jarak',
            verifikasi: 'N'
        },
        activePage: 1,
        start: 0,
        limit: 50,
    }

    getData = () => {
        this.props.getCalonPesertaDidikSekolahList(this.state.routeParams).then(e => {
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

    handleDecimal = (val) => {
        if(val) return parseFloat(val).toFixed(2);
    }

    unduhExcel = () => {
        const { sekolah_id, keyword, urut, verifikasi } = this.state.routeParams;
        const link = localStorage.getItem('api_base')+"/api/CalonPesertaDidik/getCalonPesertaDidikSekolah_excel";
        const params = "?sekolah_id=" + sekolah_id + "&keyword="+keyword+"&start=0&limit=999999&urut=" + urut + "&verifikasi=" + verifikasi;

        window.open(link + params, "_blank");
    }

    componentDidMount(){
        this.setState({ loading: true });
        this.getData();
    }

    render()
    {
        const { calon_pd_sekolah_list } = this.props;
        const { limit, activePage, loading } = this.state;

        return (
            <Page name="cari" style={{paddingBottom:'50px'}}>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Pendaftar di SMP NEGERI 2 SUKODONO</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            placeholder="Cari Peserta Didik (NIK/Nama/NISN)..."
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.getData}
                            customSearch={true}
                            onChange={this.ketikCari}
                            defaultValue={this.state.routeParams.keyword}
                        />
                    </Subnavbar>
                </Navbar>
                <Block strong style={{marginTop:'-4px', marginBottom:'0px'}}>Data Pendaftar</Block>
                <Block strong style={{marginTop:'0px', marginBottom:(localStorage.getItem('kode_aplikasi') === 'PPDB' ? '8px' : '-45px')}}>
                    <Row>
                        <Col tabletWidth="80" width="50">Menampilkan { calon_pd_sekolah_list.countAll } data pendaftar belum diverifikasi</Col>
                        <Col tabletWidth="20" width="50"><Button fillIos iconF7="arrow_down_doc" iconSize="medium" color="green" onClick={this.unduhExcel}>Unduh Xls</Button></Col>
                    </Row>
                </Block>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={calon_pd_sekolah_list.countAll}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    // style={{marginTop:'44px'}}
                />

                <div className="card data-table">
                    <table>
                        <thead>
                            <tr>
                                <th className="min-w-32 text-center">No</th>
                                <th className="min-w-132 text-left">Nama</th>
                                <th className="min-w-128 text-center">NIK</th>
                                <th className="min-w-32 text-center">JK</th>
                                <th className="min-w-100 text-left">Tempat Lahir</th>
                                <th className="min-w-70 text-left">Tanggal Lahir</th>
                                <th className="min-w-70 text-center">Jalur</th>
                                <th className="min-w-32 text-center">Pilihan</th>
                                <th className="min-w-32 text-center">Jarak (KM)</th>
                                <th className="min-w-32 text-center">No Urut</th>
                                <th className="min-w-128 text-left">Sekolah Asal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading && (<tr><td colSpan={11}><i>Memuat...</i></td></tr>)
                            }
                            {
                                !loading && calon_pd_sekolah_list.rows.map((n, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="min-w-32 text-center">{ (limit * (activePage-1)) + key + 1}</td>
                                            <td className="min-w-132 text-left"><a href="#">{ n.nama }</a></td>
                                            <td className="min-w-128 text-center">{ n.nik }</td>
                                            <td className="min-w-32 text-center">{ n.jenis_kelamin }</td>
                                            <td className="min-w-100 text-left">{ n.tempat_lahir}</td>
                                            <td className="min-w-70 text-left">{ n.tanggal_lahir }</td>
                                            <td className="min-w-70 text-center">{ n.jalur }</td>
                                            <td className="min-w-32 text-center">{ n.urut_pilihan }</td>
                                            <td className="min-w-32 text-center">{ this.handleDecimal(n.jarak_km) }</td>
                                            <td className="min-w-32 text-center">{ n.urutan }</td>
                                            <td className="min-w-128 text-left">{ n.sekolah_asal.nama }</td>
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
                    totalItemsCount={calon_pd_sekolah_list.countAll}
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
        getCalonPesertaDidikSekolahList             : Actions.getCalonPesertaDidikSekolahList,
    }, dispatch);
  }
  
  function mapStateToProps({ App, PPDBPesertaDidik }) {
    return {
        calon_pd_sekolah_list                       : PPDBPesertaDidik.calon_pd_sekolah_list
    }
  }

export default (connect(mapStateToProps, mapDispatchToProps)(DaftarCalonPesertaDidikSekolahTable));
  