// Memuat kode konfigurasi routing server, seperti menentukan path, method, dan handler yang digunakan.

// 14. import fungsi addNoteHandler, getAllnoteshandler pada berkas routes.js.
const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

// 1. buat konfig routes agar web server dapat menyimpan catatan, ia perlu menyediakan route dengan path ‘/notes’ dan method ‘POST’.
const routes = [{
        method: "POST",
        path: "/notes",
        // 13. gunakan fungsi handler ini pada konfigurasi route.
        handler: addNoteHandler,

        // CORS dapat ditetapkan pada spesifik route dengan menambahkan properti options.cors di konfigurasi route.
        options: {
            cors: {
                origin: ["*"],
            },
        },
    },
    {
        // 17. buat konfigurasi route terlebih dahulu pada berkas routes.js. Tetapkan path dengan nilai ‘/notes’ dan method dengan nilai ‘GET’
        method: "GET",
        path: "/notes",
        // 20. fungsi handler tersebut pada konfigurasi route
        handler: getAllNotesHandler,
    },
    // 25. tambahkan route dengan path ‘/notes/{id}’ dan method ‘GET’. Untuk handler, isi dengan fungsi kosong dulu.
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getNoteByIdHandler,
    },

    // 26. Ketika melakukan perubahan, client akan mengirimkan permintaan ke route ‘/notes/{id}’ dengan method ‘PUT’ dan membawa objek catatan terbaru pada body request.
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: editNoteByIdHandler,
    },
    // 33. Tambahkan konfigurasi route dengan nilai path ‘/notes/{id}’, method ‘DELETE
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;