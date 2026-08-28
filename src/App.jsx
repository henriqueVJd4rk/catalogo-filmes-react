import { useEffect, useState } from "react";

import Header from "./components/Header";
import Add from "./components/Add";
import List from "./components/List";

import "./App.css";

function App() {
  const [filmes, setFilmes] = useState(() => {
    try {
      const filmesSalvos = localStorage.getItem("filmes");

      return filmesSalvos ? JSON.parse(filmesSalvos) : [];
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
      return [];
    }
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [filmeEditando, setFilmeEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("filmes", JSON.stringify(filmes));
  }, [filmes]);

  // ==========================================
  // ADICIONAR / EDITAR FILME
  // ==========================================

  function salvarFilme(dadosFilme) {
    if (filmeEditando) {
      // Atualiza o filme existente
      setFilmes((filmesAtuais) =>
        filmesAtuais.map((filme) =>
          filme.id === filmeEditando.id
            ? {
                ...filme,
                ...dadosFilme,
              }
            : filme
        )
      );
    } else {
      // Cria um novo filme
      const novoFilme = {
        id: Date.now(),
        ...dadosFilme,
      };

      setFilmes((filmesAtuais) => [
        ...filmesAtuais,
        novoFilme,
      ]);
    }

    setFilmeEditando(null);
    setMostrarFormulario(false);
  }

  // ==========================================
  // ABRIR FORMULÁRIO DE EDIÇÃO
  // ==========================================

  function editarFilme(filme) {
    setFilmeEditando(filme);
    setMostrarFormulario(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================
  // EXCLUIR FILME
  // ==========================================

  function excluirFilme(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este filme?"
    );

    if (!confirmar) {
      return;
    }

    setFilmes((filmesAtuais) =>
      filmesAtuais.filter((filme) => filme.id !== id)
    );

    // Se estava editando o filme excluído,
    // fecha o formulário.
    if (filmeEditando?.id === id) {
      setFilmeEditando(null);
      setMostrarFormulario(false);
    }
  }

  // ==========================================
  // CANCELAR FORMULÁRIO
  // ==========================================

  function cancelarFormulario() {
    setFilmeEditando(null);
    setMostrarFormulario(false);
  }

  // ==========================================
  // ABRIR FORMULÁRIO PARA NOVO FILME
  // ==========================================

  function abrirFormulario() {
    setFilmeEditando(null);
    setMostrarFormulario(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="app">
      <Header onAddClick={abrirFormulario} />

      <main className="main">
        {mostrarFormulario && (
          <Add
            filmeEditando={filmeEditando}
            onSave={salvarFilme}
            onCancel={cancelarFormulario}
          />
        )}

        <List
          filmes={filmes}
          onDelete={excluirFilme}
          onEdit={editarFilme}
        />
      </main>
    </div>
  );
}

export default App;