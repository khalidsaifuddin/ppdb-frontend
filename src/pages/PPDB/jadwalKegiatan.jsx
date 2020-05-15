import React, { Component } from 'react';
import {
	Page,
	Navbar,
	NavTitle,
	Subnavbar,
	Searchbar,
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	Button,
	Row,
	Col,
	Icon,
	Link
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class JadwalKegiatan extends Component {
  constructor(props) {
		super(props);
		
		this.state = {
			error: null,
			loading: true,
			routeParams: {
				pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
				searchText : '',
				limit: 20,
				page: 0
			},
			items: [], //Array.from({ length: 20 }),
		}
	}

	getData = () => {
		this.setState({
			routeParams: {
				...this.state.routeParams,
			},
			loading: true
		}, ()=> {
			this.props.getJadwalKegiatan(this.state.routeParams).then(e => {
				this.setState({
					items: this.state.items.concat(this.props.entities.rows),
					loading: false
				});
			});
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

	handleLink = (data, link) => {
		this.props.perJadwalkegiatan(data);
		this.$f7router.navigate(link);
	}

	handleDelete = (opt) => {
		this.$f7.dialog.confirm('Apakah anda yakin untuk hapus', 'Perhatian', () => {
			this.props.deleteJadwalKegiatan(opt.jadwal_kegiatan_id).then(e => {
				this.$f7.dialog.alert("Hapus Berhasil", "Hapus");
				this.getData();
			})
		});
	}

	fetchMoreData = () => {
		this.setState({
			routeParams: {
				...this.state.routeParams,
				page: this.state.routeParams.page + 1,
			}
		})
		this.getData();
	}

	componentDidMount = () => {
		this.getData();
		this.props.getRefJalurJk();
		this.props.getRefmstwilayahJK({
			mst_kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi').substr(0, 2) + "0000",
		});
	}

	render() {
		// const { entities } = this.props;

		return (
			<Page name="cari">
				<Navbar sliding={false} backLink="Kembali">
					<NavTitle sliding>Jadwal Kegiatan</NavTitle>
					<Subnavbar inner={false}>
						<Searchbar
							className="searchbar-demo"
							placeholder="Cari Jadwal kegiatan"
							searchContainer=".search-list"
							searchIn=".item-title"
							onSubmit={this.getData}
							customSearch={true}
							onChange={this.ketikCari}
							value={this.state.routeParams.searchText}
						/>
					</Subnavbar>
				</Navbar>
				<div className="daftarKegiatan">
					<div className="judulKegiatan">
						<h3>Daftar Jadwal Kegiatan</h3>
						<div className="tautanKegiatan">
							<Button raised fill color="deeppurple" onClick={e => this.handleLink([], "/jadwalKegiatan/create")}>
								<Icon f7="calendar_badge_plus" size="18px" /> <span>BUAT JADWAL</span>
							</Button>
						</div>
					</div>
					{
					// entities.rows.
					this.state.items.map((option)=> {
						return (
							<Card key={option.jadwal_kegiatan_id} noShadow noBorder>
								<CardHeader>
									<Link href="#" onClick={e => this.handleLink(option, ("/jadwalKegiatan/" + option.jadwal_kegiatan_id))}>
										<Icon f7="calendar" size="20px"></Icon>
										<h3>
											<span>{option.nama}</span>
										</h3>
									</Link>
								</CardHeader>
								<CardContent>
									<Row>
										<Col width="100" tabletWidth="40">
											<div className="tentangKegiatan">
												<span>Wilayah</span>
												<b>{option.nama_wilayah}</b>
											</div>
											<div className="tentangKegiatan">
												<span>Periode</span>
												<b>{option.periode_kegiatan_id}</b>
											</div>
											<div className="tentangKegiatan">
												<span>Jalur</span>
												<b>{option.jalur}</b>
											</div>
										</Col>
										<Col width="100" tabletWidth="60">
											<div className="tentangKegiatan">
												<span>Tanggal Mulai</span>
												<b>{option.tanggal_mulai}</b>
											</div>
											<div className="tentangKegiatan">
												<span>Tanggal Selesai</span>
												<b>{option.tanggal_selesai}</b>
											</div>
										</Col>
									</Row>
								</CardContent>
								<CardFooter>
									<div className="cardActions">
										<Button raised fill onClick={e => this.handleLink(option, ("/jadwalKegiatan/" + option.jadwal_kegiatan_id))}>
											<Icon ios="f7:pencil_circle_fill" size="20px"/> Ubah
										</Button>
										<Button raised fill color="red" onClick={e => this.handleDelete(option)}>
											<Icon ios="f7:xmark_circle_fill" size="20px"/> Hapus
										</Button>
									</div>
								</CardFooter>
							</Card>
						)
					})}

					{
						!this.state.loading && (this.props.entities.countAll !== this.state.items.length) && (
							<Button fillIos onClick={e => this.fetchMoreData()}>See more</Button>
						)
					}

					{
						this.state.loading && (
							<center><div class="preloader"></div></center>
							// <center><div>Loading...</div></center>
						)
					}
				</div>
			</Page>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getJadwalKegiatan 							: Actions.getJadwalKegiatan,
		getRefJalurJk 								: Actions.getRefJalurJk,
		getRefmstwilayahJK 							: Actions.getRefmstwilayahJK,
		perJadwalkegiatan 							: Actions.perJadwalkegiatan,
		deleteJadwalKegiatan 						: Actions.deleteJadwalKegiatan,
	}, dispatch);
}

function mapStateToProps({ App, JadwalKegiatan }) {
	return {
		window_dimension 							: App.window_dimension,
		entities 									: JadwalKegiatan.entities,
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(JadwalKegiatan));
