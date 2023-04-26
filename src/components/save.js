import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Save({user, game, setSavedState, setLoadedState}) {
    const [email, setEmail] = useState(localStorage.getItem('user-email'));
    const [saveName, setSaveName] = useState("");
    const [nameInput, setNameInput] = useState(false);
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);
    const [noGames, setNoGames] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showGames, setShowGames] = useState(false);

    const onChangeName = (e) => {
        setSaveName(e.target.value);
      };

    const handleStatusSave = (json) => {
        if(json['status'] == 400){
            setSaved(true);
        }else{
            setError(json['error']);
            setSaved(false);
        }
        setNameInput(false);
        setShowMessage(true);
    };

    const handleStatusLoad = (json) => {
        setShowMessage(false);
        setNameInput(false);
        if(json['status'] = 400){
            setGames(json['saves']);
            setShowGames(true);
        }else{
            setError(json['error']);
            setShowGames(false);
        }
    }

    const handleStatusDelete = (json, i) => {
        console.log(json);
        if(json['status'] == 400){
            let newGames = games;
            newGames.splice(i, 1);
            setGames(newGames);
            if(games.length == 0){
                setNoGames(true);
            }else{
                setNoGames(false);
            }
        }else{
            setError(json['error']);
        }
    }

    const renderGames = () => {
        let outArray = [];
        for(let i = 0; i < games.length; i++){
            outArray.push(
                <div className="saved-game-div">
                    <FontAwesomeIcon icon={faSave} className="save-images" onClick={() => loadGame(games[i]['game-state'])}/>
                    <div className="saved-game-text">
                        <p>{games[i]['save-name']}</p>
                        <p>{games[i]['save-date']}</p>
                    </div>
                    <FontAwesomeIcon icon={faX} style={{color: "#a51d2d"}} className="save-images x" onClick={() => deleteGame(games[i], i)}/>
                </div>
            )
        }
        return (
            <>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "rgb(225, 128, 128)"}} className="saved-games-back" onClick={hideGames}/>
            {noGames == false ? 
                <div className="saved-games">
                    {outArray}
                </div> :
            <p className={"error-message-red"}>Nincs megjeleníthető mentés!</p>}
            </>
        )
    }

    const loadGame = (game_state) => {
        setLoadedState(true);
        setSavedState(game_state);
        setShowGames(false);
    }

    const deleteGame = (game, i) => {
        const obj = {
            email: email,
            game: game,
            task: "delete"
        }
        axios.post('http://localhost:8000/save.php', obj)
        .then(res=> handleStatusDelete(res.data, i))
        .catch(error => {
            console.log(error)
        })
    }

    const closeBox = () => {
        setNameInput(false);
    }
    
    const onSubmitSave = (e) => {
        e.preventDefault();
        const obj = {
            name: saveName,
            email: email,
            task: 'save',
            game: game
        }
        axios.post('http://localhost:8000/save.php', obj)
        .then(res=> handleStatusSave(res.data))
        .catch(error => {
            console.log(error)
        })
    };

    const onSubmitLoad = (e) => {
        e.preventDefault();
        const obj = {
            email:  email,
            task: "load"
        }
        axios.post('http://localhost:8000/save.php', obj)
        .then(res=> handleStatusLoad(res.data))
        .catch(error => {
            console.log(error)
        })
    };

    const hideGames = () => {
        setShowGames(false);
    };

    const toggleName = () => {
        setShowMessage(false);
        setNameInput(true);
    }

    return (
        <div className="register">
            {!user ? 
                <p className="error-message-red">Csak bejelentkezés után lehet játékot menteni!</p> :
                ''}
            {showMessage ? 
                <p className={saved ? "register-message-green" : "register-message-red"}>{saved ? "Sikeres" : "Sikertelen"} mentés</p> :
                ''}
            {error === "exists" ? 
                <p className={"error-message-red"}>Ezt a játékállást már elmentette egyszer!</p> :
                ''}
            {error === "delete" ? 
                <p className={"error-message-red"}>Nem sikerült törölni a mentést!</p> :
                ''}
            {nameInput ? 
                <div className="save-name-block">
                    <div className="login_field savediv">
                        <FontAwesomeIcon icon={faSave} className="register-images"/>
                        <input 
                            type="text"
                            value={saveName} 
                            onChange={onChangeName}
                            placeholder="Név">
                        </input>
                    </div>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#26a269"}} className="save-check" onClick={onSubmitSave}/>
                    <FontAwesomeIcon icon={faX} style={{color: "#a51d2d"}} className="save-x" onClick={closeBox}/>
                </div> :
                ''}
            {!showGames ?
                <div className="save-buttons">
                    <button className={!user ? 'register-button disabled' : 'register-button'} onClick={toggleName}>Játék mentése</button>
                    <button className={!user ? 'register-button disabled' : 'register-button'} onClick={onSubmitLoad}>Játék betöltése</button>
                </div> :
                <>{renderGames()}</>
                }
        </div>
    )
}

export default Save;