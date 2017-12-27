# springboard
A Platform for Launching a Board Game

### Wanna try it out?
```
git clone git@github.com:sethtoles/springboard.git
cd springboard
npm install
npm run server-dev
```
and in a seperate shell in the /springboard directory,
```
npm run build-dev
```

Then navigate to `localhost:8080/client/dist` in a relatively modern browser (tested in Firefox and Chrome)

## Features
#### Board
This is the awesome grid in the middle of the screen. You can make it taller or wider by clicking the double-arrow buttons on its right edge. You can drag it around the window with the handle icon.

#### Decks
Create a deck with the selector at the top. Currently you can only make decks which create pieces.

### Game Pieces
Once you've made a deck, which I know you've done, click it to create a new game piece. Click and drag a piece to move it. By default the piece will snap to any board grid, but holding <kbd>ctrl</kbd> allows you to move the piece freely.

#### Trash
Any draggable item can be deleted by dragging it over the red trash box.

## Desired Features
- [ ] Customizable board size
- [ ] Game layers with discrete rules
- [ ] Configurable dice roll
- [ ] Card piece type with hidden state
- [ ] Configurable deck with customizable card list
- [ ] Image upload for use on any game piece
- [x] < ES2015 support via build step
- [ ] Hosted demo site
- [ ] User login to save project state
- [ ] Multiple user connections
- [ ] Cooperative editing
- [ ] Game play state - all configuration locked
- [ ] Global entity setting to make it private to the player

## Non-goals that would be cool anyway
- [ ] Hexagonal grids & pieces!
