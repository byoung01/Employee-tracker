SELECT book_name, price
FROM favorite_books
RIGHT JOIN book_prices ON favorite_books.book_price = book_prices.id;
