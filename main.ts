import {app, BrowserWindow} from 'electron';
import debug from 'electron-debug';
import path from "path";
declare var __dirname: string;
let mainWindow: Electron.BrowserWindow;

debug();

function onReady() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			// Below is where we specify our preload script. __dirname points to our source file's path and the preload
			// path should point to the Webpack-emitted preload bundle.
			// Note that if you're using TypeScript, the emitted preload bundle will be in JS with a .js extension.
			preload: path.resolve(__dirname, "preload.bundle.js")
		}
	});

	const fileName = `file://${__dirname}/index.html`;
	mainWindow.loadURL(fileName);
	mainWindow.on('close', () => app.quit())
}

app.on('ready', () => onReady());
app.on('window-all-closed', () => app.quit());
console.log(`Electron Version ${app.getVersion()}`);

