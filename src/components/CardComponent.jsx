import ButtonComponent from "./ButtonComponent";

function CardComponent({
  filme,
  onEdit,
  onDelete,
}) {
  return (
    <article className="movie-card">
      {filme.imagemUrl ? (
        <img
          className="movie-image"
          src={filme.imagemUrl}
          alt={`Capa do filme ${filme.titulo}`}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="movie-placeholder">
          🎬
        </div>
      )}

      <div className="movie-content">
        <h3 className="movie-title">
          {filme.titulo}
        </h3>

        <p className="movie-description">
          {filme.descricao || "Sem descrição cadastrada."}
        </p>

        <div className="movie-actions">
          <ButtonComponent
            type="button"
            variant="edit"
            onClick={() => onEdit(filme)}
          >
            ✏️ Editar
          </ButtonComponent>

          <ButtonComponent
            type="button"
            variant="danger"
            onClick={() => onDelete(filme.id)}
          >
            🗑️ Excluir
          </ButtonComponent>
        </div>
      </div>
    </article>
  );
}

export default CardComponent;