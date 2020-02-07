import * as React from "react";
import {Container} from "rsuite";
import SideNav from "./SideNav";
import "rsuite/lib/styles/index.less";

export default (props: { children?: React.ReactNode }) => (
	<React.Fragment>
		<Container>
			<SideNav/>
		</Container>
		<Container>
			<SideNav/>
			{props.children}
		</Container>
	</React.Fragment>
);
