import server from '../config/server';

const PORT = process.env.PORT || 4000;
server.get('/status', (req, res) => {
    res.status(200).send('ok');
});

server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`app running on port ${PORT}`);
});
