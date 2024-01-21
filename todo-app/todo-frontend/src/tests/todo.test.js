import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Todo from '../Todos/Todo'
import { expect, jest, test } from '@jest/globals';

test('renders content of todo', async() => {
    
    const todo = {
        "text": "Learn about containers",
        "done": false,
    }

    const deleteTodo = jest.fn();
    const completeTodo = jest.fn();

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
    const element = screen.getByText(todo.text);
    expect(element).toBeDefined();

    
    if (todo.done) {
        const doneElement = screen.getByText("This todo is done");
        expect(doneElement).toBeDefined();
    } else {
        const notDoneElement = screen.getByText("This todo is not done");
        expect(notDoneElement).toBeDefined();

        const setDoneBtn = screen.getByText("Set as done")
        expect(setDoneBtn).toBeDefined();
        await setDoneBtn.click();
        expect(completeTodo).toHaveBeenCalled();
    }

    const dltBtn = screen.getByText("Delete");
    expect(dltBtn).toBeDefined();
    await dltBtn.click();
    expect(deleteTodo).toHaveBeenCalled();

})