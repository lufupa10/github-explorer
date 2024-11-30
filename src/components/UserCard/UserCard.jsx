import React from "react";
import "./UserCard.css";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="card">
      <img src={user.avatar_url} alt={user.login} className="card-avatar" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Seguidores: {user.followers}</p>
      <p>Seguindo: {user.following}</p>
      <p>E-mail: {user.email || "Não disponível"}</p>
    </div>
  );
};

export default UserCard;
