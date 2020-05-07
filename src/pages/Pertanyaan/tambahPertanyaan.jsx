import React, {Component} from 'react';
import {
    Page, Navbar, NavTitle, NavTitleLarge, List, ListInput, ListItem, ListItemContent, Block, Button
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

class tambahPertanyaan extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id
        }
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
                konten: e
            }
        },()=>{
            // console.log(this.state.routeParams);
        });
    }

    tambahPertanyaan = () => {
        // alert('oke');
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                publikasi: 1
            }
        },()=>{
            this.props.simpanPertanyaan(this.state.routeParams).then((result)=>{
                //after simpan
                this.$f7router.navigate('/pertanyaanPengguna/'+this.state.routeParams.pengguna_id);
            });
        });

    }

    simpanDraft = () => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                publikasi: 0
            }
        },()=>{
            this.props.simpanPertanyaan(this.state.routeParams).then((result)=>{
                //after simpan
                this.$f7router.navigate('/pertanyaanPengguna/'+this.state.routeParams.pengguna_id);
            });
        });
    }

    gantiTopik = (b) => {
        // b.target.value
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                topik_pertanyaan_id: b.target.value
            }
        },()=>{
            // console.log(this.state.routeParams);
        })
    }

    render()
    {
        return (
            <Page name="tambahPertanyaan" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Tambah Pertanyaan</NavTitle>
                    <NavTitleLarge>
                        Tambah Pertanyaan
                    </NavTitleLarge>
                </Navbar>
                <List noHairlinesMd style={{marginBottom:'0px'}}>
                    <ListInput
                        label="Judul"
                        type="text"
                        placeholder="Judul Pertanyaan"
                        clearButton
                        onChange={this.setStateValue('judul')}
                    >
                    </ListInput>
                    <ListItem
                    title="Topik"
                    smartSelect
                    >
                        <select onChange={this.gantiTopik} name="topik_pertanyaan_id" defaultValue={1}>
                            <option value="1">Pertanyaan Umum</option>
                            <option value="2">Troubleshooting (Solusi Masalah)</option>
                        </select>
                    </ListItem>
                </List>
                <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
                    <div style={{marginBottom:'8px'}}>
                        Konten Pertanyaan
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
                </Block>
                <Block strong style={{marginTop:'0px'}}>
                    <Button raised fill onClick={this.tambahPertanyaan} style={{marginBottom:'8px', backgroundColor:'green'}}><i className="f7-icons" style={{fontSize:'20px', marginBottom:'8px'}}>paperplane_fill</i>&nbsp;Publikasi Pertanyaan</Button>
                    <Button raised fill onClick={this.simpanDraft} style={{backgroundColor:'gray'}}><i className="f7-icons" style={{fontSize:'20px'}}>floppy_disk</i>&nbsp;Simpan Sebagai Draft</Button>
                </Block>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      simpanPertanyaan: Actions.simpanPertanyaan
    }, dispatch);
}

function mapStateToProps({ App, Pertanyaan }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        simpan_pertanyaan: Pertanyaan.simpan_pertanyaan
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahPertanyaan));
  