import React, {Component} from 'react';
import {
  Page,
  Icon,
  Navbar,
  NavTitle,
  Button,
  Row,
  Col,
  Card,
  CardContent,
  CardFooter,
  Subnavbar,
  Searchbar,
  Link,
  Block
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

// import Pagination from "material-ui-flat-pagination";
import Pagination from "react-js-pagination";

class DetailcalonpdSekolah extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      loading: false,
      routeParams:{
        searchText: '',
        kode_wilayah: (localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi') : null),
        id_level_wilayah: (localStorage.getItem('id_level_wilayah_aplikasi') ? localStorage.getItem('id_level_wilayah_aplikasi') : null)
      },
      activePage: 1,
      start: 0,
      limit: 10,
      dummy_rows: [
        {
          foo:'bar'
        }
        ,{
          foo:'bar'
        }
        ,{
          foo:'bar'
        }
      ]
    }
  }
  
  getData = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        status_sekolah: 1,
        nomor_pilihan: 1,
        start: this.state.start,
        limit: this.state.limit
      },
      loading: true
    }, ()=> {
      this.props.getSekolahCalonpd(this.state.routeParams).then((result)=>{
        this.setState({
          loading: false
        });
      });
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
      this.props.getSekolahCalonpd(this.state.routeParams).then((result)=>{
        this.setState({
          loading: false
        })
      });
    });
  }

  componentDidMount = () => {
    this.getData();
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
      this.props.getSekolahCalonpd(this.state.routeParams).then((result)=>{
        this.setState({
          loading: false
        })
      });
    });
  }

  render() {
    return (
      <Page name="cari">
        <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
          <NavTitle sliding>Daftar Sekolah</NavTitle>
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
        {/* <Block strong style={{marginTop:'0px', marginBottom:'0px'}}> */}
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.props.sekolah_calonpd.countAll}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            // style={{marginTop:'44px'}}
          />
        {/* </Block> */}
        <div className="daftarSekolah daftarPdSekolah" style={{marginTop:'0px'}}>
          {this.state.loading &&
          <>
          {this.state.dummy_rows.map((opt, key)=>{
            return (

              <Card key={key} noShadow noBorder className={"skeleton-text skeleton-effect-blink"}>
                <CardContent padding={false}>
                  <div className="gambarSekolah" style={{background: '#cccccc'}}>
                    {/* <img src={"http://foto.data.kemdikbud.go.id/getImage/" + "option.npsn" + "/1.jpg"}></img>  */}
                  </div>
                  <div className="tentangSekolah">
                    <Link href={"/detailCalonpdSekolah/"+"sekolah_id"}>
                      <h3>
                        <span>{"option.nama"}</span>
                        <b>({"option.npsn"})</b>
                      </h3>
                    </Link>
                    <Row>
                      <Col width="100" tabletWidth="30">
                        <div className="keteranganSekolah">
                          <span>Kecamatan</span>
                          <b>{"option.kecamatan"}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Kabupaten</span>
                          <b>{"option.kabupaten"}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Provinsi</span>
                          <b>{"option.provinsi"}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Alamat</span>
                          <b>{"option.alamat_jalan"}</b>
                        </div>
                      </Col>
                      <Col width="100" tabletWidth="25">
                        <div className="keteranganSekolah">
                          <span>Bentuk</span>
                          <b>{"option.bentuk"}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Status</span>
                          {"option.status"}
                        </div>
                      </Col>
                      <Col width="100" tabletWidth="45">
                        <div className="sekolahStatistik">
                          <p style={{backgroundColor:'#cccccc'}}>Kouta <b>{"0"}</b></p>
                          <p style={{backgroundColor:'#cccccc'}}>Pendaftar <b>{"0"}</b></p>
                          <p style={{backgroundColor:'#cccccc'}}>Diterima <b>{"0"}</b></p>
                          <p style={{backgroundColor:'#cccccc'}}>Sisa Kouta <b>{"0"}</b></p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button raised fill color="deeporange" href={"/detailCalonpdSekolah/" + "option.sekolah_id"} style={{backgroundColor:'#cccccc'}}>
                    <Icon f7="house_alt" size="16px"/> Lihat Data Pendaftar Sekolah Ini
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
          </>
          }
          {!this.state.loading &&
          <>
          {this.props.sekolah_calonpd.rows.map((option)=> {
            return (
              <Card key={option.sekolah_id} noShadow noBorder>
                <CardContent padding={false}>
                  <div className="gambarSekolah" style={{backgroundImage: 'url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)'}}>
                    <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"}></img> 
                  </div>
                  <div className="tentangSekolah">
                    <Link href={"/detailCalonpdSekolah/"+option.sekolah_id}>
                      <h3>
                        <span>{option.nama}</span>
                        <b>({option.npsn})</b>
                      </h3>
                    </Link>
                    <Row>
                      <Col width="100" tabletWidth="30">
                        <div className="keteranganSekolah">
                          <span>Kecamatan</span>
                          <b>{option.kecamatan}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Kabupaten</span>
                          <b>{option.kabupaten}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Provinsi</span>
                          <b>{option.provinsi}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Alamat</span>
                          <b>{option.alamat_jalan}</b>
                        </div>
                      </Col>
                      <Col width="100" tabletWidth="25">
                        <div className="keteranganSekolah">
                          <span>Bentuk</span>
                          <b>{option.bentuk}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Status</span>
                          {option.status}
                        </div>
                      </Col>
                      <Col width="100" tabletWidth="45">
                        <div className="sekolahStatistik">
                          <p>Kouta <b>{option.kouta}</b></p>
                          <p>Pendaftar<Link href={"/detailCalonpdSekolah/" + option.sekolah_id} style={{color:'white'}}><b>{option.pendaftar}</b></Link></p>
                          <p>Diterima <b>{option.terima}</b></p>
                          <p>Sisa Kouta <b>{option.sisa_kouta}</b></p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button raised fill color="deeporange" href={"/detailCalonpdSekolah/" + option.sekolah_id}>
                    <Icon f7="house_alt" size="16px"/> Lihat Data Pendaftar Sekolah Ini
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
          </>
          }
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.limit}
          totalItemsCount={this.props.sekolah_calonpd.countAll}
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
    getSekolahCalonpd: Actions.getSekolahCalonpd,
  }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah }) {
  return {
    window_dimension: App.window_dimension,
    sekolah_calonpd: PPDBSekolah.sekolah_calonpd,
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DetailcalonpdSekolah));
  