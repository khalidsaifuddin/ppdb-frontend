import React, {Component} from 'react';
import {
  App,
  Panel,
  Views,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  Icon,
  Button,
  Popover
} from 'framework7-react';
import LoginPage from '../pages/login';
// import {Provider} from 'react-redux';
// import store from 'store';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';

import io from 'socket.io-client';

import 'framework7-icons';

class app extends Component {
  state = {
    // Framework7 Parameters
    f7params: {
      id: 'io.timkayu.simdik', // App bundle ID
      name: 'Simdik', // App name
      theme: 'ios', // Automatic theme detection
      // App root data
      data: function () {
        return {
          user: {
            firstName: 'Khalid',
            lastName: 'Saifuddin',
          },

        };
      },

      // App routes
      routes: routes,
      // Enable panel left visibility breakpoint
      panel: {
        leftBreakpoint: 960,
      },

      // Register service worker
      serviceWorker: this.$device.cordova ? {} : {
        path: '/service-worker.js',
      },
      // Input settings
      input: {
        scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
        scrollIntoViewCentered: this.$device.cordova && !this.$device.electron,
      },
      // Cordova Statusbar settings
      statusbar: {
        overlay: this.$device.cordova && this.$device.ios || 'auto',
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
    },
    tabBar:{
      beranda: true,
      kategori: false,
      cari: false,
      materi: false,
      profil: false
    },
    // Login screen demo data
    username: '',
    password: '',
  };

    // this.onClickLinkTab = this.onClickLinkTab.bind(this);
    // this.onClickMenu = this.onClickMenu.bind(this);
  
  onClickLinkTab = (menu) => {
    // console.log(event);
    
    for (var property in this.props.tabBar) {
      // console.log(this.state.tabBar[property]);
      this.props.tabBar[property] = false;
    }
    
    this.props.tabBar[menu] = true;
    
    // console.log(this.props.tabBar);

    this.props.setTabActive(this.props.tabBar);
    // console.log(this.props.tabBar);

    // this.setState({
    //   ...this.state,
    //   tabBar: this.props.tabBar
    // });
  }

  onClickMenu(menu){
    console.log(this.props);
    // alert(menu);
  }

  componentDidMount = () => {
    // console.log(this);
    // console.log(this);
    // this.$f7route.navigate(localStorage.getItem('initial_route'));

    let socket = io(localStorage.getItem('socket_url'));
    let params = {};

    // console.log(params);
    socket.emit('online', params, function (err) {
      if (err) {
          this.props.history.push('/');
      }
    });
    
  }

  gantiSemester = (b) => {
    localStorage.setItem('semester_id_aplikasi', b.target.value);
    console.log(localStorage.getItem('semester_id_aplikasi'));
  }

  keluar = () =>{
    // this.$f7.dialog.alert('oke');
    localStorage.setItem('sudah_login', '0');
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');

    window.location.href="/";
  }

  render() {
    // console.log(this.props.tabBar.beranda);
    // const {classes} = this.props;
    
    // console.log(classes);

    return (
      <App params={ this.state.f7params } hideToolbarOnScroll>
      {/* <Provider store={store}> */}
        {/* Status bar overlay for fullscreen mode*/}
        <Statusbar></Statusbar>

        {/* Left panel with cover effect when hidden */}
        <Panel left cover themeDark>
          <View>
            <Page>
              <Navbar title={localStorage.getItem('judul_aplikasi')}/>
              
              <BlockTitle>Menu</BlockTitle>
              <List>
                {/* <ListItem link="/Cari" view=".view-main" panelClose panel-close title="Cari">
                  <i slot="media" className="f7-icons">search</i>
                </ListItem> */}
                {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                <ListItem link="/" view=".view-main" panelClose panel-close title="Beranda">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">house</i>
                </ListItem>
                }
                <ListItem link="/Cari" view=".view-main" panelClose panel-close title="Cari">
                  <i slot="media" className="f7-icons">search</i>
                </ListItem>
                <ListItem link="/tambahCalonPesertaDidik/" view=".view-main" panelClose panel-close title="Form Pendaftaran">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">pencil_ellipsis_rectangle</i>
                </ListItem>
                <ListItem link="/Daftar/" view=".view-main" panelClose panel-close title="Data Pendaftar">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">doc_plaintext</i>
                </ListItem>
                
                {localStorage.getItem('kode_aplikasi') === 'MEJA' &&
                <>
                {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                <ListItem link={"/Kuis/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id  :  null)} view=".view-main" panelClose panel-close title="Kuis">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">pencil_circle_fill</i>
                </ListItem>
                }
                {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                <ListItem link="/Ruang" view=".view-main" panelClose panel-close title="Ruang">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">circle_grid_hex_fill</i>
                </ListItem>
                }
                {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                <ListItem link={"/pertanyaanPengguna/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id  :  null)} view=".view-main" panelClose panel-close title="Pertanyaan">
                  <i slot="media" className="f7-icons">question_square_fill</i>
                </ListItem>
                }
                </>
                }
                {/* {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                <ListItem link={"/pantauan/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id  :  null)} view=".view-main" panelClose panel-close title="Pantauan Pertanyaan">
                  <i slot="media" className="f7-icons">bell_circle_fill</i>
                </ListItem>
                } */}
              </List>
              {localStorage.getItem('sudah_login') === '0' && 
              <List>
                  <ListItem link="/login" view=".view-main" panelClose panel-close title="Login/Masuk">
                    <i slot="media" className="f7-icons">square_arrow_right</i>
                  </ListItem>
              </List>
              }
              {localStorage.getItem('sudah_login') === '1' && 
              <>
              <List>
                  <ListItem link="/ProfilPengguna" view=".view-main" panelClose panel-close title="Profil Pengguna">
                    <i slot="media" className="f7-icons">person_crop_square_fill</i>
                  </ListItem>
                  <ListItem onClick={this.keluar} panelClose panel-close title="Keluar" style={{background:'#470128', cursor: 'pointer'}}>
                    <i slot="media" className="f7-icons">square_arrow_left</i>
                  </ListItem>
              </List>
              </>
              }
            </Page>
          </View>
        </Panel>


        {/* Right panel with reveal effect*/}
        <Panel right cover themeDark style={{width:'280px'}}>
            <View>
                <Page>
                    <Navbar title={this.props.judul_panel_kanan}/>
                    <Block style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      {this.props.isi_panel_kanan}
                    </Block>
                </Page>
            </View>
        </Panel>


        {/* Your main view, should have "view-main" class */}
        {/* <View main className="safe-areas" url="/" /> */}

        {/* Views/Tabs container */}
        
        <Views tabs className="safe-areas" hideToolbarOnScroll>
          {/* Tabbar for switching views-tabs */}
          {localStorage.getItem('sudah_login') === '1' &&
          <Toolbar labels bottom className="mobileTab" hideToolbarOnScroll>
            {localStorage.getItem('sudah_login') === '1' &&
            <>
            <Link 
              href="/" 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:house" 
              iconAurora="f7:house" 
              iconMd="f7:house" 
              text="Beranda" 
              style={{fontSize:'12px'}} 
            />
            <Link 
              href={"/Cari/"} 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              // tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:search" 
              iconAurora="f7:search" 
              iconMd="f7:search" 
              text="Cari" 
              style={{fontSize:'12px'}} 
            />
            <Link 
              // href={"/Daftar/"} 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              // tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:pencil_ellipsis_rectangle" 
              iconAurora="f7:pencil_ellipsis_rectangle" 
              iconMd="f7:pencil_ellipsis_rectangle" 
              text="Form Daftar" 
              style={{fontSize:'12px'}} 
              popoverOpen=".popover-menu"
            />
            <Link 
              href={"/Daftar/"} 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              // tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:doc_plaintext" 
              iconAurora="f7:doc_plaintext" 
              iconMd="f7:doc_plaintext" 
              text="Pendaftar" 
              style={{fontSize:'12px'}} 
            />
            {localStorage.getItem('kode_aplikasi') === 'MEJA' &&
            <>
            <Link 
              href={"/Kuis/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id  :  null)} 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              // tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:pencil_circle_fill" 
              iconAurora="f7:pencil_circle_fill" 
              iconMd="f7:pencil_circle_fill" 
              text="Kuis" 
              style={{fontSize:'12px'}} 
            />
            <Link 
              href="/Ruang" 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              // tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:circle_grid_hex_fill" 
              iconAurora="f7:circle_grid_hex_fill" 
              iconMd="f7:circle_grid_hex_fill" 
              text="Ruang" 
              style={{fontSize:'12px'}} 
            />
            </>
            }
            </>
            }
            {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
            <>
            {localStorage.getItem('sudah_login') === '1' &&
              <>
              {localStorage.getItem('kode_aplikasi') === 'MEJA' &&
              <Link 
                href={"/pertanyaanPengguna/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id  :  null)} 
                // onClick={()=>{this.onClickLinkTab('beranda')}} 
                // tabLinkActive={this.props.tabBar.beranda} 
                iconIos="f7:question_square_fill" 
                iconAurora="f7:question_square_fill" 
                iconMd="f7:question_square_fill" 
                text="Pertanyaan" 
                style={{fontSize:'12px'}} 
              />
              }
              {/* <Link 
                href={"/pantauan/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id  :  null)} 
                // onClick={()=>{this.onClickLinkTab('beranda')}} 
                // tabLinkActive={this.props.tabBar.beranda} 
                iconIos="f7:bell_circle" 
                iconAurora="f7:bell_circle" 
                iconMd="f7:bell_circle" 
                text="Pantau" 
                style={{fontSize:'12px'}} 
              /> */}
              {/* <Link 
                href="/ProfilPengguna" 
                // onClick={()=>{this.onClickLinkTab('beranda')}} 
                tabLinkActive={this.props.tabBar.beranda} 
                iconIos="f7:person_alt" 
                iconAurora="f7:person_alt" 
                iconMd="material:person_alt" 
                text="Pengguna" 
                style={{fontSize:'12px'}} 
              /> */}
              </>
            }
            </>
            }
            {localStorage.getItem('sudah_login') === '0' &&
              <Link 
                href="/login" 
                // onClick={()=>{this.onClickLinkTab('beranda')}} 
                tabLinkActive={this.props.tabBar.beranda} 
                iconIos="f7:square_arrow_right" 
                iconAurora="f7:square_arrow_right" 
                iconMd="material:square_arrow_right" 
                text="Login" 
                style={{fontSize:'12px'}} 
              />
            }
            <Link 
              iconIos="f7:ellipsis" 
              iconAurora="f7:ellipsis" 
              iconMd="material:ellipsis" 
              text="More"
              panelOpen="left" 
              // loginScreenOpen="#my-login-screen" 
              style={{fontSize:'12px'}}
            />
            {/* <Link link="/" view=".view-main" tabLinkActive iconIos="f7:home_fil" iconAurora="f7:home_fil" iconMd="material:home" text="Home" />
            <Link link="/catalog/" view=".view-main" iconIos="f7:list_fill" iconAurora="f7:list_fill" iconMd="material:view_list" text="Catalog" />
            <Link link="/form/" view=".view-main" iconIos="f7:settings_fill" iconAurora="f7:settings_fill" iconMd="material:settings" text="About" /> */}
          </Toolbar>
          }

          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
          <View id="view-beranda" main tab tabActive url="/" />

          {/* Catalog View */}
          {/* <View id="view-kategori" name="kategori" tab url="/kategori/" /> */}

          {/* Settings View */}
          {/* <View id="view-cari" name="cari" tab url="/cari/" /> */}

          {/* Settings View */}
          {/* <View id="view-settings" name="About" tab url="/settings/" /> */}

        </Views>


        {/* Popup */}
        <Popup id="my-popup">
          <View>
            <Page>
              <Navbar title="Popup">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <Block>
                <p>Popup content goes here.</p>
              </Block>
            </Page>
          </View>
        </Popup>

        <Popover className="popover-menu">
        <List>
          <ListItem link="/Cari/" popoverClose title="Cari dari Dapodik" />
          <ListItem link="/TambahCalonPesertaDidik" popoverClose title="Tambah Manual" />
        </List>
      </Popover>

        <LoginScreen id="my-login-screen">
          <LoginPage/>
          {/* <View>
            <Page loginScreen>
              <LoginScreenTitle>Masuk Aplikasi</LoginScreenTitle>
              <List form>
                <ListInput
                  type="text"
                  name="username"
                  placeholder="Your username"
                  value={this.state.username}
                  onInput={(e) => this.setState({username: e.target.value})}
                ></ListInput>
                <ListInput
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={this.state.password}
                  onInput={(e) => this.setState({password: e.target.value})}
                ></ListInput>
              </List>
              <List>
                <ListButton title="Sign In" loginScreenClose onClick={() => this.alertLoginData()} />
                <BlockFooter>
                  Some text about login information.<br />Click "Sign In" to close Login Screen
                </BlockFooter>
              </List>
            </Page>
          </View> */}
        </LoginScreen>
      {/* </Provider> */}
      </App>
    )
  }
  alertLoginData() {
    this.$f7.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password);
  }
  componentDidMount() {
    // console.log(this.props);
    // this.$f7.preloader.show();
    // this.$f7.dialog.preloader();
    setTimeout(() => {
      // this.$f7.preloader.hide();
      // this.$f7.dialog.close();
    }, 3000);

    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
    setTabActive: Actions.setTabActive
  }, dispatch);
}

function mapStateToProps({ App }) {
  // console.log(App.tabBar);

  return {
      window_dimension: App.window_dimension,
      loading: App.loading,
      tabBar: App.tabBar,
      judul_panel_kanan: App.judul_panel_kanan,
      isi_panel_kanan: App.isi_panel_kanan
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(app));