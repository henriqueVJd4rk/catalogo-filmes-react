import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";

function Add({ filmeEditando, onSave, onCancel }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  // ==========================================
  // PREENCHER FORMULÁRIO AO EDITAR
  // ==========================================

  useEffect(() => {
    if (filmeEditando) {
      setTitulo(filmeEditando.titulo || "");
      setDescricao(filmeEditando.descricao || "");
      setImagemUrl(filmeEditando.imagemUrl || "");
    } else {
      setTitulo("");
      setDescricao("");
      setImagemUrl("");
    }
  }, [filmeEditando]);

  // ==========================================
  // SUBMIT
  // ==========================================

  function handleSubmit(event) {
    event.preventDefault();

    const tituloLimpo = titulo.trim();
    const descricaoLimpa = descricao.trim();
    const imagemUrlLimpa = imagemUrl.trim();

    if (!tituloLimpo) {
      alert("Digite o título do filme.");
      return;
    }

    onSave({
      titulo: tituloLimpo,
      descricao: descricaoLimpa,
      imagemUrl: imagemUrlLimpa,
    });
  }

  const modoEdicao = Boolean(filmeEditando);

  return (
    <section className="form-container">
      <div className="form-header">
        <h2>
          {modoEdicao ? "Editar filme" : "Adicionar novo filme"}
        </h2>

        <p>
          {modoEdicao
            ? "Altere as informações do filme e salve as mudanças."
            : "Preencha as informações abaixo para cadastrar um filme."}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* TÍTULO */}
        <div className="form-group">
          <label htmlFor="titulo">
            Título do filme
          </label>

          <input
            id="titulo"
            type="text"
            placeholder="Ex.: Interestelar"
            value={titulo}
            onChange={(event) =>
              setTitulo(event.target.value)
            }
          />
        </div>

        {/* DESCRIÇÃO */}
        <div className="form-group">
          <label htmlFor="descricao">
            Descrição
          </label>

          <textarea
            id="descricao"
            placeholder="Digite uma descrição para o filme..."
            value={descricao}
            onChange={(event) =>
              setDescricao(event.target.value)
            }
          />
        </div>

        {/* URL DA IMAGEM */}
        <div className="form-group">
          <label htmlFor="imagemUrl">
            URL da Imagem
          </label>

          <input
            id="imagemUrl"
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={imagemUrl}
            onChange={(event) =>
              setImagemUrl(event.target.value)
            }
          />
        </div>

        {/* BOTÕES */}
        <div className="form-actions">
          <ButtonComponent
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </ButtonComponent>

          <ButtonComponent
            type="submit"
            variant="primary"
          >
            {modoEdicao ? "Salvar alterações" : "Salvar filme"}
          </ButtonComponent>
        </div>
      </form>
    </section>
  );
}

export default Add;