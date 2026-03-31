import { useEffect, useState } from "react";
import api from "../services/api";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: #111;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 90%;
  color: white;

  display: flex;
  flex-direction: column;
  gap: 15px;

  max-height: 90vh;
  overflow-y: auto;

`;

const Title = styled.h2`
  font-size: 28px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`

const Description = styled.p`
  font-size: 20px;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: red;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
`;

const TrailerButton = styled.button`
  padding: 12px;
  background: #e50914;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
  background: #ff1e1e;
  }
`;


function MovieModal({ filme, fechar }) {
    const [trailer, setTrailer] = useState(null);
    const [mostrarTrailer, setMostrarTrailer] = useState(false);

    useEffect(() => {
        async function buscarTrailer() {
            const response = await api.get(`/movie/${filme.id}/videos`);

            const video = response.data.results.find(
                (video) => video.site === "YouTube" &&
                video.type === "Trailer"&&
                video.official === true
            );
            console.log(response.data.results);

            setTrailer(video);
        }

        if (filme) {
            buscarTrailer();
            setMostrarTrailer(false);
        }
    }, [filme]);

    if (!filme) return null;

    return (
        <Overlay onClick={fechar}>
            <Container onClick={(e) => e.stopPropagation()}>

                {!mostrarTrailer && (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                        alt={filme.title}
                    />
                )}

                <Title>{filme.title}</Title>
                <Description>{filme.overview}</Description>

                {!mostrarTrailer && (
                    <TrailerButton onClick={() => setMostrarTrailer(true)}>
                        🎬 Assistir Trailer
                    </TrailerButton>
                )}
                {mostrarTrailer && trailer && (
                    <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="Trailer"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                )}

                {mostrarTrailer && !trailer && (
                    <p>Trailer não disponível 😢</p>
                )}

                <CloseButton onClick={fechar}>Fechar</CloseButton>
            </Container>
        </Overlay>
    );
}

export default MovieModal;

