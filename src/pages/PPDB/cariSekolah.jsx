import React, { Component } from 'react';
import {
  Icon,
  Button,
  Row,
  Col,
  Card,
  CardContent,
  CardFooter,
  Link,
  BlockTitle
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class cariSekolah extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      loading: false,
      routeParams: {},
      pertanyaan: {
        rows: [],
        total: 0,
      },
      riwayat_kata_kunci: [],
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
    'Desember',
  ]

  render() {
    return (
      <div name="cariSekolah">
        <BlockTitle>Hasil Pencarian Sekolah</BlockTitle>
        <div className="daftarSekolah">
          {this.props.ppdb_sekolah.rows.map((option)=> {
            return (
              <Card key={option.sekolah_id} noShadow noBorder>
                <CardContent padding={false}>
                  <div className="gambarSekolah" style={{backgroundImage: 'url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)'}}>
                    <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"}></img> 
                  </div>
                  <div className="tentangSekolah">
                    <Link href={"/ProfilSekolah/"+"sekolah_id"}>
                      <h3>
                        {this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nama.replace(new RegExp(this.props.keyword, "ig"), this.props.keyword.toUpperCase())}} /> : option.nama}
                        ({this.props.keyword ? <b dangerouslySetInnerHTML= {{__html:option.npsn.replace(new RegExp(this.props.keyword, "ig"), this.props.keyword.toUpperCase())}} /> : option.npsn})
                      </h3>
                    </Link>
                    <Row>
                      <Col width="100" tabletWidth="50">
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
                          <b>{option.alamat_jalan}, {option.kode_pos}</b>
                        </div>
                      </Col>
                      <Col width="100" tabletWidth="50">
                        <div className="keteranganSekolah">
                          <span>Bentuk</span>
                          <b>{option.bentuk}</b>
                        </div>
                        <div className="keteranganSekolah">
                          <span>Status</span>
                          {option.status}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button raised fill color="deeporange" href={"/detailCalonpdSekolah/" + option.sekolah_id}>
                    <Icon f7="house_alt" size="16px"/> Daftar ke Sekolah Ini
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
  }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah }) {
  return {
    window_dimension: App.window_dimension,
    loading: App.loading,
    keyword: App.keyword,
    ppdb_sekolah: PPDBSekolah.ppdb_sekolah,
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(cariSekolah));
