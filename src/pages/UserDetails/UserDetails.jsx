import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import UserCard from "../../components/UserCard/UserCard";

import "./UserDetails.css";

function UserDetails() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await api.get(`/users/${username}`);
        const userRepos = await api.get(`/users/${username}/repos`);

        setUser(userDetails.data);
        setRepos(
          userRepos.data.sort((a, b) => b.stargazers_count - a.stargazers_count)
        );
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Usuário não encontrado");
        } else {
          setError("Ocorreu um erro ao buscar os dados");
        }
        setUser(null);
        setRepos([]);
      }
    };

    fetchData();
  }, [username]);

  const toggleSort = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
    setRepos(
      [...repos].sort((a, b) =>
        newSortOrder === "desc"
          ? b.stargazers_count - a.stargazers_count
          : a.stargazers_count - b.stargazers_count
      )
    );
  };

  if (error) {
    return (
      <div className="container user-details">
        <p className="error-message">{error}</p>
        <Link to="/" className="back-link">
          Voltar para pesquisa
        </Link>
      </div>
    );
  }

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="container user-details">
      <UserCard user={user} /> 

      {repos.length && (
        <Button onClick={toggleSort}>
          Alterar Ordem (
          {sortOrder === "desc" ? "Maior para Menor" : "Menor para Maior"})
        </Button>
      )}

      <Link to={`/`} className="back-link">
        Voltar para pesquisa
      </Link>

      {repos.length === 0 ? (
        <p className="no-repos-message">Este usuário não tem repositórios!</p>
      ) : (
        <ul className="repos">
          {repos.map((repo) => (
            <li key={repo.id} className="repo-item">
              <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
                {repo.name}
              </Link>{" "}
              - {repo.stargazers_count} ⭐
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDetails;
