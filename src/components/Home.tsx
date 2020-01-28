import * as React from "react";
import {connect} from "react-redux";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import logo from "../logo.svg";
import {Toggle, Container} from "rsuite";
import {RouteComponentProps} from "react-router";
import * as SystemInfoStore from "../store/SystemInfoStore";
import {ApplicationState} from "../store";
import {getLyokoDate, getLyokoTime} from "../Models/LyokoTime";

type SystemInfoProps =
	SystemInfoStore.SystemInfoState // ... state we've requested from the Redux store
	& typeof SystemInfoStore.actionCreators // ... plus action creators we've requested
	//& RouteComponentProps<{ key: string }>; // ... plus incoming routing parameters
	& RouteComponentProps; // ... plus incoming routing parameters

class Home extends React.PureComponent<SystemInfoProps> {
	ShowTime: boolean;

	constructor(props: SystemInfoProps) {
		super(props);
		this.ShowTime = props.showTime;
	}

	// This method is called when the component is first added to the document
	public componentDidMount() {
		this.ensureDataFetched();
	}

	// This method is called when the route parameters change
	public componentDidUpdate() {
		//this.ensureDataFetched();
	}


	render(): React.ReactFragment {
		return (
			<React.Fragment>
				<header className="App-header">
					{/*<img src={logo} className="App-logo" alt="logo"/>*/}
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
				<Toggle checked={this.ShowTime} onChange={this.props.switchShow}/>
				{this.renderServerTime()}
			</React.Fragment>
		);
	}

	private renderServerTime(): React.ReactFragment {
		if (this.props.showTime) {
			return (
				<React.Fragment>
					<div>{getLyokoDate(this.props.serverTime)}</div>
					<br/>
					<div>{getLyokoTime(this.props.serverTime)}</div>
				</React.Fragment>
			);
		}
		else {
			return (
				<React.Fragment>
				</React.Fragment>
			);
		}
	}

	private ensureDataFetched() {
		/*
		const key = this.props.match.params.key;
		this.props.requestWeatherForecasts(key);
		*/
		this.props.requestSystemInfo();
	}

	private switchShow() {
		/*
		const key = this.props.match.params.key;
		this.props.requestWeatherForecasts(key);
		*/
		this.ensureDataFetched();
		this.props.switchShow();
		this.ShowTime = this.props.showTime;
	}
}

export default connect(
	(state: ApplicationState) => state.SystemInfoStore, // Selects which state properties are merged into the component's props
	SystemInfoStore.actionCreators // Selects which action creators are merged into the component's props
)(Home as any);
