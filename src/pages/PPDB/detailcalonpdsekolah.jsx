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
  Link
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class DetailcalonpdSekolah extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      loading: false,
      routeParams:{
        searchText: '',
      }
    }
  }
  
  getData = () => {
    this.setState({
      routeParams: {
        ...this.state.routeParams
      }
    }, ()=> {
      this.props.getSekolahCalonpd(this.state.routeParams);
    });
  }

  ketikCari = (e) => {
    this.setState({
      routeParams: {
        ...this.state.routeParams,
        searchText: e.target.value,
      }
    })
  }

  componentDidMount = () => {
    this.getData();
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
              onSubmit={this.getData}
              customSearch={true}
              onChange={this.ketikCari}
              value={this.state.routeParams.searchText}
            />
          </Subnavbar>
        </Navbar>
        <div className="daftarSekolah daftarPdSekolah">
          {this.props.sekolah_calonpd.rows.map((option)=> {
            return (
              <Card key={option.sekolah_id} noShadow noBorder>
                <CardContent padding={false}>
                  <div className="gambarSekolah" style={{backgroundImage: 'url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)'}}>
                    <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"}></img> 
                  </div>
                  <div className="tentangSekolah">
                    <Link href={"/ProfilSekolah/"+"sekolah_id"}>
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
                          <p>Pendaftar <b>{option.pendaftar}</b></p>
                          <p>Diterima <b>{option.terima}</b></p>
                          <p>Sisa Kouta <b>{option.sisa_kouta}</b></p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button raised fill color="deeporange" href={"/detailCalonpdSekolah/" + option.sekolah_id}>
                    <Icon f7="house_alt" size="16px"/> Daftarkan Calon PD ke Sekolah Ini
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
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
  