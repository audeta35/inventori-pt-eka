const conn = require('../../../server/config/mysqli');

export default async (req, res) => {
    let query = "SELECT * FROM `users`";
    conn.query(query, [], (err, result, field) => {
        if(!err) {
            res.json(result);
        } else {
            res.json(err);
        }
    })
}