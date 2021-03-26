import {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect as _dialect,
  pool as _pool
} from "../config/db.config.js";
import Sequelize from "sequelize";
import {
  category,
  customer,
  address,
  orders,
  products,
  reviews,
  cart,
  cartItem,
} from "./model.js";
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  // operatorsAliases: false,
  // storage:'../../data/db',
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customer = sequelize.define("customer", customer);
db.address = sequelize.define("address", address);
db.category = sequelize.define("category", category);
db.orders = sequelize.define("orders", orders);
db.products = sequelize.define("products", products);
db.reviews = sequelize.define("reviews", reviews);
db.cart = sequelize.define("cart", cart);
db.cartItem = sequelize.define("cartItem", cartItem);

db.customer.hasMany(db.address);
db.address.belongsTo(db.customer);

db.products.hasMany(db.reviews);
db.reviews.belongsTo(db.products);

db.customer.hasMany(db.reviews);
db.reviews.belongsTo(db.customer);

db.customer.hasMany(db.orders);
db.orders.belongsTo(db.customer);

db.products.belongsToMany(db.category, {
  through: 'ProductsCategory'
});
db.category.belongsToMany(db.products, {
  through: 'ProductsCategory'
});

db.customer.hasMany(db.cart);
db.cart.belongsTo(db.customer);

db.products.belongsToMany(db.cart, {
  through: db.cartItem
});
db.cart.belongsToMany(db.products, {
  through: db.cartItem
});

sequelize.sync({
  alter: true
  // force: true
}).then(() => {
  console.log('db created table');
  console.log("");
  console.log("***************************************************");
}).catch((err) => {
  console.log(err);
  console.log("");
});

export default db;