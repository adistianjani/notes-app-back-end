// handler.js: Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.

// const { response } = require("@hapi/hapi/lib/validation");
// 7. import nanoid dari packagenya
const { nanoid } = require("nanoid");

// 10. import array notes
const notes = require("./notes");

// 3. buat fungsi handler untuk route ini.
const addNoteHandler = (request, h) => {
    // 4. tuliskan logika untuk menyimpan catatan dari client ke dalam array notes.
    // client mengirim data notes (title, tags, body) yang akan disimpan dalam bentuk JSON melalui body request. Cara mendapatkan BODY REQUEST menggunakan properti REQUEST.PAYLOAD
    const { title, tags, body } = request.payload;

    // 6. install nanoid dulu, abis tu memanggil method nanoid() dan memberikan parameter number yang merupakan ukuran dari string-nya
    const id = nanoid(16);

    // 8. untuk menambahkan notes baru, nilai kedua properti sama: new Date().toISOString();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // 9. masukan nilai2 tsb ke dalam array notes menggunakan metode push()
    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };
    notes.push(newNote);

    // 11. bagaimana menentukan apakah newNote sudah masuk ke dalam array notes? Mudah saja! Kita bisa memanfaatkan method filter() berdasarkan id catatan untuk mengetahuinya.
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    // 12. kita gunakan isSuccess untuk menentukan respons yang diberikan server. Jika isSuccess bernilai true, silakan beri respons berhasil. Jika false, silakan beri respons gagal.
    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Catatan berhasil ditambahkan",
            data: {
                noteId: id,
            },
        });

        response.code(201);
        return response;
    }

    // 13. Jika false, silakan beri respons gagal.
    const response = h.response({
        status: "fail",
        message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
};

// 18. buat fungsi handler pada berkas handler.js. Buat fungsi dengan nama getAllNotesHandler dan kembalikan data dengan nilai notes di dalamnya.
const getAllNotesHandler = () => ({
    status: "success",
    data: {
        notes,
    },
});

// 21.  buat fungsi dengan nama getNoteByIdHandler.
const getNoteByIdHandler = (request, h) => {
    // 22. Di dalam fungsi ini kita harus mengembalikan objek catatan secara spesifik berdasarkan id yang digunakan oleh path parameter. Pertama, kita dapatkan dulu nilai id dari request.params.
    const { id } = request.params;

    // 23. dapatkan objek note dengan id tersebut dari objek array notes. Manfaatkan method array filter() untuk mendapatkan objeknya.
    const note = notes.filter((n) => n.id === id)[0];

    // 24. Kita kembalikan fungsi handler dengan data beserta objek note di dalamnya. Namun, sebelum itu, pastikan dulu objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal.
    if (note !== undefined) {
        return {
            status: "success",
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: "fail",
        message: "Catatan tidak ditemukan",
    });
    response.code(404);
    return response;
};

// 27. buat fungsi handler EDIT NOTES. Kita beri nama fungsi tersebut dengan editNoteByIdHandler
const editNoteByIdHandler = (request, h) => {
    // 28. Catatan yang diubah akan diterapkan sesuai dengan id yang digunakan pada route parameter. Jadi, kita perlu mendapatkan nilai id-nya terlebih dahulu.
    const { id } = request.params;

    // 29. kita dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.
    const { title, tags, body } = request.payload;

    // 30. perlu perbarui juga nilai dari properti updatedAt. Jadi, dapatkan nilai terbaru dengan menggunakan new Date().toISOString()
    const updatedAt = new Date().toISOString();

    // 31. saatnya mengubah catatan lama dengan data terbaru, dapatkan dulu index array pada objek catatan sesuai id yang ditentukan. Untuk melakukannya, gunakanlah method array findIndex()
    const index = notes.findIndex((note) => note.id === id);

    // 32. Bila note dengan id yang dicari ditemukan, index akan bernilai array index dari objek catatan yang dicari. Namun, bila tidak ditemukan, index akan bernilai -1. Jadi, kita bisa menentukan gagal atau tidaknya permintaan dari nilai index menggunakan if else.
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: "success",
            message: "Catatan berhasil diperbarui",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui catatan. Id tidak ditemukan",
    });
    response.code(404);
    return response;
    // jangan lupa di expor, terus import di routes.js
};

// 34. buat fungsi handler untuk HAPUS NOTE dengan nama deleteNoteByIdHandler, kita akan memanfaatkan index untuk menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
    // 35. dapatkan dulu nilai id yang dikirim melalui path parameter
    const { id } = request.params;

    // 36. dapatkan index dari objek catatan sesuai dengan id yang didapat.
    const index = notes.findIndex((note) => note.id === id);

    // 37.Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 bila hendak menghapus catatan. Nah, untuk menghapus data pada array berdasarkan index, gunakan method array splice().
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Catatan berhasil dihapus",
        });
        response.code(200);
        return response;
    }

    // 38. Bila index bernilai -1, kembalikan handler dengan respons gagal
    const response = h.response({
        status: "fail",
        message: "Catatan gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

// 19. ekspor nilai getAllNotesHandler agar dapat digunakan di routes.js.
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };