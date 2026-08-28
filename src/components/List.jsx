import CardComponent from "./CardComponent.jsx";

function List({ filmes, onEdit, onDelete }) {
  return (
    <section className="list-section">
      <div className="list-header">
        <h2>Meus filmes</h2>

        <span className="movie-count">
          {filmes.length}{" "}
          {filmes.length === 1 ? "filme" : "filmes"}
        </span>
      </div>

      {filmes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎬</div>

          <h3>Nenhum filme cadastrado</h3>

          <p>
            Clique em "Adicionar" para cadastrar seu
            primeiro filme.
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {filmes.map((filme) => (
            <CardComponent
              key={filme.id}
              filme={filme}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default List;