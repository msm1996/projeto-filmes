import styled from "styled-components";

const Card = styled.div`
  width: 200px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
  transform: scale(1.08); 
  box-shadow: 0 10px 20px rgba(0,0,0,0.7);
}
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  text-align: center;

`;

function MovieCard({ filme, onClick }) {
    return (
        <Card onClick={() => onClick(filme)}>
            <Image
                src={
                    filme.poster_path
                        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
                        : `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`
                }
                alt={filme.title}
            />
            <Title>{filme.title}</Title>
        </Card>
    );
}

export default MovieCard;