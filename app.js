const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const environment = process.env.ENVIRONMENT_NAME || 'Unknown';
    res.render('index', { environment });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});