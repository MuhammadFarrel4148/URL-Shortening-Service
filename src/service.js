const { nanoid } = require('nanoid');
const db = require('./database');

const createShortURL = async(request, response) => {
    const { url } = request.body;

    try {
        if(!url) {
            return response.status(400).json({
                status: 'fail',
                message: 'input not valid, try again'
            });
        };
    
        const id = nanoid(15);
        const originalURL = url;
        const shortURL = nanoid(5);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const accessCount = 0;
    
        const [createURL] = await db.query(`INSERT INTO shorturl(id, originalURL, shortURL, createdAt, updatedAt, accessCount) VALUES(?, ?, ?, ?, ?, ?)`, [id, originalURL, shortURL, createdAt, updatedAt, accessCount]);
    
        if(createURL.affectedRows === 1) {
            return response.status(201).json({
                status: 'success',
                result: {
                    id, originalURL, shortURL, createdAt, updatedAt
                }
            });
        };
    
        return response.status(400).json({
            status: 'fail',
            message: 'cant create short URL, try again'
        });

    } catch(error) {
        return response.status(500).json({
            status: 'fail',
            message: `${error}`
        });
    };
};

const retrieveShortURL = async(request, response) => {
    const { shortURLParams } = request.params;

    try {
        if(!shortURLParams) {
            return response.status(400).json({
                status: 'fail',
                message: 'input not valid, try again'
            });
        };

        const [existShortURL] = await db.query(`SELECT * FROM shorturl WHERE shorturl = ?`, [shortURLParams]);
        await db.query(`UPDATE shorturl SET accessCount = accessCount + 1 WHERE shorturl = ?`, [shortURLParams]);

        if(existShortURL.length > 0) {
            return response.status(200).json({
                status: 'success',
                result: {
                    id: existShortURL[0].id, 
                    originalURL: existShortURL[0].originalURL, 
                    shortURL: existShortURL[0].shortURL, 
                    createdAt: existShortURL[0].createdAt, 
                    updatedAt: existShortURL[0].updatedAt
                }
            });
        };

    } catch(error) {
        return response.status(500).json({
            status: 'fail',
            message: `${error}`
        });
    };
};

const updateShortURL = async(request, response) => {
    const { shortURLParams } = request.params;
    const { originalURLBody } = request.body;

    try {
        if(!shortURLParams || !originalURLBody) {
            return response.status(400).json({
                status: 'fail',
                message: 'input not valid, try again'
            });
        };
    
        const [existShortURL] = await db.query(`SELECT * FROM shorturl WHERE shorturl = ?`, [shortURLParams]);

        if(existShortURL.length > 0) {
            const updatedURL = new Date().toISOString();
            const [updateOriginalURL] = await db.query(`UPDATE shorturl SET originalURL = ?, updatedAt = ? WHERE shortURL = ?`, [originalURLBody, updatedURL, existShortURL[0].shortURL]);

            if(updateOriginalURL.affectedRows === 1) {
                return response.status(201).json({
                    status: 'success',
                    result: {
                        id: existShortURL[0].id,
                        originalURL: existShortURL[0].originalURL,
                        shortURL: existShortURL[0].shortURL,
                        createdAt: existShortURL[0].createdAt,
                        updatedAt: existShortURL[0].updatedAt
                    }
                });
            };

            return response.status(400).json({
                status: 'fail',
                message: 'cant update URL, try again'
            });
        };

    } catch(error) {
        return response.status(500).json({
            status: 'fail',
            message: `${error}`
        });
    };
};

const deleteShortURL = async(request, response) => {
    const { shortURLParams } = request.params;

    try {
        if(!shortURLParams) {
            return response.status(400).json({
                status: 'fail',
                message: 'input not valid, try again'
            });
        };

        const [existShortURL] = await db.query(`SELECT * FROM shorturl WHERE shorturl = ?`, [shortURLParams]);

        if(existShortURL.length > 0) {
            const [deleteShortURL] = await db.query(`DELETE FROM shorturl WHERE shorturl = ?`, [existShortURL[0].shortURL]);

            if(deleteShortURL.affectedRows === 1) {
                return response.status(201).json({
                    status: 'success',
                    message: 'short URL berhasil dihapus'
                });
            };
        };

        return response.status(404).json({
            status: 'fail',
            message: 'short URL not found, try again'
        });

    } catch(error) {
        console.log(error);
        return response.status(500).json({
            status: 'fail',
            message: `${error}`
        });
    };
};  

module.exports = { createShortURL, retrieveShortURL, updateShortURL, deleteShortURL };