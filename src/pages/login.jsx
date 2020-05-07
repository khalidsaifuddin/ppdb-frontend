import React, {Component} from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button,
    Searchbar,
    View,
    LoginScreenTitle,
    ListInput,
    ListButton,
    BlockFooter,
    Progressbar
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import GoogleLogin from 'react-google-login';

import io from 'socket.io-client';

class login extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            username: '',
            password: ''
        }
    }

    backClick = () => {

        let properti = 'beranda';
        
        for (var property in this.props.tabBar) {
            // console.log(this.state.tabBar[property]);
            this.props.tabBar[property] = false;
        }
        if(this.props.f7router.url.replace("/","").replace("/","") !== ""){
            properti = this.props.f7router.url.replace("/","").replace("/","");
        }
        this.props.tabBar[properti] = true;

        this.props.setTabActive(this.props.tabBar);
        console.log(this.props.tabBar.beranda);
    }

    alertLoginData = () => {
        this.$f7.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password);
    }

    responseGoogle = (response) => {
        // alert('berhasil');
        // console.log(response.profileObj.email);
        // console.log(response.profileObj.imageUrl);
        // console.log(response.profileObj.name);

        if(typeof(response.profileObj.email) !== 'undefined'){
            this.setState({
                ...this.state,
                loading:true,
                googleCheck: {
                    username: response.profileObj.email
                }
            },()=>{
                let socket = io(localStorage.getItem('socket_url'));
                    
                this.props.getPengguna(this.state.googleCheck).then((result)=>{
                    if(this.props.pengguna.total < 1){
                        //belum ada
                        this.setState({
                            loading:true,
                            routeParams:{
                                ...this.state.routeParams,
                                data: {
                                    username: response.profileObj.email,
                                    nama: response.profileObj.name,
                                    gambar: response.profileObj.imageUrl
                                }
                            }
                        },()=>{
                            this.props.buatPengguna(this.state.routeParams).then((result)=>{
                                this.setState({
                                    loading: false
                                },()=>{
                                    localStorage.setItem('user', JSON.stringify(this.props.pengguna.rows[0]));
                                    localStorage.setItem('sudah_login',  '1');

                                    this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
                                    
                                    let params = {
                                        nama: JSON.parse(localStorage.getItem('user')).nama,
                                        id: JSON.parse(localStorage.getItem('user')).pengguna_id
                                    };

                                    socket.emit('login', params, (err) => {
                                        if (err) {
                                            //gagal
                                        }
                
                                    });
                                    
                                    window.location.href="/";
                                    
                                })
                            });
                        });
                    }else{
                        //sudah ada
                        this.setState({
                            loading: false
                        },()=>{
                            localStorage.setItem('user', JSON.stringify(this.props.pengguna.rows[0]));
                            localStorage.setItem('sudah_login',  '1');

                            this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
                            
                            let params = {
                                nama: JSON.parse(localStorage.getItem('user')).nama,
                                id: JSON.parse(localStorage.getItem('user')).pengguna_id
                            };

                            socket.emit('login', params, (err) => {
                                if (err) {
                                    //gagal
                                }
        
                            });
                            
                            window.location.href="/";
                        });
                    }

                });
            });
        }
    }

    doLogin = () => {
        this.setState({
            loading:true
        },()=>{
            this.props.login(this.state.routeParams).then((result)=>{
                
                this.setState({
                    loading:false
                },()=>{
                    // if(typeof(result) !== 'undefined'){
                        if(typeof(result.payload.token) !== 'undefined'){
                            localStorage.setItem('token', result.payload.token);
                            localStorage.setItem('user', JSON.stringify(result.payload.user));
                            localStorage.setItem('sudah_login',  '1');

                            this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
                            
                            let params = {
                                nama: JSON.parse(localStorage.getItem('user')).nama,
                                id: JSON.parse(localStorage.getItem('user')).pengguna_id
                            };
                            
                            socket.emit('login', params, (err) => {
                                if (err) {
                                    //gagal
                                }
        
                            });
                            
                            window.location.href="/";

                        }else{
                            localStorage.setItem('sudah_login',  '0');
                            this.$f7.dialog.alert(result.payload.error, 'Peringatan');
                            // alert('gagal broh');
                            // console.log(result);
                            // this.$f7.dialog.alert('Username: ' + this.state.routeParams.username + '<br>Password: ' + this.state.password);
                        }
                    // }else{
                    //     this.$f7.dialog.alert('Gagal login');
                    // }

                })
    
            });
        });
    }

    render()
    {
        return (
            // <View>
                // <Page loginScreen>
                <Page loginScreen name="RaporDapodik" hideBarsOnScroll>
                    {this.state.loading &&
                    <Progressbar style={{height:'10px'}} infinite color="multi"></Progressbar>
                    }
                    <LoginScreenTitle>Masuk {localStorage.getItem('judul_aplikasi')}</LoginScreenTitle>
                    <List form>
                        <ListInput
                        type="text"
                        name="username"
                        placeholder="Username Anda ...."
                        label= 'Username'
                        disabled={(this.state.loading ? true : false)}
                        value={this.state.routeParams.username}
                        onInput={(e) => this.setState({routeParams:{...this.state.routeParams,username: e.target.value}})}
                        ></ListInput>
                        <ListInput
                        label= 'Password'
                        type="password"
                        name="password"
                        disabled={(this.state.loading ? true : false)}
                        placeholder="Password Anda ...."
                        value={this.state.routeParams.password}
                        onInput={(e) => this.setState({routeParams:{...this.state.routeParams,password: e.target.value}})}
                        ></ListInput>
                    </List>
                    <List style={{padding:16}}>
                        <Button fill 
                            iconIos="f7:square_arrow_right" 
                            iconAurora="f7:square_arrow_right" 
                            iconMd="material:enter"  
                            title="Masuk" 
                            disabled={(this.state.loading ? true : false)}
                            // loginScreenClose 
                            // onClick={() => this.alertLoginData()}
                            onClick={this.doLogin}
                            style={{paddingTop:10,paddingBottom:10, height:50}}
                        >
                            &nbsp;&nbsp; Masuk Aplikasi
                        </Button>
                        <div style={{textAlign:'center', width:'100%', marginTop:'16px', marginBottom:'8px'}}>Atau</div>
                        <GoogleLogin
                            clientId={localStorage.getItem('google_api')}
                            buttonText="Daftar/Masuk dengan Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            style={{textAlign:'center'}}
                        />
                    </List>
                    {/* <List style={{padding:16, textAlign:'center'}}>
                    </List> */}
                    {/* <List style={{padding:16}}>
                        <BlockTitle>
                            Belum punya akun?
                        </BlockTitle>
                        <Button fill 
                            iconIos="f7:person_crop_square_fill" 
                            iconAurora="f7:person_crop_square_fill" 
                            iconMd="material:enter"  
                            title="Masuk" 
                            color="green"
                            onClick={this.responseGoogle}
                            // loginScreenClose 
                            // onClick={() => this.alertLoginData()}
                            style={{paddingTop:10,paddingBottom:10, height:50}}
                        >
                            &nbsp;&nbsp; Daftar Pengguna Baru
                        </Button>
                    </List> */}
                </Page>
            // </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      setTabActive: Actions.setTabActive,
      login: Actions.login,
      getPengguna: Actions.getPengguna,
      buatPengguna: Actions.buatPengguna
    }, dispatch);
}

function mapStateToProps({ App }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        pengguna: App.pengguna
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(login));
  