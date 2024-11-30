import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";
import { FaStar, FaCodeBranch, FaLaptopCode } from "react-icons/fa";
import "./RepoDetails.css";

function RepoDetails() {
  const { owner, repo } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      const response = await api.get(`/repos/${owner}/${repo}`);
      setRepoDetails(response.data);
    };

    fetchRepoDetails();
  }, [owner, repo]);

  if (!repoDetails) {
    return <Spinner />;
  }

  return (
    <div className="container repo-details">
      <h1>{repoDetails.name}</h1>
      <ul>
        <li>
          <FaStar size={20} color="#f1c40f" /> Estrelas:{" "}
          {repoDetails.stargazers_count}
        </li>
        <li>
          <FaCodeBranch size={20} color="#3498db" /> Forks:{" "}
          {repoDetails.forks_count}
        </li>
        <li>
          <FaLaptopCode size={20} color="#2ecc71" /> Linguagem:{" "}
          {repoDetails.language || "Não especificada"}
        </li>
      </ul>
      <a
        href={repoDetails.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        Visite o repositório no GitHub
      </a>
      <Link to={`/user/${owner}`} className="back-link">
        Voltar aos repositórios
      </Link>
    </div>
  );
}

export default RepoDetails;
