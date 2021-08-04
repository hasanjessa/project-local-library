const { findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const notReturned = books.filter((book) => book.borrows.some((borrow)=> borrow.returned === false ));
  return notReturned.length;
}


function getMostCommonGenres(books){
  // to knock off rubric check list functions
  let result = [];
  const genres = books.map((book)=> book.genre);
  result = genres.reduce((acc,theGenre)=>{ acc.some((resultGenere) => resultGenere.name === theGenre)? acc.find((resultGenre) => resultGenre.name === theGenre).count+=1 : acc.push({"name": theGenre, count:1 });
    return acc;
  },[]);  
  result.sort((item , item2) => item2.count - item.count )
  console.log(result);
  result.length = 5;
  return result;
}


function getMostPopularBooks(books) {
  const result = [];
  for(let book of books)
  {
    result.push({"name": book.title , "count": book.borrows.length});
  }
  result.sort((item , item2) => item2.count - item.count );
  result.length = 5;
  console.log(result);
  return result;
}


function getAuthorNameById(authors,id){
  const theAuthor = findAuthorById(authors,id);
  return (`${theAuthor.name.first} ${theAuthor.name.last}`);
}


function getMostPopularAuthors(books, authors){   
  const result =[];
  for(let book of books)
  {
    const theAuthor = result.find((author )=> getAuthorNameById(authors,book.authorId) === author.name )
   
    theAuthor ? theAuthor.count += book.borrows.length : result.push({"name": getAuthorNameById(authors,book.authorId), "count": book.borrows.length });
  }
  result.sort((item1 , item2) => item2.count - item1.count );
  result.length = 5;
  console.log(result);
  return result;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
