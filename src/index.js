import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Register from './components/register.js';
import Board from './components/gamelogic.js';
import Login from './components/login.js'

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      players: 1,
      treasures: 1,
      picking: true,
      toggleRegister: false
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

  renderTopNav() {
    return (
      <div className={"topnav " + this.pickingCSS("board")}>
          <a id="exit" class="active" href="#home" onClick={() => this.refreshPage()}>Kilépés</a>
          <a href="#signup" onClick={() => this.renderRegister()}>Regisztráció</a>
          <a href="#login" onClick={() => this.renderLogin()}>Bejelentkezés</a>
          <a href="#save">Mentés</a>
          <a id="description" href="#description" onClick={() => this.toggleDescription()}>Játék leírása</a>
        </div>
    )
  }

  renderRegister() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-register'>
            <h1>Regisztráció</h1>
            <Register/>
            <button onClick={onClose} className="custom-ui-register-button">Vissza</button>
          </div>
        );
      }
    });
  }

  renderLogin() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-register'>
            <h1>Bejelentkezés</h1>
            <Login/>
            <button onClick={onClose} className="custom-ui-register-button">Vissza</button>
          </div>
        );
      }
    });
  }

  render_board() {
    if(!this.state.picking){
      return (
        <div className={"game-board " + this.pickingCSS("board")}>
            {this.renderTopNav()}
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
