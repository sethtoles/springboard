# springboard
A Platform for Launching a Board Game

### Wanna try it out?
```
git clone git@github.com:sethtoles/springboard.git
cd springboard
npm install
npm run dev
```
Then navigate to `localhost:8080` in any browser with modern JavaScript functionality (only tested in Chrome with chrome://flags/#enable-javascript-harmony enabled).

## Features
#### Board
You get a grid. Enjoy it. You can make it taller or wider by clicking the double-arrow buttons on its right edge. You can drag it around the window with the handle icon.

#### Game Pieces
Click the deck (that's the ugly blue rectangle) to create a new board tile. Click and drag a tile to move it. By default the tile will snap to the board grid, but holding <kbd>ctrl</kbd> allows you to move the tile freely. Right-click on a tile removes it.

## Desired Features
- [ ] Customizable board size
- [ ] Game layers with discrete rules
- [ ] Configurable dice roll
- [ ] Card piece type with hidden state
- [ ] Configurable deck with customizable card list
- [ ] Image upload for use on any game piece
- [ ] < ES2015 support via build step
- [ ] Hosted demo site
- [ ] User login to save project state
- [ ] Multiple user connections
- [ ] Cooperative editing
- [ ] Game play state - all configuration locked
- [ ] Global entity setting to make it private to the player

## Non-goals that would be cool anyway
- [ ] Hexagonal grids & pieces!
