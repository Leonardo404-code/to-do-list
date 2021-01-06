import React, { Component } from 'react';

import Form from './Form';
import Tarefas from './Tarefas';

// importando os icones do lado das tarefas

// Importando o CSS para a pag
import './Main.css';

// a classe padrão de toda a pág, extendendo as propriedades de componentes
export default class Main extends Component {
  // todos os estados da pág
  state = {
    novaTarefa: '', // tarefa que será adcionada
    tarefas: [], // lista em que irá ficar todas as tarefas
    index: -1, // indice que aparece que não aponta para lugar algum
  }

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  // segurando o submit
  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state; // pegando o state das tarefas e do index
    let { novaTarefa } = this.state; // pegando o state do novaTarefa
    novaTarefa = novaTarefa.trim(); // cortando todo espaço antes e depois do novaTarefa

    // se o "novaTarefa" for encontrado no "Tarefa", não adiciona nada a lista
    if (tarefas.indexOf(novaTarefa) !== -1) return;

    // Copiando as tarefas pra uma nova constante chamada: novasTarefas
    const novasTarefas = [...tarefas];

    if (index === -1) { // se o index que vai ser o campo de adicionar estiver sem nenhuma string
      this.setState({
        tarefas: [...novasTarefas, novaTarefa], // novasTarefas a novaTarefa
        novaTarefa: '', // fica sem nada depois
      });
    } else { // ao contrario, continue o mesmo
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas], // e o novo estado será as tarefas com o "novasTarefas"
        index: -1, // e o index volta a ser -1
      });
    }
  }

  // capturando a mudança
  handleChange = (e) => {
    this.setState(
      {
        novaTarefa: e.target.value, // capturando o valor dentro do input
      },
    );
  }

  // editando o item
  handleEdit = (e, index) => { // pegando o evento e o indice
    const { tarefas } = this.state; // capturando as tarefas

    /* o "novaTarefa" (input) vai receber o "tarefa" e ao reescrever e apertar enter,
     vai mudar esta tarefa */
    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  }

  // deletando os itens
  handleDelete = (e, index) => { // capturando o indice
    const { tarefas } = this.state; // criando constante com o array "tarefas"
    // criando constante com o nome "novasTarefas" que recebe o array "tarefas"
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1); // excluindo o valor selecioando nos novasTarefas

    this.setState({
      tarefas: [...novasTarefas], // Setando o estado atual das "tarefas"
    });
  }

  // renderizando a pág
  render() {
    // setando o estado criado lá emcima na pág
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={this.novaTarefa}
        />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
