import { useEffect, useState } from "react"; // hooks do React
import styled from "styled-components"; // para estilizar componentes
import api from "../services/api"; // importa sua API
import MovieCard from "../components/MovieCard"; // componente para mostrar cada filme
import MovieModal from "../components/MovieModal"; // componente para mostrar detalhes do filme

const Title = styled.h1`
  color: #e50914; /* vermelho estilo streaming */
  text-align: center;
  margin: 20px 0 30px;
  font-size: 45px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`


function Home() {
  const [filmes, setFilmes] = useState([]); // estado que guarda os filmes
  const [filmeSelecionado, setFilmeSelecionado] = useState(null); // estado para o filme selecionado

  useEffect(() => {
    async function buscarFilmes() {
      const response = await api.get("/movie/popular"); // chama a API
      setFilmes(response.data.results); // salva os filmes no estado
    }

    buscarFilmes(); // executa a função
  }, []); // [] = roda só uma vez quando a tela abre

  return (
    <>
    <Title>MovieFimes 🎬</Title>

    <Container>
      {filmes.map((filme) => (
        <MovieCard
          key={filme.id}
          filme={filme}
          onClick={setFilmeSelecionado}
        />
      ))}

      {/* 👇 AQUI NO FINAL */}
      <MovieModal
        filme={filmeSelecionado}
        fechar={() => setFilmeSelecionado(null)}
      />
    </Container>
    </>
  );
}

export default Home;

