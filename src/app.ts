import 'pixi';
import 'p2';
import 'phaser';
import * as WebFontLoader from 'webfontloader';
import * as Assets from './assets';
import Boot from './states/boot';
import GamePlayState from './states/gamePlayState';
import Preloader from './states/preloader';
import Title from './states/title';
import * as Utils from './utils/utils';

class App extends Phaser.Game {
	constructor(config: Phaser.IGameConfig) {
		super(config);

		this.state.add('boot', Boot);
		this.state.add('preloader', Preloader, false);
		this.state.add('title', Title, false);
		this.state.add('gamePlayState', GamePlayState, false);
		this.state.start('boot');
	}
}

function startApp(): void {
	let gameWidth: number = DEFAULT_GAME_WIDTH;
	let gameHeight: number = DEFAULT_GAME_HEIGHT;

	if (SCALE_MODE === 'USER_SCALE') {
		let screenMetrics: Utils.ScreenMetrics = Utils.ScreenUtils.calculateScreenMetrics(800, 600);

		gameWidth = screenMetrics.gameWidth;
		gameHeight = screenMetrics.gameHeight;
	}

	// There are a few more options you can set if needed, just take a look at Phaser.IGameConfig
	let gameConfig: Phaser.IGameConfig = {
		width: gameWidth,
		height: gameHeight,
		renderer: Phaser.AUTO,
		parent: 'content',
		resolution: 1
	};

	// tslint:disable-next-line:no-unused-new
	new App(gameConfig);
}

window.onload = () => {
	let webFontLoaderOptions: any = null;
	let webFontsToLoad: string[] = GOOGLE_WEB_FONTS;

	if (webFontsToLoad.length > 0) {
		webFontLoaderOptions = (webFontLoaderOptions || {});

		webFontLoaderOptions.google = {
			families: webFontsToLoad
		};
	}

	if (Object.keys(Assets.CustomWebFonts).length > 0) {
		webFontLoaderOptions = (webFontLoaderOptions || {});

		webFontLoaderOptions.custom = {
			families: [],
			urls: []
		};

		// tslint:disable-next-line:forin
		for (let font in Assets.CustomWebFonts) {
			webFontLoaderOptions.custom.families.push(Assets.CustomWebFonts[font].getFamily());
			webFontLoaderOptions.custom.urls.push(Assets.CustomWebFonts[font].getCSS());
		}
	}

	if (webFontLoaderOptions === null) {
		// Just start the game, we don't need any additional fonts
		startApp();
	} else {
		// Load the fonts defined in webFontsToLoad from Google Web Fonts, and/or any Local Fonts then start the game knowing the fonts are available
		webFontLoaderOptions.active = startApp;

		WebFontLoader.load(webFontLoaderOptions);
	}
};
