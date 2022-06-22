import * as SQLite from 'expo-sqlite';
import Todo from '../models/Todo';

const db = SQLite.openDatabase('todosdb.db');


export const initDB = () => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {

            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS todos (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    completed BOOLEAN NOT NULL
                )`, [],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })

    })
}

export const getTableInfo = () => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {

            transaction.executeSql(
                `pragma table_info('todos')`, [],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })

    })
}

export const insert = (todo) => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `INSERT INTO todos (title, completed)
                VALUES (?, ?)`, [todo.title, todo.isCompleted],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })

    })
}

export const findAll = () => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `SELECT * FROM todos`, [],
                (tx, res) => resolve(
                    res.rows._array
                        .map(todo => new Todo(todo.id, todo.title, todo.completed === 1))
                ),
                (tx, err) => reject(err)
            )
        })

    })
}

export const deleteById = (id) => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `DELETE FROM todos WHERE id = ?`, [id],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })
    })

}

export const updateById = (id, updated_title, updated_isCompleted) => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `UPDATE todos
                SET title = ?,
                    completed = ?
                WHERE 
                    id = ?`, [updated_title, updated_isCompleted, id],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })
    })

}

/*export const updateById = (id, updated_title, updated_isCompleted) => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `UPDATE todos
                SET title = ${updated_title},
                    completed = ${updated_isCompleted}
                WHERE 
                    id = ${id}`,
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })
    })

}*/