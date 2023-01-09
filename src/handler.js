/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(8);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  if (
    (name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading !== undefined)
  ) {
    books.push(newBooks);
  } else {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }

  const isSuccess = books.filter((result) => result.id === id).length > 0;
  if (!isSuccess) {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });

  response.code(201);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const params = request.query;
  const nameQuery = params.name;
  const readingQuery = params.reading;
  const finishedQuery = params.finished;

  if (nameQuery !== undefined) {
    const result = books.filter((item) => item.name.toLowerCase().includes(nameQuery.toLowerCase()));
    const searchData = [];
    result.map((value) => {
      const { name, publisher, id } = value;
      searchData.push({
        id,
        name,
        publisher,
      });
      return 0;
    });
    const response = h.response({
      status: 'success',
      data: {
        books: searchData,
      },
    });
    response.code(200);
    return response;
  }

  if (readingQuery == 0) {
    const notReading = books.filter((book) => !book.reading);
    const dataWithoutReading = [];

    notReading.map((value) => {
      const { id, name, publisher } = value;
      dataWithoutReading.push({
        id,
        name,
        publisher,
      });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: dataWithoutReading,
      },
    });
    response.code(200);
    return response;
  }

  if (readingQuery == 1) {
    const notReading = books.filter((book) => book.reading);
    const dataReading = [];

    notReading.map((value) => {
      const { id, name, publisher } = value;
      dataReading.push({
        id,
        name,
        publisher,
      });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: dataReading,
      },
    });
    response.code(200);
    return response;
  }

  if (finishedQuery == 0) {
    const notFinished = books.filter((book) => !book.finished);
    const dataWithoutFinished = [];

    notFinished.map((value) => {
      const { id, name, publisher } = value;
      dataWithoutFinished.push({
        id,
        name,
        publisher,
      });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: dataWithoutFinished,
      },
    });
    response.code(200);
    return response;
  }

  if (finishedQuery == 1) {
    const notFinished = books.filter((book) => book.finished);
    const dataFinished = [];

    notFinished.map((value) => {
      const { id, name, publisher } = value;
      dataFinished.push({
        id,
        name,
        publisher,
      });
    });

    const response = h.response({
      status: 'success',
      data: {
        books: dataFinished,
      },
    });
    response.code(200);
    return response;
  }

  const getAllBook = [];
  books.map((value) => {
    const { id, name, publisher } = value;
    getAllBook.push({
      id,
      name,
      publisher,
    });
    return 0;
  });

  const response = h.response({
    status: 'success',
    data: {
      books: getAllBook,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((result) => result.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((note) => note.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
