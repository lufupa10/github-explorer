import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";
import { FaStar, FaCodeBranch, FaLaptopCode } from "react-icons/fa";
import "./RepoDetails.css";
import Button from "../../components/Button/Button";

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

  function handleRepoDetails() {
    window.open(repoDetails.html_url, "_blank");
  }

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

      <Button onClick={handleRepoDetails} className="repo-url">
        Visite o repositório no GitHub
      </Button>

      <Link to={`/user/${owner}`} className="back-link">
        Voltar aos repositórios
      </Link>
    </div>
  );
}

export default RepoDetails;
