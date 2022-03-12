// server.js: Memuat kode untuk membuat, mengonfigurasi, dan menjalankan HTTP server menggunakan Hapi.

const Hapi = require("@hapi/hapi");
// 15. gunakan route configuration pada server.
const routes = require("./routes");

const init = async() => {
    const server = Hapi.server({
        port: 5000,
        host: "localhost",

        // 16. Pada web server, kita hanya perlu memberikan nilai header ‘Access-Control-Allow-Origin’ dengan nilai origin luar yang akan mengonsumsi datanya (aplikasi client)
        // kita akan terapkan CORS pada cakupan server agar tak perlu lagi repot-repot mendefinisikan CORS pada setiap route yang ada. (ini gak works)
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    // 15. gunakan route configuration pada server
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();