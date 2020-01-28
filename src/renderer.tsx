import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import configureStore from "./store/configureStore";
import App from "./App";
//import registerServiceWorker from "./registerServiceWorker";
import {IntlProvider} from "react-intl";
import {IntlProvider as RSIntlProvider} from "rsuite";
import zhCN from "rsuite/lib/IntlProvider/locales/zh_CN";

// Create browser history to use in the Redux store
/*
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
const history = createBrowserHistory({basename: baseUrl});
*/
const history = createBrowserHistory();
// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<IntlProvider locale="zh">
				<RSIntlProvider locale={zhCN}>
					<App/>
				</RSIntlProvider>
			</IntlProvider>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root"));
