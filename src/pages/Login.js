import React, { useState } from 'react';
import './Login.css';

import logo from '../assets/logo.svg';

import api from '../services/api';

//na function pode-se pegar os valores via 
//propriedade 'props' que é padrão do react
//      exemplo: Login(props) onde props.prop1 ou props.prop2 terá os valores desejados
//ou então pegar a propriedade desejada 'desestruturando'
//      exemplo:  Login({ history, match, prop1, prop2 etc})
//o react possui uma propriedade chamada 'history' 
//que vem herdada nas rotas e permite fazer as navegações entre páginas
export default function Login({ history }) {
    //useState recebe dois valores, o get e o set da propriedade.
    const [username, setUsername] = useState('');

    //function deve ser async pois o axios trabalha com asyncs
    //e precisamos aguardar o retorno do serviço 
    //para redicionar para a /devs
    async function handleSubmit(e) {
        //evita o envio do submit do form. não irá renderizar a tela
        e.preventDefault();

        console.log(username);

        //o método 'post' (assim como 'get', 'put', 'delete' etc)
        //foram herdados do axios pela function 'api'
        //só é necessário informar parte da uri, pois a url base já foi
        //definida no 'baseURL' no create a conexão do axios
        const response = await api.post('/devs', {
            username: username
        });
        console.log(response);

        //desestrutrar o json que esta no 'data' e pegar apenas o '_id' do usuário
        const { _id } = response.data;

        history.push(`/devs/${_id}`);
    }

    return (

        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev Logo"></img>
                <input
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

//export default Login;