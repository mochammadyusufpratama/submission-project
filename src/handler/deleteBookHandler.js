const books = require('../books')

// delete book
const deleteBook = (req, h) => {

    const { bookId } = req.params
    const bookIndex = books.findIndex((book) => book.id === bookId)

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response

}

module.exports = deleteBook