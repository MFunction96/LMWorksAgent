import {Action, Reducer} from "redux";
import {AppThunkAction} from "./";
import {LyokoTime} from "../Models/LyokoTime";
import * as _ from "lodash";

export class SystemInfoState{
	showTime: boolean;
	serverTime: LyokoTime;
	constructor() {
		this.showTime = false;
		this.serverTime = new LyokoTime();
	}
}

interface RequestSystemInfoAction {
	type: "REQUEST_SYSTEM_INFO";
}

interface ReceiveSystemInfoAction {
	type: "RECEIVE_SYSTEM_INFO";
	SystemInfo: SystemInfoState;
}

interface SwitchAction {
	type: "SWITCH_SHOW";
}

type KnownAction = RequestSystemInfoAction | ReceiveSystemInfoAction | SwitchAction;

export const actionCreators = {
	//requestWeatherForecasts: (key: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
	requestSystemInfo: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
		// Only load data if it's something we don't already have (and are not already loading)
		/*const appState = getState();
		if (appState && appState.serverTimeStore && _.isEqual(appState, new SystemInfo())) {
			fetch("systeminfo")
				.then(response => response.json() as Promise<SystemInfoState>)
				.then(data => {
					dispatch({type: "RECEIVE_SYSTEM_INFO", SystemInfoState: data});
				});

			dispatch({type: "REQUEST_SYSTEM_INFO"});
		}*/
		fetch("systeminfo")
			.then(response => response.json() as Promise<SystemInfoState>)
			.then(data => {
				dispatch({type: "RECEIVE_SYSTEM_INFO", SystemInfo: data});
			});

		dispatch({type: "REQUEST_SYSTEM_INFO"});
	},
	switchShow: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
		const appState = getState();
		if (appState && appState.SystemInfoStore) {
			dispatch({type: "SWITCH_SHOW"});
		}
	}
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SystemInfoState = new SystemInfoState();

export const reducer: Reducer<SystemInfoState> = (state: SystemInfoState | undefined, incomingAction: Action): SystemInfoState => {
	if (state === undefined) {
		return unloadedState;
	}

	const action = incomingAction as KnownAction;
	if (action.type === "REQUEST_SYSTEM_INFO") {
		return {
			showTime: false,
			serverTime : new LyokoTime()
		};
		/*return {
			startDateIndex: action.startDateIndex,
			forecasts: state.forecasts,
			isLoading: true
		};*/
	}
	else if (action.type === "RECEIVE_SYSTEM_INFO") {
		// Only accept the incoming data if it matches the most recent request. This ensures we correctly
		// handle out-of-order responses.
		/*if (action.startDateIndex === state.startDateIndex) {
			return {
				startDateIndex: action.startDateIndex,
				forecasts: action.forecasts,
				isLoading: false
			};
		}*/
		return action.SystemInfo;
	}
	else if (action.type === "SWITCH_SHOW") {
		return {
			showTime: !state.showTime,
			serverTime: state.serverTime
			/*ShowTime: !action.SystemInfo.ShowTime,
			ServerTime: action.SystemInfo.ServerTime*/
		};
	}

	return state;
};
