import ButtonComponent from "./ButtonComponent.jsx";

function Header({ onAddClick }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <div className="header-icon">🎬</div>

          <div>
            <h1>Catálogo de Filmes</h1>
            <p>Gerencie seus filmes favoritos</p>
          </div>
        </div>

        <ButtonComponent
          type="button"
          variant="primary"
          onClick={onAddClick}
        >
          + Adicionar
        </ButtonComponent>
      </div>
    </header>
  );
}

export default Header;