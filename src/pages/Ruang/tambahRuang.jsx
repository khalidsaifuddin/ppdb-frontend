import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button, BlockTitle, Card
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Dropzone from 'react-dropzone';

class tambahRuang extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
            jenis_ruang_id: 1
        },
        gambar_ruang: '',
        file_gambar_ruang: ''
    }

    setStateValue = (key) => (e) => {
        // console.log(key);
        // console.log(e.currentTarget.value);

        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: e.currentTarget.value
            }
        },()=>{
            // console.log(this.state.routeParams);
        });

    }

    editorChange = (e) => {
        // console.log(e);
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                deskripsi: e
            }
        },()=>{
            // console.log(this.state.routeParams);
        });
    }

    tambahRuang = () => {
        // alert('oke');
        this.setState({
            routeParams: {
                ...this.state.routeParams
            }
        },()=>{
            this.props.simpanRuang(this.state.routeParams).then((result)=>{
                //after simpan
                this.$f7router.navigate('/tampilRuang/'+this.props.simpan_ruang.ruang_id);
            });
        });

    }

    gantiJenis = (b) => {
        // b.target.value
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                jenis_ruang_id: b.target.value
            }
        },()=>{
            // console.log(this.state.routeParams);
        })
    }

    acceptedFile = (file) => {
        // console.log(file[0]);

        if(file[0].size >= 1000000){ //2Mb
            this.$f7.dialog.alert('Ukuran gambar tidak boleh melebihi 1MB!', 'Peringatan');
            return true;
        }

        if(file[0].name.substr(file[0].name.length - 3) === 'jpg' || file[0].name.substr(file[0].name.length - 4) === 'jpeg' || file[0].name.substr(file[0].name.length - 3) === 'png'){

            this.setState({
                gambar_ruang: file[0].name,
                // loading: true,
                routeParams:{
                    ...this.state.routeParams,
                    gambar_ruang: file[0].name
                }
            },()=>{
                //uploading
                // const formData = new FormData();
                console.log(this.state.routeParams);

                // formData.append('avatar',file[0]);
                // console.log(localStorage.getItem('api_base') + '/api/Ruang/upload');
                return new Promise(
                    (resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('POST', localStorage.getItem('api_base') + '/api/Ruang/upload');
                        xhr.onload = this.uploadBerhasil;
                        xhr.onerror = this.uploadGagal;
                        const data = new FormData();
                        data.append('image', file[0]);
                        data.append('pengguna_id', JSON.parse(localStorage.getItem('user')).pengguna_id);
                        data.append('jenis', 'gambar_ruang');
                        xhr.send(data);
                    }
                );
            });

        }else{
            this.$f7.dialog.alert('Hanya dapat mengupload file gambar dengan format .jpg atau .png!', 'Peringatan');
            return true;
        }

    }

    uploadBerhasil = (xhr) => {
        console.log(JSON.parse(xhr.currentTarget.responseText));
        let response = JSON.parse(xhr.currentTarget.responseText);
        if(response.msg == 'sukses'){
            this.setState({
                file_gambar_ruang: response.filename,
                loading: false
            });
        }
    }

    uploadGagal = (xhr) => {
        this.$f7.dialog.alert('Ada kesalahan pada sistema atau jaringan Anda, mohon cek kembali sebelum melakukan upload ulang', 'Mohon maaf');
    }

    render()
    {
        return (
            <Page name="tambahRuang" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Tambah Ruang</NavTitle>
                    <NavTitleLarge>
                        Tambah Ruang
                    </NavTitleLarge>
                </Navbar>
                <List noHairlinesMd style={{marginBottom:'0px'}}>
                    <ListInput
                        label="Nama"
                        type="text"
                        placeholder="Nama Ruang"
                        clearButton
                        onChange={this.setStateValue('nama')}
                    >
                    </ListInput>
                    <ListItem
                    title="Jenis Ruang"
                    smartSelect
                    >
                        <select onChange={this.gantiJenis} name="jenis_ruang_id" defaultValue={1}>
                            <option value="1">Publik</option>
                            <option value="2">Privat</option>
                        </select>
                    </ListItem>
                </List>
                <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
                    <div style={{marginBottom:'8px'}}>
                        Deskripsi
                    </div>
                    <SunEditor 
                        onChange={this.editorChange}
                        setOptions={{
                            height: 500,
                            buttonList : [
                                [
                                    'undo', 
                                    'redo', 
                                    'font', 
                                    'fontSize', 
                                    'formatBlock'
                                ],
                                [
                                    'bold', 
                                    'underline', 
                                    'italic', 
                                    'strike', 
                                    'removeFormat'
                                    // 'subscript', 
                                    // 'superscript', 
                                ],
                                '/' // Line break
                                [
                                    'fontColor', 
                                    'hiliteColor', 
                                    'outdent', 
                                    'indent', 
                                    'align', 
                                    'horizontalRule', 
                                    'list', 
                                    'table'
                                ],
                                [
                                    'link', 
                                    'image', 
                                    'video', 
                                    // 'fullScreen', 
                                    'showBlocks', 
                                    // 'codeView', 
                                    // 'preview', 
                                    // 'print', 
                                    // 'save'
                                ]
                            ],
                        }}
                    />
                    {/* <Col width={100} tabletWidth={50}> */}
                    <BlockTitle>Upload Gambar Ruang</BlockTitle>
                    <Card>
                        <Dropzone className="droping" onDrop={this.acceptedFile}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()} style={{height:'250px',border:'4px dashed #ccc', textAlign: 'center', paddingTop:(this.state.file_gambar_ruang !== '' ? '16px' : '10%'), paddingLeft:'16px', paddingRight:'16px'}}>
                                    <input {...getInputProps()} />
                                    {this.state.file_gambar_ruang === '' &&
                                    <i slot="media" className="f7-icons" style={{fontSize:'60px', color:'#434343'}}>square_arrow_up</i>
                                    }
                                    {this.state.file_gambar_ruang !== '' &&
                                    <>
                                    <img style={{height:'150px'}} src={localStorage.getItem('api_base')+this.state.file_gambar_ruang} />
                                    <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                    </>
                                    }
                                    {this.state.gambar_ruang === '' &&
                                    <>
                                    <p>Tarik dan seret gambar pilihan Anda ke sini, atau klik/Sentuh untuk cari gambar</p>
                                    <p style={{fontSize:'12px', fontStyle:'italic'}}>Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                    </>
                                    }
                                    {this.state.gambar_ruang !== '' && this.state.file_gambar_ruang === '' &&
                                    <>
                                    <p style={{fontSize:'20px'}}>{this.state.gambar_ruang}</p>
                                    <p style={{fontSize:'12px', fontStyle:'italic'}}>Klik/Sentuh kembali untuk mengganti gambar. Ukuran maksimal berkas adalah 1MB, dan hanya dalam format .jpg, atau .png</p>
                                    </>
                                    }
                                </div>
                            </section>
                        )}
                        </Dropzone>
                    </Card>
                    {/* </Col> */}
                </Block>
                <Block strong style={{marginTop:'0px'}}>
                    <Button raised fill onClick={this.tambahRuang} style={{marginBottom:'8px', backgroundColor:'green'}}><i className="f7-icons" style={{fontSize:'20px', marginBottom:'8px'}}>paperplane_fill</i>&nbsp;Buat Ruang</Button>
                    {/* <Button raised fill onClick={this.simpanDraft} style={{backgroundColor:'gray'}}><i className="f7-icons" style={{fontSize:'20px'}}>floppy_disk</i>&nbsp;Simpan Sebagai Draft</Button> */}
                </Block>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      simpanRuang: Actions.simpanRuang
    }, dispatch);
}

function mapStateToProps({ App, Ruang }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        simpan_ruang: Ruang.simpan_ruang
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahRuang));
  