import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';

class Square extends React.Component {
  render() {
    return (
      <td className={"Tile " + this.props.highlighted} row={this.props.row} col={this.props.col} onClick={(e) => this.props.onClick(e)}>
        <img src={'/images/' + this.props.element + '.png'} />
        {this.props.allObjects}
      </td>
    );
  }
}

class Arrow extends React.Component {
  render() {
    return (
      <td className="Arrow" nth={this.props.nth} onClick={() => this.props.onClick()}>
        <img src={'/images/' + this.props.element + '.png'} />
      </td>
    )
  }
}

class Player extends React.Component {
  render() {
    return (
      <td className={"Player " + this.props.highlight} nth={this.props.nth}>
        <img src={'/images/' + this.props.element + '.png'} />
        <p>{this.props.treasures + '/' + this.props.maxTreasures}</p>
      </td>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
   super(props);
   this.fixTiles = [
    {
        type: "corner",
        rotation: 0,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 90,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 90,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "corner",
        rotation: 90,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 0,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 0,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 90,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 180,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 0,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 270,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 180,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 180,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "corner",
        rotation: 270,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 270,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "threeway",
        rotation: 270,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    },

    {
        type: "corner",
        rotation: 180,
        holdsTreasure: false,
        treasureIsFor: {},
        isroute: false,
        home: {
            ishome: false,
            playerNumber: {}
        },
        playersOnTile: []
    }
  ]
  this.matrixCopy = []
  this.tileRow = 0
  this.tileCol = 0
  this.allroutesCopy = []
  this.rotations = [0, 90, 180, 270]
  this.tileTypes = ["corner", "straight", "threeway"]
  this.directionOfTiles = {
     corner: {
         0: ["right", "down"],
         90: ["down", "left"],
         180: ["left", "up"],
         270: ["up", "right"]
     },
     straight: {
         0: ["up", "down"],
         90: ["left", "right"],
         180: ["up", "down"],
         270: ["left", "right"]
     },
     threeway: {
         0: ["up", "right", "down"],
         90: ["right", "down", "left"],
         180: ["down", "left", "up"],
         270: ["right", "left", "up"]
     }
    }
   this.state = {
     matrix: [],
     howManyPlayers: this.props.players,
     howManyPrizes: this.props.treasures,
     players: [
          {
              id: 0,
              playing: false,
              pLocation: {},
              home: {},
              howManyTreasures: 0,
              color: "#0096FF"
          },
          {
              id: 1,
              playing: false,
              pLocation: {},
              home: {},
              howManyTreasures: 0,
              color: "#32CD32"
          },
          {
              id: 2,
              playing: false,
              pLocation: {},
              home: {},
              howManyTreasures: 0,
              color: "#800020"
          },
          {
              id: 3,
              playing: false,
              pLocation: {},
              home: {},
              howManyTreasures: 0,
              color: "#9932CC"
          }
      ],
     allRandomTiles: [],
     allRoutes: [],
     fixtilesCpy: [...this.fixTiles],
     tileOut: [],
     pushed: false,
     currentPlayer: 0,
     gameStarted: false
   };
  }

  getRandomNum(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
  }

  getRandomTile() {
      let randomTile =
          {
          type: this.tileTypes[this.getRandomNum(0,2)],
          rotation: this.rotations[this.getRandomNum(0,3)],
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
        };
      return randomTile;
  }

  getAllRandomTiles(){
    let n1 = 13;
    let n2 = 15;
    let n3 = 6;
    while(n1 > 0 || n2 > 0 || n3 > 0){
        let tile = this.getRandomTile()
        if(tile.type === "straight" && n1 > 0){
            this.state.allRandomTiles.push(tile);
            n1--;
        }
        else if(tile.type === "corner" && n2 > 0){
            this.state.allRandomTiles.push(tile);
            n2--;
        }
        else if(tile.type === "threeway" && n3 > 0){
            this.state.allRandomTiles.push(tile);
            n3--;
        }
    }
  }

  generateBoard() {
    this.setState({gameStarted: true});
    this.getAllRandomTiles();
    for(let i = 1; i <= 7; i++){
        let row = []
        for(let j = 1; j <= 7; j++){
            if(i %2 === 1 && j % 2 === 1) {
                row.push(this.state.fixtilesCpy.shift());
            }
            else{
                row.push(this.state.allRandomTiles.shift());
            }
        }
        this.state.matrix.push(row);
    }
    this.matrixCopy = [...this.state.matrix];
  }

  placeTreasures() {
    let ps = []
    for (let i = 0; i < this.state.players.length; i++) {
        if (this.state.players[i].playing === true) {
            ps.push(this.state.players[i]);
        }
    }
    for (let i = 0; i < ps.length; i++) {
        let tres = this.state.howManyPrizes / ps.length;
        while (tres > 0) {
            let col = this.getRandomNum(0, 6);
            let row = this.getRandomNum(0, 6);
            if ((this.matrixCopy[col][row] !== this.matrixCopy[0][0]) && (this.matrixCopy[col][row] !== this.matrixCopy[0][6]) && (this.matrixCopy[col][row] !== this.matrixCopy[6][0]) && (this.matrixCopy[col][row] !== this.matrixCopy[6][6])) {
                if (this.matrixCopy[col][row].holdsTreasure === false) {
                    this.matrixCopy[col][row].holdsTreasure = true;
                    this.matrixCopy[col][row].treasureIsFor = ps[i];
                    tres--;
                }
            }
        }
    }
    this.setState(
      {matrix: this.matrixCopy}
    )
  }

  setTileOut() {
    this.state.tileOut = this.getRandomTile();
  }

  slideDown(n){
    let helper = this.matrixCopy[0][n];
    let tileOutCopy = this.state.tileOut;
    for(let i = 1; i < 7; i++){
      this.matrixCopy[i-1][n] = this.matrixCopy[i][n];
    }
    this.matrixCopy[6][n] = this.state.tileOut;
    for(let i = 0; i < helper.playersOnTile.length; i++){
      tileOutCopy.playersOnTile.push(helper.playersOnTile[i]);
      helper.playersOnTile[i].pLocation = this.state.tileOut;
    }
    helper.playersOnTile = [];
    this.setState(
      {
        pushed: true,
        matrix: this.matrixCopy,
        tileOut: helper
      }
    );
  }

  slideUp(n){
    let helper = this.matrixCopy[6][n];
    let tileOutCopy = this.state.tileOut;
    for(let i = 5; i >= 0; i--){
      this.matrixCopy[i+1][n] = this.matrixCopy[i][n];
    }
    this.matrixCopy[0][n] = this.state.tileOut;
    for(let i = 0; i < helper.playersOnTile.length; i++){
      tileOutCopy.playersOnTile.push(helper.playersOnTile[i]);
      helper.playersOnTile[i].pLocation = this.state.tileOut;
    }
    helper.playersOnTile = [];
    this.setState(
      {
        pushed: true,
        matrix: this.matrixCopy,
        tileOut: helper
      }
    );
  }

  slideRight(n){
    let helper = this.matrixCopy[n][0];
    let tileOutCopy = this.state.tileOut;
    for(let i = 1; i < 7; i++){
      this.matrixCopy[n][i-1] = this.matrixCopy[n][i];
    }
    this.matrixCopy[n][6] = this.state.tileOut;
    for(let i = 0; i < helper.playersOnTile.length; i++){
      tileOutCopy.playersOnTile.push(helper.playersOnTile[i]);
      helper.playersOnTile[i].pLocation = this.state.tileOut;
    }
    helper.playersOnTile = [];
    this.setState(
      {
        pushed: true,
        matrix: this.matrixCopy,
        tileOut: helper
      }
    );
  }

  slideLeft(n){
    let helper = this.matrixCopy[n][6];
    let tileOutCopy = this.state.tileOut;
    for(let i = 5; i >= 0; i--){
      this.matrixCopy[n][i+1] = this.matrixCopy[n][i];
    }
    this.matrixCopy[n][0] = this.state.tileOut;
    for(let i = 0; i < helper.playersOnTile.length; i++){
      tileOutCopy.playersOnTile.push(helper.playersOnTile[i]);
      helper.playersOnTile[i].pLocation = this.state.tileOut;
    }
    helper.playersOnTile = [];
    this.setState(
      {
        pushed: true,
        matrix: this.matrixCopy,
        tileOut: helper
      }
    );
  }

  rotatetileRight() {
    let tileOutCopy = this.state.tileOut;
    tileOutCopy.rotation += 90;
    if(tileOutCopy.rotation > 270){
        tileOutCopy.rotation = 0;
    }
    this.setState({tileOut: tileOutCopy});
  }

  rotatetileLeft() {
    let tileOutCopy = this.state.tileOut;
    tileOutCopy.rotation -= 90;
    if(tileOutCopy.rotation < 0){
        tileOutCopy.rotation = 270;
    }
    this.setState({tileOut: tileOutCopy});
  }

  setUpHomes() {
    let corners = [this.matrixCopy[0][0], this.matrixCopy[0][6], this.matrixCopy[6][0], this.matrixCopy[6][6]];
    let playersCopy = [...this.state.players];
    for(let i = 0; i < this.state.howManyPlayers; i++){
      corners[i].home.ishome = true;
      corners[i].home.playerNumber = i;
      corners[i].playersOnTile.push(playersCopy[i]);
      playersCopy[i].playing = true;
      playersCopy[i].pLocation = corners[i];
      playersCopy[i].home = corners[i];
    }
    this.setState({
      matrix: this.matrixCopy,
      players: playersCopy
    })
  }

  getAllRoutes(n,m){
    this.allroutesCopy.push(this.state.matrix[n][m]);
    this.matrixCopy[n][m].isroute = true;
    let array = this.directionOfTiles[this.state.matrix[n][m].type][this.state.matrix[n][m].rotation]
    for(let i = 0; i < array.length; i++){
        if(array[i] === "up"){
            if(n !== 0){
                const currTile = this.state.matrix[n-1][m];
                if(currTile.isroute === false && this.directionOfTiles[this.state.matrix[n-1][m].type][this.state.matrix[n-1][m].rotation].includes("down")){
                    this.getAllRoutes(n-1,m);
                }
            }
        }
        else if(array[i] === "down"){
            if(n !== 6){
                const currTile = this.state.matrix[n+1][m];
                if(currTile.isroute === false && this.directionOfTiles[this.state.matrix[n+1][m].type][this.state.matrix[n+1][m].rotation].includes("up")){
                    this.getAllRoutes(n+1,m);
                }
            }
        }
        else if(array[i] === "left"){
            if(m !== 0){
                const currTile = this.state.matrix[n][m-1];
                if(currTile.isroute === false && this.directionOfTiles[this.state.matrix[n][m-1].type][this.state.matrix[n][m-1].rotation].includes("right")){
                    this.getAllRoutes(n,m-1);
                }
            }
        }
        else if(array[i] === "right"){
            if(m !== 6){
                const currTile = this.state.matrix[n][m+1];
                if(currTile.isroute === false && this.directionOfTiles[this.state.matrix[n][m+1].type][this.state.matrix[n][m+1].rotation].includes("left")){
                    this.getAllRoutes(n,m+1);
                }
            }
        }
    }
    this.setState({
      allRoutes: this.allroutesCopy,
      matrix: this.matrixCopy
    });
  }

  clearRoutes() {
    for(let i = 0; i < this.state.matrix.length; i++){
      for(let j =0; j < this.state.matrix[i].length; j++){
          this.matrixCopy[i][j].isroute = false;
      }
    }
    this.setState({
      matrix: this.matrixCopy,
      allRoutes: []
    });
  }

  checkIfTreasure(tile, player){
    if(tile.holdsTreasure === true && tile.treasureIsFor === player){
        return true;
    }else{
        return false;
    }
  }

  collectTreasure(tile, playersCopy, curr) {
    if(tile.holdsTreasure && tile.treasureIsFor === playersCopy[curr]){
        tile.holdsTreasure = false
        tile.treasureIsFor = {}
        playersCopy[curr].howManyTreasures += 1
    }
    this.setState({
      matrix: this.matrixCopy,
      players: playersCopy
    })
  }

  checkIfWin() {
    for(let i = 0; i < this.state.howManyPlayers; i++){
      if(this.state.players[i].howManyTreasures === this.state.howManyPrizes / this.state.howManyPlayers && this.state.players[i].pLocation === this.state.players[i].home){
        confirmAlert({
          title: 'Nyert a ' + this.state.players[i].id + 1 + ". játékos!",
          message: 'Kiléphet a kezdőoldalra, vagy újrakezdheti a játékot a meglévő beállításokkal.',
          buttons: [
            {
              label: 'Kezdőoldal',
              onClick: () => window.location.reload(false)
            },
            {
              label: 'Újrakezdés',
              onClick: () => this.resetGame()
            }
          ]
        });
      }
    }
  }

  resetGame() {
    this.matrixCopy = []
    this.tileRow = 0
    this.tileCol = 0
    this.allroutesCopy = []
    this.fixTiles = [
      {
          type: "corner",
          rotation: 0,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 90,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 90,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "corner",
          rotation: 90,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 0,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 0,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 90,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 180,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 0,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 270,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 180,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 180,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "corner",
          rotation: 270,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 270,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "threeway",
          rotation: 270,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      },
  
      {
          type: "corner",
          rotation: 180,
          holdsTreasure: false,
          treasureIsFor: {},
          isroute: false,
          home: {
              ishome: false,
              playerNumber: {}
          },
          playersOnTile: []
      }
    ]
    this.setState({
      matrix: [],
      howManyPlayers: this.props.players,
      howManyPrizes: this.props.treasures,
      players: [
          {
              id: 0,
              playing: false,
              pLocation: {},
              home: {},
              howManyTreasures: 0,
              color: "#0096FF"
          },
          {
              id: 1,
              playing: false,
              pLocation: {},
              home: {},
              howManyTreasures: 0,
              color: "#32CD32"
          },
          {
              id: 2,
              playing: false,
              pLocation: {},
              home: {},
              howManyTreasures: 0,
              color: "#800020"
          },
          {
              id: 3,
              playing: false,
              pLocation: {},
              home: {},
              howManyTreasures: 0,
              color: "#9932CC"
          }
      ],
      allRandomTiles: [],
      allRoutes: [],
      fixtilesCpy: [...this.fixTiles],
      tileOut: [],
      pushed: false,
      currentPlayer: 0,
      gameStarted: false
    })
  }

  getPlayersLocation() {
    let cell = this.state.players[this.state.currentPlayer].pLocation;
    console.log(this.state.players[this.state.currentPlayer].pLocation);
    for(let i = 0; i < this.state.matrix.length; i++){
        for(let j = 0; j < this.state.matrix[i].length; j++){
            if(this.state.matrix[i][j] === cell){
                this.tileRow = i;
                this.tileCol = j;
                console.log(this.tileRow, this.tileCol);
            }
        }
      }
    }

  pushArrows(n, direction) {
    if(this.state.pushed){
      return;
    }
    switch (direction) {
      case "up":
        this.slideDown(n);
        break;
      case "down":
        this.slideUp(n);
        break;
      case "left":
        this.slideRight(n);
        break;
      case "right":
        this.slideLeft(n);
        break;
    }
    this.getPlayersLocation();
    this.getAllRoutes(this.tileRow, this.tileCol);
  }

  increase() {
    let curr = this.state.currentPlayer;
    if(this.state.howManyPlayers === 1){
      curr = 0;
    }else{
      curr++;
      if(this.state.currentPlayer >= this.state.howManyPlayers - 1) {
        curr = 0;
      }
    }
    this.setState({currentPlayer: curr});
  }

  renderSquare(type, rotation, i, row, col, tile) {
    let tileimage = type + rotation;
    let text = tileimage.toString();
    let allObjects = []
    let highlighted = "";
    
    if(tile.playersOnTile.length > 0){
      for(let i = 0; i < tile.playersOnTile.length; i++){
        allObjects.push(<div className={"playerSquare" + tile.playersOnTile[i].id + " position" + tile.playersOnTile.length + "-" + i}></div>);
      }
    }
    

    if(tile.holdsTreasure){
      allObjects.push(<div className={"treasure" + tile.treasureIsFor.id}></div>)
    }

    if(tile.home.ishome){
      allObjects.push(<div className={"home" + tile.home.playerNumber}></div>)
    }

    if(tile.isroute){
      highlighted = "highlighted";
    }

    return <Square key={i} value={i} highlighted={highlighted} onClick={(e) => this.step(e)}
    row={row} col={col} element={text} allObjects={allObjects}/>;
  }

  renderSquareBlank(type, rotation, i) {
    let tileimage = type + rotation;
    let text = tileimage.toString();

    return <Square key={i} value={i} onClick={(e) => this.step(e)} element={text}/>;
  }

  renderRows(squares) {
    return (<tr className="board-row">
      {squares}
    </tr>);
  }

  renderArrow(dir, i, n) {
    return <Arrow key={i} value={i} nth={n} element={"arrow" + dir}
    onClick={() => this.pushArrows(n, dir)}/>;
  }

  renderArrowOutLeft(dir, i, n) {
    return <Arrow key={i} value={i} nth={n} element={"arrow" + dir}
    onClick={() => this.rotatetileLeft()}/>;
  }

  renderArrowOutRight(dir, i, n) {
    return <Arrow key={i} value={i} nth={n} element={"arrow" + dir}
    onClick={() => this.rotatetileRight()}/>;
  }

  renderPlayer(i, n) {
    let color = "";
    switch (i) {
      case 1:
        color = "red";
        break;
      case 2:
        color = "blue";
        break;
      case 3:
        color = "green";
        break;
      case 4:
        color = "purple";
        break;
    }
    let text = color + "Player";
    let highlight = "";
    if(this.state.currentPlayer === i-1){
      highlight = "highlightedPlayer"
    }
    return <Player nth={n} element={text} highlight={highlight} treasures={this.state.players[i-1].howManyTreasures} maxTreasures={this.state.howManyPrizes / this.state.howManyPlayers}/>;
  }

  renderBoard() {
    let board = [];
    let rows = [];
    let firstrow = [];
    let lastrow = [];
    let arrowColumnCounter = 1;
    for(let i = 0, nthCounter = 1; i < 9; i++){
      if(i === 2 || i === 4 || i === 6){
        firstrow.push(
          this.renderArrow("down", i, nthCounter)
        );
        lastrow.push(
          this.renderArrow("up", i, nthCounter)
        );
        nthCounter += 2;
      }
      else{
        firstrow.push(
          this.renderSquareBlank("blank","",i,"blank","blank")
        );
        lastrow.push(
          this.renderSquareBlank("blank","",i,"blank","blank")
        );
      }
    }
    board.push(this.renderRows(firstrow));
    for (let i = 0, squareNumber = 0; i < 7; i++) {
      if(i === 1 || i === 3 || i === 5){
        rows.push(this.renderArrow("right",i, arrowColumnCounter));
      }else{
        rows.push(this.renderSquareBlank("blank","",i,"blank","blank"));
      }
      for (let j = 0; j < 7; j++) {
        rows.push(
          this.renderSquare(
            this.state.matrix[i][j].type, this.state.matrix[i][j].rotation, squareNumber, i, j, this.state.matrix[i][j]
          )
        );
        squareNumber++;
      }
      if(i === 1 || i === 3 || i === 5){
        rows.push(this.renderArrow("left",i, arrowColumnCounter));
        arrowColumnCounter+=2;
      }else{
        rows.push(this.renderSquareBlank("blank","",i,"blank","blank"));
      }
      board.push(this.renderRows(rows));
      rows = [];
      squareNumber++;
    }
    board.push(this.renderRows(lastrow));
    return board;
  }

  renderTileOut() {
    return(
      <table className="tileOutTable">
        <tbody>
          <tr>
            {this.renderArrowOutLeft("left", 97, 97)}
            {this.renderSquare(this.state.tileOut.type, this.state.tileOut.rotation, 98, 98, 98, this.state.tileOut)}
            {this.renderArrowOutRight("right", 99, 99)}
          </tr>
        </tbody>
      </table>
    )
  }

  renderPlayers() {
    let playerTds = [];
    for(let i = 1; i <= this.state.howManyPlayers; i++){
      playerTds.push(
        this.renderPlayer(
          i, i-1
        )
      );
    }
    let row = <tr> {playerTds} </tr>
    
    return (
      <table className="playerTable">
        <tbody>
          {row}
        </tbody>
      </table>
    )
  }

  step(e) {
    if(!this.state.pushed) {
      return;
    }
    let row = e.target.parentNode.getAttribute('row');
    let col = e.target.parentNode.getAttribute('col');

    let playersCopy = this.state.players;
    let curr = this.state.currentPlayer;
    let currentTile;
    for(let i = 0; i < this.matrixCopy.length; i++){
      for(let j = 0; j < this.matrixCopy[i].length; j++){
        for(let k = 0; k < this.matrixCopy[i][j].playersOnTile.length; k++){
          if(this.matrixCopy[i][j].playersOnTile[k] === playersCopy[curr]){
            currentTile = this.matrixCopy[i][j];
          }
        }
      }
    }
    if(this.state.allRoutes.includes(this.matrixCopy[row][col])){
      let p = currentTile.playersOnTile.indexOf(playersCopy[curr]);
      currentTile.playersOnTile.splice(p,1);
      this.matrixCopy[row][col].playersOnTile.push(playersCopy[curr]);
      playersCopy[curr].pLocation = this.matrixCopy[row][col];
    }else{
      return;
    }
    if(this.checkIfTreasure(this.matrixCopy[row][col], playersCopy[curr])){
      this.collectTreasure(this.matrixCopy[row][col], playersCopy, curr)
    }
    this.clearRoutes();
    this.checkIfWin();
    this.increase();
    this.setState({
      pushed: false,
      matrix: this.matrixCopy,
      players: playersCopy
    })
  }

  refreshPage() {
    confirmAlert({
      title: 'Biztosan ki szeretnél lépni?',
      message: 'Minden elmentetlen haladás el fog veszni.',
      buttons: [
        {
          label: 'Igen',
          onClick: () => window.location.reload(false)
        },
        {
          label: 'Nem'
        }
      ]
    });
  }

  toggleDescription() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Játék leírása</h1>
            <p>A katakomba szobáit egy 7x7-es négyzetrács cellái jelképezik. Minden szoba esetén adott, hogy mely falain van ajtó. Ha két szomszédos szoba érintkező falán egy-egy ajtó van, akkor át lehet menni egyik szobából a másikba. A négyzetrács páros sorait és oszlopait el lehet tolni, a többi szoba végig rögzített a játék során. Az eltolásokkal az ajtókon keresztül utak nyílnak a szobák között, így lehet eljutni a kincsekhez. Mindegyik kérő arra törekszik, hogy a katakomba szobáinak ötletes eltolásával eljusson a kincsekhez. Aki elsőként találja meg mindahányat és kiindulópontjára sikeresen visszaérkezik az a nyertes.</p>
            <p>A játék elején a szobákat véletlen sorrendben és véletlen irányban kirakjuk a játéktábla szabad mezőire. A szobák közül az egyik mindenképpen fölösleges marad. A játék folyamán majd mindig az éppen kimaradó szobát használjuk a többi szoba elcsúsztatására. A játékban legfeljebb 24 kincset kell megtalálni. Ezeket véletlen sorrendben felrakjuk a táblára úgy, hogy egy mezőn csak egy kincs lehet, és a sarokba nem rakhatunk, majd az ezeket jelző kártyákat összekeverjük, és egyenlő számban szétosztjuk a játékosok között, felfedve mindig a legfelső kártyát. A játékosokat jelző figurákat a tábla külön sarkaiba helyezzük.</p>
            <p>A katakomba átalakítása a következőképpen történik: A játékos a kimaradt szobát (tetszőlegesen elforgatva) valamelyik oldalról becsúsztathatja a játéktábla területére egy szabadon mozgó sor vagy oszlop szélén, aminek következtében az átellenes oldalon kiesik egy másik szoba. A tábla szélén nyilak jelzik azokat a helyeket, ahol a szobát be lehet csúsztatni. A szoba bárhol betolható, kivétel ott, ahol az imént kilökődött. Nem szabad tehát az előző játékos lépését rögtön „visszacsinálni". Ha a szobák eltolása során a szobával együtt egy figura is kitolódnék – akár másé, akár a miénk -, akkor ezt a figurát az ellenkező oldalról imént becsúsztatott szobába kell helyezni.</p>
            <p>A szobák eltolását követi a játékos lépése a figurával. A katakomba minden olyan pontjáig el lehet jutni, amelyet a kiindulóponttal folyamatos járatvonal köt össze. Az ilyen járatokban tehát olyan messzire mehetünk el, amilyen messzire csak akarunk, vagyis nem számít, hogy hány szobán lépkedünk végig. Nem kötelező lépni. Figuránkat akár ott is hagyhatjuk, ahol éppen van. Egy mezőn több figura is állhat: a figurák nem ütik ki egymást. Ha valaki nem tud rögtön céljáig eljutni, akkor figurájával addig a pontig célszerű elmennie, ahol feltehetőleg jó helyzetben várhatja következő lépést. Ha valaki elérte a felfedett kincskártya által megjelölt célt, akkor felfedi a következőt, és most ehhez a célhoz igyekszik eljutni, stb.</p>
            <p>A játék akkor ér véget, ha egy játékos az összes kincskártyájához tartozó kincset megszerezte, és visszavezette a figuráját arra mezőre, ahonnan elindult. Az a győztes, aki valamennyi kincsét megtalálta és figuráját elsőként juttatta vissza a kiindulópontra.</p>
            <button onClick={onClose}>Vissza a játékhoz</button>
          </div>
        );
      }
    });
  }


  render() {
    if(!this.state.gameStarted){
      this.generateBoard();
      this.setUpHomes();
      this.placeTreasures();
      this.setTileOut();
    }
    return (
      <div>
        <div className="topnav">
          <a id="exit" class="active" href="#home" onClick={() => this.refreshPage()}>Kilépés</a>
          <a href="#signup">Regisztráció</a>
          <a href="#login">Bejelentkezés</a>
          <a href="#save">Mentés</a>
          <a id="description" href="#description" onClick={() => this.toggleDescription()}>Játék leírása</a>
        </div>
        <div className="allDivs">
          <table cellSpacing="0" className="no-spacing">
            <tbody>
            {this.renderBoard()}
            </tbody>
          </table>
          <div class="out_and_players">
            {this.renderPlayers()}
            {this.renderTileOut()}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      players: 1,
      treasures: 1,
      picking: true
    };
  }
  changePlayer(event) {
    this.setState({
      players: event.target.value,
      treasures: event.target.value
    });
    console.log("p.changed");
  };

  changeTreasure(event) {
    this.setState({
      treasures: event.target.value
    });
    console.log("t.changed");
  };

  selectPlayers(){
    return (
      <input
        id="players"
        type='range'
        min={1}
        max={4}
        step={1}
        onChange={(event) => this.changePlayer(event)}
        value={this.state.players}
        className='custom-slider'>
    </input>
    )
  }

  selectTreasures(){
    return (
      <input
        id="treasures"
        type='range'
        min={this.state.players}
        max={24}
        step={this.state.players}
        onChange={(event) => this.changeTreasure(event)}
        value={this.state.treasures}
        className='custom-slider'>
    </input>
    )
  }

  pickingCSS(div) {
    if(div === "board"){
      if(this.state.picking){
        return "hideElements"
      }else{
        return "displayElements"
      }
    }else{
      if(!this.state.picking){
        return "hideElements"
      }else{
        return "displayElements"
      }
    }
  }

  toggleDescription() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Játék leírása</h1>
            <p>A katakomba szobáit egy 7x7-es négyzetrács cellái jelképezik. Minden szoba esetén adott, hogy mely falain van ajtó. Ha két szomszédos szoba érintkező falán egy-egy ajtó van, akkor át lehet menni egyik szobából a másikba. A négyzetrács páros sorait és oszlopait el lehet tolni, a többi szoba végig rögzített a játék során. Az eltolásokkal az ajtókon keresztül utak nyílnak a szobák között, így lehet eljutni a kincsekhez. Mindegyik kérő arra törekszik, hogy a katakomba szobáinak ötletes eltolásával eljusson a kincsekhez. Aki elsőként találja meg mindahányat és kiindulópontjára sikeresen visszaérkezik az a nyertes.</p>
            <p>A játék elején a szobákat véletlen sorrendben és véletlen irányban kirakjuk a játéktábla szabad mezőire. A szobák közül az egyik mindenképpen fölösleges marad. A játék folyamán majd mindig az éppen kimaradó szobát használjuk a többi szoba elcsúsztatására. A játékban legfeljebb 24 kincset kell megtalálni. Ezeket véletlen sorrendben felrakjuk a táblára úgy, hogy egy mezőn csak egy kincs lehet, és a sarokba nem rakhatunk, majd az ezeket jelző kártyákat összekeverjük, és egyenlő számban szétosztjuk a játékosok között, felfedve mindig a legfelső kártyát. A játékosokat jelző figurákat a tábla külön sarkaiba helyezzük.</p>
            <p>A katakomba átalakítása a következőképpen történik: A játékos a kimaradt szobát (tetszőlegesen elforgatva) valamelyik oldalról becsúsztathatja a játéktábla területére egy szabadon mozgó sor vagy oszlop szélén, aminek következtében az átellenes oldalon kiesik egy másik szoba. A tábla szélén nyilak jelzik azokat a helyeket, ahol a szobát be lehet csúsztatni. A szoba bárhol betolható, kivétel ott, ahol az imént kilökődött. Nem szabad tehát az előző játékos lépését rögtön „visszacsinálni". Ha a szobák eltolása során a szobával együtt egy figura is kitolódnék – akár másé, akár a miénk -, akkor ezt a figurát az ellenkező oldalról imént becsúsztatott szobába kell helyezni.</p>
            <p>A szobák eltolását követi a játékos lépése a figurával. A katakomba minden olyan pontjáig el lehet jutni, amelyet a kiindulóponttal folyamatos járatvonal köt össze. Az ilyen járatokban tehát olyan messzire mehetünk el, amilyen messzire csak akarunk, vagyis nem számít, hogy hány szobán lépkedünk végig. Nem kötelező lépni. Figuránkat akár ott is hagyhatjuk, ahol éppen van. Egy mezőn több figura is állhat: a figurák nem ütik ki egymást. Ha valaki nem tud rögtön céljáig eljutni, akkor figurájával addig a pontig célszerű elmennie, ahol feltehetőleg jó helyzetben várhatja következő lépést. Ha valaki elérte a felfedett kincskártya által megjelölt célt, akkor felfedi a következőt, és most ehhez a célhoz igyekszik eljutni, stb.</p>
            <p>A játék akkor ér véget, ha egy játékos az összes kincskártyájához tartozó kincset megszerezte, és visszavezette a figuráját arra mezőre, ahonnan elindult. Az a győztes, aki valamennyi kincsét megtalálta és figuráját elsőként juttatta vissza a kiindulópontra.</p>
            <button onClick={onClose}>Vissza a játékhoz</button>
          </div>
        );
      }
    });
  }

  start_button() {
    return(
      <button className="frontButton" id="start_button" onClick={() => this.setState({picking: false})}>
        Játék indítása
      </button>
    )
  }

  description_button() {
    return(
      <button className="frontButton" onClick={() => this.toggleDescription()}>
        Játék leírása
      </button>
    )
  }

  display_value(value) {
    return(
      <p className="value_box">{value}</p>
    )
  }

  render_board() {
    if(!this.state.picking){
      return (
        <div className={"game-board " + this.pickingCSS("board")}>
            <Board players={this.state.players} treasures={this.state.treasures}/>
        </div>
      )
    }
  }

  
  render() {
    return (
      <div className="game">
        <img id="background" src="images/forest.png"></img>
        <div className={this.pickingCSS("options")}>
          <h1 id="title">Varázslatos katakomba</h1>
          <h4 id="selfpromo">By Farkas Árpád</h4>
          <div className="links">
            <a href="https://www.facebook.com/arpi.farkas.71/" target="_blank"><img src="images/facebook.png" alt="Girl in a jacket" width="30" height="30"></img></a>
            <a href="https://www.linkedin.com/in/farkas-%C3%A1rp%C3%A1d-b84aa7187/" id="middle" target="_blank"><img src="images/linkedin.png" alt="Girl in a jacket" width="30" height="30"></img></a>
            <a href="https://github.com/arepsz" target="_blank"><img src="images/github.png" alt="Girl in a jacket" width="30" height="30"></img></a>
          </div>
          <p id="choose">
            ?
            <p id="tooltiptext">
              A csúszkák segítségével adja meg, hogy hány játékossal és kinccsel szeretne játszani. 
            </p>
          </p>
          <div className="options">
            <div className="slider">
              {this.selectPlayers()}
              {this.display_value(this.state.players)}
            </div>
            <div className="slider">
              {this.selectTreasures()}
              {this.display_value(this.state.treasures)}
            </div>  
          </div>
          <div className="start_buttons">
            {this.description_button()}
            {this.start_button()}
          </div>
        </div>
        {this.render_board()}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Game />
  </>
);
