import http from 'http';

const PORT = process.env.PORT || 5000; 
const server = http.createServer((request, responce) => {

});
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
});