import styled from 'styled-components';
import { deleteTodo } from '../redux/todoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';

const DivParent = styled.div`
  background-color: #1380ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px auto 0px auto;
  padding: 10px;
  height: 50px;
  width: 90%;
  border-radius: 10px;
`;

const Text = styled.p`
  color: #fff;
`;

const DeleteBtn = styled(AiFillDelete)`
  cursor: pointer;
    font-size: 20px;
`;

const TodoList = ({ search }) => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);

  const FilterTodos = todos.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {FilterTodos.map(({ name, id }) => {
        return (
          <>
            <DivParent key={id}>
              <Text>{name}</Text>
              <DeleteBtn onClick={() => dispatch(deleteTodo(id))}>
                delete
              </DeleteBtn>
            </DivParent>
          </>
        );
      })}
    </>
  );
};

export default TodoList;
