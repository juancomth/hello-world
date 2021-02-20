const { Router } = require('express')
const router = Router()
const { unlink } = require('fs-extra')
const path = require('path')

const Book = require('../models/Book')

router.get('/', async (req, res) => {
    const books = await Book.find()
    res.json(books)
})

router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body
    const imagePath = '/uploads/' + req.file.filename
    const newBook = new Book({ title ,author ,isbn ,imagePath })
    await newBook.save()
    res.json({message: 'libro guardado'})
})

router.delete('/:id', async(req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id)
    unlink(path.resolve('./backend/public' + book.imagePath))
    res.json({message: 'libro eliminado'})
})


module.exports = router