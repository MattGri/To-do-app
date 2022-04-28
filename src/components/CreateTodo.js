import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import TodoList from './TodoList';

const Title = styled.h1`
  color: #fff;
  padding-top: 30px;
  text-align: center;
  margin-bottom: 35px;
`;

const FormParent = styled.form`
  background-color: #141623;
  width: 490px;
  margin: 0 auto;
  height: auto;
  padding-bottom: 30px;
  @media (max-width: 500px) {
    width: 90%;
    margin-bottom: 30px;
  }
`;

const Description = styled.input`
  background-color: #141623;
  border: 3px solid #590cfc;
  padding: 15px 0px 15px 15px;
  color: #fff;
  ::placeholder {
    color: #fff;
  }
  :focus {
    outline: none;
  }
`;

const Search = styled.input`
  background-color: #141623;
  border: 3px solid #590cfc;
  padding: 15px 0px 15px 15px;
  color: #fff;
  margin: 0 auto;
  display: block;
  width: 260px;
  ::placeholder {
    color: #fff;
  }
  :focus {
    outline: none;
  }
`;

const AddToDo = styled.button`
  cursor: pointer;
  color: #fff;
  background-color: #590cfc;
  border: none;
  padding: 18px 15px;
  transition: 0.3s;

  :hover {
    background-color: #fff;
    color: #590cfc;
    transition: 0.3s;
  }
`;

const DivParent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CreateTodo = () => {
  useEffect(() => {
    document.title = 'Todo App';
  }, []);

  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const show = (e) => {
    e.preventDefault();

    const create = {
      ...description,
      id: Math.floor(Math.random() * 999),
      name: description,
    };

    const localTodos = JSON.parse(localStorage.getItem('todos'));

    if (!localTodos) {
      localStorage.setItem('todos', JSON.stringify([create]));
    } else {
      const local = [...localTodos, create];
      localStorage.setItem('todos', JSON.stringify(local));
    }

    dispatch(addTodo(create));

    setDescription('');
  };

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    if (localTodos) {
      localTodos.forEach((item) => {
        dispatch(addTodo(item));
      });
    }
  }, []);

  return (
    <>
      <FormParent onSubmit={show}>
        <Title>What's the Plan for Today?</Title>
        <DivParent>
          <Description
            type="text"
            placeholder="Enter Todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <AddToDo>Create</AddToDo>
        </DivParent>
        <Search
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TodoList search={search} />
      </FormParent>
    </>
  );
};

export default CreateTodo;
