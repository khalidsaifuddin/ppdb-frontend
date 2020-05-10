import React, { Component } from 'react';
import {
  Icon,
  Block,
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
        <Block className="pencarianSekolah">
          {this.props.ppdb_sekolah.rows.map((option, key)=> {
            return (
              <Card key={key} className="demo-card-header-pic">
                <CardContent padding={false}>
                  <Row>
                    <Col width="30" tabletWidth="20" style={{background:"url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                      <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                    </Col>
                    <Col width="70" tabletWidth="80">
                      <Row noGap>
                        <Col width="100">
                          <Link href={"/ProfilSekolah/"+"sekolah_id"}>
                            <h3 style={{marginTop: '0px', marginBottom: '0px'}}>
                              {this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nama.replace(new RegExp(this.props.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.props.keyword.toUpperCase()+"</span>")}} /> : option.nama} 
                              &nbsp;
                              ({this.props.keyword ? <span dangerouslySetInnerHTML= {{__html:option.npsn.replace(new RegExp(this.props.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.props.keyword.toUpperCase()+"</span>")}} /> : option.npsn})
                            </h3>
                          </Link>
                        </Col>
                        <Col width="100" tabletWidth="50">
                          Kecamatan: <b>{option.kecamatan}</b>
                          <br/>Kabupaten: <b>{option.kabupaten}</b>
                          <br/>Provinsi: <b>{option.provinsi}</b>
                          <br/>Alamat: <b>{option.alamat_jalan}, {option.kode_pos}</b>
                          <span className="hilangDiDesktop">
                            Bentuk: <b>{option.bentuk}</b>
                            <br/>Status: <b>{option.status}</b>
                          </span>
                        </Col>
                        <Col width="50" className="hilangDiMobile" tabletWidth="50">
                          Bentuk: <b>{option.bentuk}</b>
                          <br/>Status: <b>{option.status}</b>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardContent>
                <CardFooter className="no-border" style={{display:'-webkit-inline-box', width:'100%'}}>
                  <Button raised fill>
                    <Icon ios="f7:doc_plaintext" style={{fontSize:'20px'}}/>
                    &nbsp; Daftarkan Peserta Didik ke Sekolah Ini
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </Block>
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
