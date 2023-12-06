const books = require('../books')

// show book
const showBook = (req, h) => {

    const { name, finished, reading } = req.query

    const mappedBook = books.map((value) => ({
        id: value.id,
        name: value.name,
        publisher: value.publisher,
        finished: value.finished,
        reading: value.reading
    }))

    // Filter Name
    if (name) {
        const filterName = mappedBook.filter((book) => {
            return book.name.toLowerCase().includes(name.toLowerCase())
        })

        const response = h.response({
            status: 'success',
            data: {
                books: filterName.map((data) => ({
                    id: data.id,
                    name: data.name,
                    publisher: data.publisher
                }))
            }
        })
        response.code(200)
        return response
    }

    // Filter Finished
    if (finished) {
        const filterFinish = mappedBook.filter((book) => {
            return Boolean(book.finished) == Boolean(Number(finished))
        })

        const response = h.response({
            status: 'success',
            data: {
                books: filterFinish.map((data) => ({
                    id: data.id,
                    name: data.name,
                    publisher: data.publisher
                }))
            }
        })
        response.code(200)
        return response
    }

    // FIlter Reading
    if (reading) {
        const filterReading = mappedBook.filter((book) => {
            return Boolean(book.reading) == Boolean(Number(reading))
        })

        const response = h.response({
            status: 'success',
            data: {
                books: filterReading.map((data) => ({
                    id: data.id,
                    name: data.name,
                    publisher: data.publisher
                }))
            }
        })
        response.code(200)
        return response
    }

    // Show All
    const response = h.response({
        status: 'success',
        data: {
            books: mappedBook.map((data) => ({
                id: data.id,
                name: data.name,
                publisher: data.publisher
            }))
        }
    })
    response.code(200)
    return response

}

// show detailed book by Id
const showDetailedBook = (req, h) => {

    const { bookId } = req.params
    const bookIdExist = books.filter((book) => book.id === bookId).length > 0

    if (bookIdExist) {
        const response = h.response({
            status: 'success',
            data: {
                book: books.filter((book) =>
                    book.id == bookId
                )[0]
            }
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response

}

module.exports = { showBook, showDetailedBook }