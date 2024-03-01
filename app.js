const express=require('express')
const app=express()

// Resgatando requisição
app.get('/books',(req, res)=>{
    //res.send('A simple Node App is' + ' running on this server')
    //res.end()
    res.json(books)
});

// Número da Porta
const PORT=process.env.PORT ||5001;

//Executar o servidor Node
app.listen(PORT, console.log(
    'Server started on port ${PORT}'
));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Simulando um "banco de dados"
let books = [
    {id: 1, title: 'A máquina do Tempo' },
    {id: 2, title: 'O homem invisível' },
    {id: 3, title: '1984' }
];

app.post('/postbooks', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

// Rota para o método PUT
app.put('/update-book/:id', (req,res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const bookToUpdate = books.find(book => book.id === bookId);

    if (bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate);
    }
    else {
        res.status(404).send('Livro não encontrado')
    }
});

// Rota para o método DELETE
app.delete('/delete-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const indexToRemove = books.findIndex(book => bookId === bookId);

    if (indexToRemove !== -1) {
        const removedBook = books.splice(indexToRemove, 1);
        res.json(removedBook[0]);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});
