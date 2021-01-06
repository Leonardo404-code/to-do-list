import React from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Tarefas.css';

export default function Tarefas({ tarefas, handleEdit, handleDelete }) {
  return (
    <ul className="tarefas">

      {tarefas.map((tarefa, index) => ( // iterando sobre o array e indice
        <li key={tarefa}>

          {tarefa}
          <div>

            <FaEdit onClick={(e) => handleEdit(e, index)} className="edit" />

            <FaWindowClose onClick={(e) => handleDelete(e, index)} className="delete" />
          </div>
        </li>
      ))}

    </ul>
  );
}

Tarefas.propTypes = {
  tarefas: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
