/* AUTO GENERATED FILE. DO NOT MODIFY. YOU WILL LOSE YOUR CHANGES ON BUILD. */

export namespace Images {
		export class AtlasesDownload {
				static getName(): string { return 'download'; };

				static getJPEG(): string { return require('assets/atlases/download.jpeg'); };
		}
		export class GraphicsGameOver {
				static getName(): string { return 'GameOver'; };

				static getPNG(): string { return require('assets/graphics/GameOver.png'); };
		}
		export class GraphicsScene {
				static getName(): string { return 'scene'; };

				static getPNG(): string { return require('assets/graphics/scene.png'); };
		}
		export class GraphicsScene720p {
				static getName(): string { return 'scene720p'; };

				static getPNG(): string { return require('assets/graphics/scene720p.png'); };
		}
		export class GraphicsTitleScreen {
				static getName(): string { return 'TitleScreen'; };

				static getPNG(): string { return require('assets/graphics/TitleScreen.png'); };
		}
		export class ImagesBackgroundTemplate {
				static getName(): string { return 'background_template'; };

				static getPNG(): string { return require('assets/images/background_template.png'); };
		}
		export class ImagesBackgroundtexture2 {
				static getName(): string { return 'backgroundtexture2'; };

				static getJPG(): string { return require('assets/images/backgroundtexture2.jpg'); };
		}
		export class ImagesBoafront {
				static getName(): string { return 'boafront'; };

				static getJPG(): string { return require('assets/images/boafront.jpg'); };
		}
		export class ImagesBuildtexture {
				static getName(): string { return 'buildtexture'; };

				static getJPG(): string { return require('assets/images/buildtexture.jpg'); };
		}
		export class ImagesCherry {
				static getName(): string { return 'cherry'; };

				static getPNG(): string { return require('assets/images/cherry.png'); };
		}
		export class ImagesGhostBlue {
				static getName(): string { return 'ghostBlue'; };

				static getPNG(): string { return require('assets/images/ghostBlue.png'); };
		}
		export class ImagesGhostDead {
				static getName(): string { return 'ghostDead'; };

				static getPNG(): string { return require('assets/images/ghostDead.png'); };
		}
		export class ImagesGhostRed {
				static getName(): string { return 'ghostRed'; };

				static getPNG(): string { return require('assets/images/ghostRed.png'); };
		}
		export class ImagesGhostRunAway {
				static getName(): string { return 'ghostRunAway'; };

				static getPNG(): string { return require('assets/images/ghostRunAway.png'); };
		}
		export class ImagesGhostWhite {
				static getName(): string { return 'ghostWhite'; };

				static getPNG(): string { return require('assets/images/ghostWhite.png'); };
		}
		export class ImagesGhostYellow {
				static getName(): string { return 'ghostYellow'; };

				static getPNG(): string { return require('assets/images/ghostYellow.png'); };
		}
		export class ImagesMenuBackground {
				static getName(): string { return 'menuBackground'; };

				static getPNG(): string { return require('assets/images/menuBackground.png'); };
		}
		export class ImagesMetal {
				static getName(): string { return 'metal'; };

				static getPNG(): string { return require('assets/images/metal.png'); };
		}
		export class ImagesPacman {
				static getName(): string { return 'pacman'; };

				static getPNG(): string { return require('assets/images/pacman.png'); };
		}
		export class ImagesRestartButton {
				static getName(): string { return 'restartButton'; };

				static getPNG(): string { return require('assets/images/restartButton.png'); };
		}
		export class ImagesRoadtexture {
				static getName(): string { return 'roadtexture'; };

				static getJPG(): string { return require('assets/images/roadtexture.jpg'); };
		}
		export class ImagesSand {
				static getName(): string { return 'sand'; };

				static getPNG(): string { return require('assets/images/sand.png'); };
		}
		export class ImagesWall4 {
				static getName(): string { return 'wall4'; };

				static getPNG(): string { return require('assets/images/wall4.png'); };
		}
		export class ImagesYellowDot {
				static getName(): string { return 'yellowDot'; };

				static getPNG(): string { return require('assets/images/yellowDot.png'); };
		}
}

export namespace Spritesheets {
		export class SpritesheetsMetalslugMummy {
				static getName(): string { return 'metalslug_mummy'; };

				static getPNG(): string { return require('assets/spritesheets/metalslug_mummy.[37,45,18,0,0].png'); };
				static getFrameWidth(): number { return 37; };
				static getFrameHeight(): number { return 45; };
				static getFrameMax(): number { return 18; };
				static getMargin(): number { return 0; };
				static getSpacing(): number { return 0; };
		}
}

export namespace Atlases {
		enum AtlasesDiePackmanSpriteSheetFrames {
				Pacman10HpSprite121 = <any>'Pacman10-hp-sprite_121.png',
				Pacman10HpSprite122 = <any>'Pacman10-hp-sprite_122.png',
				Pacman10HpSprite123 = <any>'Pacman10-hp-sprite_123.png',
				Pacman10HpSprite124 = <any>'Pacman10-hp-sprite_124.png',
				Pacman10HpSprite126 = <any>'Pacman10-hp-sprite_126.png',
				Pacman10HpSprite127 = <any>'Pacman10-hp-sprite_127.png',
				Pacman10HpSprite129 = <any>'Pacman10-hp-sprite_129.png',
		}
		export class AtlasesDiePackmanSpriteSheet {
				static getName(): string { return 'diePackmanSpriteSheet'; };

				static getJSONArray(): string { return require('assets/atlases/diePackmanSpriteSheet.json'); };

				static getPNG(): string { return require('assets/atlases/diePackmanSpriteSheet.png'); };

				static Frames = AtlasesDiePackmanSpriteSheetFrames;
		}
		enum AtlasesPackmanFrames {
				Pacman10HpSprite15 = <any>'Pacman10-hp-sprite_15.png',
				Pacman10HpSprite16 = <any>'Pacman10-hp-sprite_16.png',
		}
		export class AtlasesPackman {
				static getName(): string { return 'Packman'; };

				static getJSONArray(): string { return require('assets/atlases/Packman.json'); };

				static getPNG(): string { return require('assets/atlases/Packman.png'); };

				static Frames = AtlasesPackmanFrames;
		}
		enum AtlasesPreloadSpritesArrayFrames {
				PreloadBar = <any>'preload_bar.png',
				PreloadFrame = <any>'preload_frame.png',
		}
		export class AtlasesPreloadSpritesArray {
				static getName(): string { return 'preload_sprites_array'; };

				static getJSONArray(): string { return require('assets/atlases/preload_sprites_array.json'); };

				static getPNG(): string { return require('assets/atlases/preload_sprites_array.png'); };

				static Frames = AtlasesPreloadSpritesArrayFrames;
		}
		enum AtlasesPreloadSpritesHashFrames {
				PreloadBar = <any>'preload_bar.png',
				PreloadFrame = <any>'preload_frame.png',
		}
		export class AtlasesPreloadSpritesHash {
				static getName(): string { return 'preload_sprites_hash'; };

				static getJSONHash(): string { return require('assets/atlases/preload_sprites_hash.json'); };

				static getPNG(): string { return require('assets/atlases/preload_sprites_hash.png'); };

				static Frames = AtlasesPreloadSpritesHashFrames;
		}
		enum AtlasesPreloadSpritesXmlFrames {
				PreloadBar = <any>'preload_bar.png',
				PreloadFrame = <any>'preload_frame.png',
		}
		export class AtlasesPreloadSpritesXml {
				static getName(): string { return 'preload_sprites_xml'; };

				static getPNG(): string { return require('assets/atlases/preload_sprites_xml.png'); };

				static getXML(): string { return require('assets/atlases/preload_sprites_xml.xml'); };

				static Frames = AtlasesPreloadSpritesXmlFrames;
		}
		enum GraphicsHeroIdleFrames {
		}
		export class GraphicsHeroIdle {
				static getName(): string { return 'Hero_Idle'; };

				static getPNG(): string { return require('assets/graphics/Hero_Idle.png'); };

				static getXML(): string { return require('assets/graphics/Hero_Idle.xml'); };

				static Frames = GraphicsHeroIdleFrames;
		}
		enum GraphicsHeroWalkingFrames {
		}
		export class GraphicsHeroWalking {
				static getName(): string { return 'Hero_Walking'; };

				static getPNG(): string { return require('assets/graphics/Hero_Walking.png'); };

				static getXML(): string { return require('assets/graphics/Hero_Walking.xml'); };

				static Frames = GraphicsHeroWalkingFrames;
		}
}

export namespace Audio {
		export class AudioMusic {
				static getName(): string { return 'music'; };

				static getAC3(): string { return require('assets/audio/music.ac3'); };
				static getM4A(): string { return require('assets/audio/music.m4a'); };
				static getMP3(): string { return require('assets/audio/music.mp3'); };
				static getOGG(): string { return require('assets/audio/music.ogg'); };
		}
		export class SoundsTitleSong {
				static getName(): string { return 'TitleSong'; };

				static getMP3(): string { return require('assets/sounds/TitleSong.mp3'); };
				static getOGG(): string { return require('assets/sounds/TitleSong.ogg'); };
				static getWAV(): string { return require('assets/sounds/TitleSong.wav'); };
		}
}

export namespace Audiosprites {
		enum AudiospritesSfxSprites {
				Laser1 = <any>'laser1',
				Laser2 = <any>'laser2',
				Laser3 = <any>'laser3',
				Laser4 = <any>'laser4',
				Laser5 = <any>'laser5',
				Laser6 = <any>'laser6',
				Laser7 = <any>'laser7',
				Laser8 = <any>'laser8',
				Laser9 = <any>'laser9',
		}
		export class AudiospritesSfx {
				static getName(): string { return 'sfx'; };

				static getAC3(): string { return require('assets/audiosprites/sfx.ac3'); };
				static getJSON(): string { return require('assets/audiosprites/sfx.json'); };
				static getM4A(): string { return require('assets/audiosprites/sfx.m4a'); };
				static getMP3(): string { return require('assets/audiosprites/sfx.mp3'); };
				static getOGG(): string { return require('assets/audiosprites/sfx.ogg'); };

				static Sprites = AudiospritesSfxSprites;
		}
}

export namespace GoogleWebFonts {
		export const Barrio: string = 'Barrio';
}

export namespace CustomWebFonts {
		export class Fonts2DumbWebfont {
				static getName(): string { return '2Dumb-webfont'; };

				static getFamily(): string { return '2dumbregular'; };

				static getCSS(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.css'); };
				static getEOT(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.eot'); };
				static getSVG(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.svg'); };
				static getTTF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.ttf'); };
				static getWOFF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.woff'); };
		}
}

export namespace BitmapFonts {
		export class FontsFontFnt {
				static getName(): string { return 'font_fnt'; };

				static getFNT(): string { return require('assets/fonts/font_fnt.fnt'); };
				static getPNG(): string { return require('assets/fonts/font_fnt.png'); };
		}
		export class FontsFontXml {
				static getName(): string { return 'font_xml'; };

				static getPNG(): string { return require('assets/fonts/font_xml.png'); };
				static getXML(): string { return require('assets/fonts/font_xml.xml'); };
		}
}

export namespace JSON {
		class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace XML {
		class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Text {
		class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Scripts {
		export class ScriptsBlurX {
				static getName(): string { return 'BlurX'; };

				static getJS(): string { return require('assets/scripts/BlurX.js'); };
		}
		export class ScriptsBlurY {
				static getName(): string { return 'BlurY'; };

				static getJS(): string { return require('assets/scripts/BlurY.js'); };
		}
}
export namespace Shaders {
		export class ShadersPixelate {
				static getName(): string { return 'pixelate'; };

				static getFRAG(): string { return require('assets/shaders/pixelate.frag'); };
		}
}
export namespace Misc {
		export class ImagesCityBackground {
				static getName(): string { return 'CityBackground'; };

				static getBLEND(): string { return require('assets/images/CityBackground.blend'); };
		}
		export class ImagesIdle {
				static getName(): string { return 'idle'; };

				static getBLEND(): string { return require('assets/images/idle.blend'); };
		}
		export class ImagesWalkcycle {
				static getName(): string { return 'walkcycle'; };

				static getBLEND(): string { return require('assets/images/walkcycle.blend'); };
		}
}
