# URL Shortening Service
API yang dibangun menggunakan RESTful API untuk melakukan shorten kepada long URL.

![Cara Kerja][url-shorten-architecture.png]

## Fitur Utama
- **Dapat melakukan short URL**
- **Dapat mengambil original URL dari short URL**
- **Melakukan update kepada short URL**
- **Dapat mengambil statistik dari short URL**

## Teknologi yang Digunakan
- **Node.js**: Runtime javascript
- **MySQL**: Database relasional
- **Postman**: Testing dan dokumentasi
- **Dotenv**: Mengelola environment variables
- **Docker** (opsional): containerization 
- **GitHub**: Version control dan menyimpan proyek
- **Express**: Framework backend

## Struktur Database
### Table shorturl
```json
{
    "id": "string(15) PRIMARY KEY",
    "originalURL": "string(255)",
    "shortURL": "string(6)",
    "createdAt": "TIMESTAMP",
    "updatedAt": "TIMESTAMP",
    "accessCount": "int"
}
```

## Instalasi (Coming Soon)
1. 

## Endpoint
| HTTP Method | Endpoint                | Deskripsi                                                          |
|-------------|-------------------------|--------------------------------------------------------------------|
| POST        | /shorten                | membuat short URL baru                                             |
| GET         | /shorten/:shortURL      | mengambil original URL berdasarkan short URL                       |
| PUT         | /shorten/:shortURL      | melakukan update original URL berdasarkan short URL                |
| DELETE      | /shorten/:shortURL      | melakukan update delete pada short URL                             |
| GET         | /shorten/:shortURL/stats| mengambil statistik dari short URL                                 |

## Penulis
- **Muhammad Farrel Putra Pambudi**
    - ([GitHub](https://github.com/MuhammadFarrel4148))
    - ([LinkedIn](https://www.linkedin.com/in/farrelputrapambudi))

## Reference Project
- ([roadmap.sh](https://roadmap.sh/projects/url-shortening-service))