import * as Assets from '../assets';
import * as Utils from '../utils/utils';

export default class Boot extends Phaser.State {

	public preload(): void {
		// Load any assets you need for your preloader state here.
		this.game.load.atlasJSONArray(Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.getPNG(), Assets.Atlases.AtlasesPreloadSpritesArray.getJSONArray());
		// this.game.load.atlasXML(Assets.Atlases.GraphicsHeroIdle.getName(), Assets.Atlases.GraphicsHeroIdle.getXML());
		// this.game.load.atlasXML(Assets.Atlases.GraphicsHeroWalking.getName(), Assets.Atlases.GraphicsHeroWalking.getXML());


		this.game.load.image(Assets.Images.ImagesWall4.getName(), Assets.Images.ImagesWall4.getPNG());
		this.game.load.image(Assets.Images.ImagesGhostBlue.getName(), Assets.Images.ImagesGhostBlue.getPNG());
		this.game.load.image(Assets.Images.ImagesGhostRed.getName(), Assets.Images.ImagesGhostRed.getPNG());
		this.game.load.image(Assets.Images.ImagesGhostYellow.getName(), Assets.Images.ImagesGhostYellow.getPNG());
		this.game.load.image(Assets.Images.ImagesSand.getName(), Assets.Images.ImagesSand.getPNG());
		this.game.load.image(Assets.Images.ImagesYellowDot.getName(), Assets.Images.ImagesYellowDot.getPNG());
		this.game.load.image(Assets.Images.ImagesGhostRunAway.getName(), Assets.Images.ImagesGhostRunAway.getPNG());
		this.game.load.image(Assets.Images.ImagesGhostDead.getName(), Assets.Images.ImagesGhostDead.getPNG());
		this.game.load.image(Assets.Images.ImagesCherry.getName(), Assets.Images.ImagesCherry.getPNG());
		this.game.load.image(Assets.Images.ImagesMenuBackground.getName(), Assets.Images.ImagesMenuBackground.getPNG());


		this.game.load.atlasJSONHash(Assets.Atlases.AtlasesPackman.getName(), Assets.Atlases.AtlasesPackman.getPNG(), Assets.Atlases.AtlasesPackman.getJSONArray());
		this.game.load.atlasJSONHash(Assets.Atlases.AtlasesDiePackmanSpriteSheet.getName(), Assets.Atlases.AtlasesDiePackmanSpriteSheet.getPNG(), Assets.Atlases.AtlasesDiePackmanSpriteSheet.getJSONArray());
		this.game.load.atlasJSONHash(Assets.Atlases.AtlasesCharactersAtlas.getName(), Assets.Atlases.AtlasesCharactersAtlas.getPNG(), Assets.Atlases.AtlasesCharactersAtlas.getJSONArray());

	}

	public create(): void {
		// Do anything here that you need to be setup immediately, before the game actually starts doing anything.

		// Uncomment the following to disable multitouch
		// this.input.maxPointers = 1;

		this.game.scale.scaleMode = Phaser.ScaleManager[SCALE_MODE];

		if (SCALE_MODE === 'USER_SCALE') {
			let screenMetrics: Utils.ScreenMetrics = Utils.ScreenUtils.screenMetrics;

			this.game.scale.setUserScale(screenMetrics.scaleX, screenMetrics.scaleY);
		}

		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		if (this.game.device.desktop) {
			// Any desktop specific stuff here
		} else {
			// Any mobile specific stuff here

			// Comment the following and uncomment the line after that to force portrait mode instead of landscape
			// this.game.scale.forceOrientation(true, false);
			this.game.scale.forceOrientation(false, true);
		}

		// Use DEBUG to wrap code that should only be included in a DEBUG build of the game
		// Use GIT_REVISION as an identifier when testing builds
		// DEFAULT_GAME_WIDTH is the safe area width of the game
		// DEFAULT_GAME_HEIGHT is the safe area height of the game
		// MAX_GAME_WIDTH is the max width of the game
		// MAX_GAME_HEIGHT is the max height of the game
		// game.width is the actual width of the game
		// game.height is the actual height of the game
		// GOOGLE_WEB_FONTS are the fonts to be loaded from Google Web Fonts
		// SOUND_EXTENSIONS_PREFERENCE is the most preferred to least preferred order to look for audio sources
		console.log(
			`DEBUG....................... ${DEBUG}
					 \nGIT_REVISION................ ${GIT_REVISION}
					 \nSCALE_MODE.................. ${SCALE_MODE}
					 \nDEFAULT_GAME_WIDTH.......... ${DEFAULT_GAME_WIDTH}
					 \nDEFAULT_GAME_HEIGHT......... ${DEFAULT_GAME_HEIGHT}
					 \nMAX_GAME_WIDTH.............. ${MAX_GAME_WIDTH}
					 \nMAX_GAME_HEIGHT............. ${MAX_GAME_HEIGHT}
					 \ngame.width.................. ${this.game.width}
					 \ngame.height................. ${this.game.height}
					 \nGOOGLE_WEB_FONTS............ ${GOOGLE_WEB_FONTS}
					 \nSOUND_EXTENSIONS_PREFERENCE. ${SOUND_EXTENSIONS_PREFERENCE}`
		);

		this.game.state.start('preloader');
	}
}
