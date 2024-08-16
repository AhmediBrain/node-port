const app = require('./src/app');

const PORT = 8030;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});