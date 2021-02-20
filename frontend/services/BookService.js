const { Collection } = require("mongoose")

class BookService {
    constructor(){
        this.URI = 'http://localhost:3000/api/books'
    }

    async getBook(){
        const response = await fetch(this.URI)
        const books = await response.json()
        return books
    }

    async postBook(book){
        const res = await fetch(this.URI, {
            method: 'POST',
            body: book
        })
        await res.json()
    }

    async deleteBook(bookId){
        const res = await fetch(`${this.URI}/${bookId}`, {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'DELETE'
        })
        await res.json()
        
    }
    
}

export default BookService