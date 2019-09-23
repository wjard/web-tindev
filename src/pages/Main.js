//useEffect = são como gatilhos disparados
// sempre que uma condição é satisfeita, toda vez que o valor de um parâmetro é modificado
// quando não se informa nada como condicão, o useEffect é dispardo apenas um vez
//no carregamento da página
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

import api from "../services/api";

import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import itsamatch from "../assets/itsamatch.png";

//parte do websocket
import socket from "socket.io-client";

//sobre propriedades da rota ver mais no Login.js
//match = contém dados sobre a rota, parametros etc
export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: {
          user: match.params.id
        }
      });

      console.log(response.data);
      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const con = socket("https://api-tindev.azurewebsites.net", {
      query: { user: match.params.id }
    });

    con.on("match", result => {
      console.log(result);
      setMatchDev(result);
    });

    /*
        //Escutar mensagens do backend
        con.on('e ai?', result=>{
            console.log(`Backend message: ${JSON.stringify(result)}`);
        });
        //teste de envio de menagem para o backend
        setTimeout(() => {
            con.emit('opa', {
                message: 'Opa! Beleza?!'
            })
        }, 2000);
        */
  }, [match.params.id]);

  async function handleLike(id) {
    console.log(`like ${id}`);
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });

    //para atualizar a pagina apos a ação de like ou dislike
    //será modificado o conteudo da 'users', utilizando o 'setUsers'
    //é necessário alterar os dados via 'setUsers' para que haja
    // a alteração do estado do controle
    setUsers(users.filter(u => u._id !== id));
  }

  async function handleDislike(id) {
    console.log(`dislike ${id}`);
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    });

    //para atualizar a pagina apos a ação de like ou dislike
    //será modificado o conteudo da 'users', utilizando o 'setUsers'
    //é necessário alterar os dados via 'setUsers' para que haja
    // a alteração do estado do controle
    setUsers(users.filter(u => u._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev Logo"></img>
      </Link>
      {users && users.length > 0 ? (
        <ul>
          {/* () permitem renderizar os doms, 
                                ao inves de colocar um 'return' na 'function' */
          users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name}></img>
              <footer>
                <strong>{user.name}</strong>
                <p>
                  <small>{user.user}</small>
                </p>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike"></img>
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like"></img>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :[</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match"></img>
          <img className="avatar" src={matchDev.avatar} alt=""></img>
          <strong>{matchDev.name}</strong>
          <small>{matchDev.username}</small>
          <p>{matchDev.bio}</p>
          <button onClick={() => setMatchDev(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
