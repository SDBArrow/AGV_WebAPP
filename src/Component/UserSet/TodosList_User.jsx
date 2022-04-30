import React from 'react';

function TodosList_User({ todos, setTodos }) {

    return (
        <div>
            {todos.map((todo) => (
                <div className="flex bg-white h-12 mt-8 rounded-2xl py-3" key={todo.id}>
                    <label className="ml-4 basis-3/4">姓名：{todo.firstname}</label>
                </div>
            ))}
        </div>

    );

}

export default TodosList_User;