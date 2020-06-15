import React, { useState } from 'react';

import SuccessMessage from '../../components/SuccessMessage';

import './UserForm.scss';

const UserForm = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleAddUser = (e) => {
    e.preventDefault();

    const postObject = JSON.stringify({
      name,
      avatar,
      username,
      email,
    });

    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: postObject
    }).then(() => setSubmit(true));
  };

  return (
    <React.Fragment>
      <section className="profile" data-testid="user-form">
        <div className="container">
          <div className="profile-data">
            <div className="user">
              <div className="user__thumb">
                {avatar
                  ? <img src={avatar} alt="" />
                  : <img src={require('../../assets/img/avatar.jpg')} alt="" />
                }
              </div>

              {name && (
                <p className="user__name">
                  {name}
                  <span>@{username}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="post__form">
        <div className="container">
          <div className="post__form__wrapper">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              placeholder="Seu Nome"
              onChange={(e) => setName(e.target.value)}
            />

            <label>Usuário</label>
            <input
              type="text"
              value={username}
              placeholder="seu_usuario_123"
              onChange={(e) => setUserName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="seu@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Url da Imagem de Perfil (use a url da imagem do Linkedin)</label>
            <input
              type="text"
              placeholder="http://..."
              onChange={(e) => setAvatar(e.target.value)}
            />

            <button
              type="button"
              onClick={(e) => handleAddUser(e)}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </section>

      {submit && (<SuccessMessage />)}
    </React.Fragment>
  );
};

export default UserForm;
