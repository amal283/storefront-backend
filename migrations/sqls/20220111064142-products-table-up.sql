CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price numeric(7,2) NOT NULL,
    category VARCHAR(100)
);