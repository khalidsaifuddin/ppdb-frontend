import React, {Component} from 'react';
import {
  Page,
  Block,
  List,
  Button,
  LoginScreenTitle,
  ListInput,
  Progressbar
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import GoogleLogin from 'react-google-login';
import io from 'socket.io-client';

class login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      loading: false,
      routeParams:{
        username: '',
        password: '',
      }
    }
  }
  
  backClick = () => {
    let properti = 'beranda';
    
    for (var property in this.props.tabBar) {
      this.props.tabBar[property] = false;
    }

    if(this.props.f7router.url.replace("/","").replace("/","") !== ""){
      properti = this.props.f7router.url.replace("/","").replace("/","");
    }

    this.props.tabBar[properti] = true;
    this.props.setTabActive(this.props.tabBar);
  }

  alertLoginData = () => {
    this.$f7.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password);
  }

  responseGoogle = (response) => {
    if(typeof(response.profileObj.email) !== 'undefined') {
      this.setState({
        ...this.state,
        loading: true,
        googleCheck: {
          username: response.profileObj.email,
        }
      }, ()=> {
        let socket = io(localStorage.getItem('socket_url'));

        this.props.getPengguna(this.state.googleCheck).then((result)=> {
          if(this.props.pengguna.total < 1) {
              this.setState({
                  loading:true,
                  routeParams:{
                    ...this.state.routeParams,
                    data: {
                      username: response.profileObj.email,
                      nama: response.profileObj.name,
                      gambar: response.profileObj.imageUrl,
                    }
                  }
              }, ()=> {
                this.props.buatPengguna(this.state.routeParams).then((result)=> {
                  this.setState({
                    loading: false,
                  }, ()=> {
                    localStorage.setItem('user', JSON.stringify(this.props.pengguna.rows[0]));
                    localStorage.setItem('sudah_login',  '1');

                    this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
                    
                    let params = {
                      nama: JSON.parse(localStorage.getItem('user')).nama,
                      id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                    };

                    socket.emit('login', params, (err) => {
                      if (err) {}
                    });

                    window.location.href="/";
                      
                  })
                });
              });
          } else {
            this.setState({
              loading: false,
            }, ()=> {
              localStorage.setItem('user', JSON.stringify(this.props.pengguna.rows[0]));
              localStorage.setItem('sudah_login',  '1');

              this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
              
              let params = {
                nama: JSON.parse(localStorage.getItem('user')).nama,
                id: JSON.parse(localStorage.getItem('user')).pengguna_id,
              };

              socket.emit('login', params, (err) => {
                if (err) {}
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
      loading: true,
    }, ()=> {
      this.props.login(this.state.routeParams).then((result)=> {
        this.setState({
          loading: false,
        }, ()=> {
            if(typeof(result.payload.token) !== 'undefined') {
              localStorage.setItem('token', result.payload.token);
              localStorage.setItem('user', JSON.stringify(result.payload.user));
              localStorage.setItem('sudah_login',  '1');

              this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
              
              let params = {
                nama: JSON.parse(localStorage.getItem('user')).nama,
                id: JSON.parse(localStorage.getItem('user')).pengguna_id,
              };
              
              socket.emit('login', params, (err) => {
                if (err) {}
              });
              
              window.location.href="/";
            } else {
              localStorage.setItem('sudah_login',  '0');

              this.$f7.dialog.alert(result.payload.error, 'Peringatan');
            }
        })
      });
    });
  }

  render() {
    return (
      <Page loginScreen className="loginPage" name="RaporDapodik" hideBarsOnScroll>
        {this.state.loading &&
          <Progressbar className="loginProgress" infinite color="blue" />
        }
        <Block className="loginBox">
          <div className="logoApp">
            <img src="./static/images/logo-kabupaten-lumajang.png" height="25" alt="kabupaten lumajang" />
            <LoginScreenTitle>{localStorage.getItem('judul_aplikasi')}</LoginScreenTitle>
          </div>
          <List form>
            <ListInput
              label="Username"
              type="text"
              name="username"
              placeholder="Masukkan Username Anda..."
              disabled={(this.state.loading ? true : false)}
              value={this.state.routeParams.username}
              onInput={(e) => this.setState({routeParams:{...this.state.routeParams,username: e.target.value}})}
            />
            <ListInput
              label="Kata Sandi"
              type="password"
              name="password"
              disabled={(this.state.loading ? true : false)}
              placeholder="Masukkan Kata Sandi Anda..."
              value={this.state.routeParams.password}
              onInput={(e) => this.setState({routeParams:{...this.state.routeParams,password: e.target.value}})}
            />
          </List>
          <div className="loginActions">
            <Button 
              fill 
              className="loginBtn"
              iconIos="f7:square_arrow_right" 
              iconAurora="f7:square_arrow_right" 
              iconMd="material:enter"  
              title="Masuk" 
              disabled={(this.state.loading ? true : false)}
              onClick={this.doLogin}
            >
              Masuk Aplikasi
            </Button>
            <div className="loginDivider">Atau</div>
            <GoogleLogin
              className="googleBtn"
              clientId={localStorage.getItem('google_api')}
              buttonText="Daftar / Masuk dengan Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <p className="loginFooter">Disdik Kabupaten Lumajang ©2020</p>
          </div>
        </Block>
        <div className="animatedWave wave--1"></div>
        <div className="animatedWave wave--2"></div>
      </Page>
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
    buatPengguna: Actions.buatPengguna,
  }, dispatch);
}

function mapStateToProps({ App }) {
  return {
    window_dimension: App.window_dimension,
    loading: App.loading,
    tabBar: App.tabBar,
    pengguna: App.pengguna,
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(login));
  