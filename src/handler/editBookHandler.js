const books = require('../books')

// edit book
const editBook = (req, h) => {

    const { bookId: id } = req.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload
    const finished = pageCount === readPage
    const updatedAt = new Date().toISOString()
    const bookIndex = books.findIndex((book) => book.id === id)

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }

    if (bookIndex !== -1) {

        books[bookIndex] = {
            ...books[bookIndex], name, year,
            author, summary, publisher,
            pageCount, readPage, reading,
            finished, updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        })
        response.code(200)
        return response

    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response

}

module.exports = editBook