const { nanoid } = require('nanoid')
const books = require('../books')

// Add Book
const addBook = (req, h) => {

    const id = nanoid(16)
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }

    const newBook = {
        id, name, year, author,
        summary, publisher, pageCount, readPage,
        finished, reading, insertedAt, updatedAt
    }

    books.push(newBook)

    const successAddBook = books.filter((book) => book.id === id).length > 0

    if (successAddBook) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan data buku'
    })
    response.code(500)
    return response

}

module.exports = addBook