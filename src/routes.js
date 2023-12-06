const addBook = require('./handler/addBookHandler'),
    { showBook, showDetailedBook } = require('./handler/showBookHandler'),
    editBook = require('./handler/editBookHandler'),
    deleteBook = require('./handler/deleteBookHandler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook
    },
    {
        method: 'GET',
        path: '/books',
        handler: showBook
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: showDetailedBook
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBook
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook
    }
]

module.exports = routes;