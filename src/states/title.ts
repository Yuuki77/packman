import * as Assets from '../assets';

export default class Title extends Phaser.State {
	private sfxAudiosprite: Phaser.AudioSprite = null;
	// This is any[] not string[] due to a limitation in TypeScript at the moment;
	// despite string enums working just fine, they are not officially supported so we trick the compiler into letting us do it anyway.
	private sfxLaserSounds: any[] = null;

	public create(): void {
		this.sfxAudiosprite = this.game.add.audioSprite(Assets.Audiosprites.AudiospritesSfx.getName());

		// This is an example of how you can lessen the verbosity
		let availableSFX = Assets.Audiosprites.AudiospritesSfx.Sprites;
		this.sfxLaserSounds = [
			availableSFX.Laser1,
			availableSFX.Laser2,
			availableSFX.Laser3,
			availableSFX.Laser4,
			availableSFX.Laser5,
			availableSFX.Laser6,
			availableSFX.Laser7,
			availableSFX.Laser8,
			availableSFX.Laser9
		];

		this.game.camera.flash(0x000000, 1000);
		this.input.onTap.addOnce(this.titleClicked, this);
	}
	titleClicked() {
		this.game.state.start('gamePlayState');
	}
}
