const express = require("express");
const app = express();
const {
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Coupon,
    connection,
} = require("./db");


// Import routes
const orderRoute = require('./routes/order');
const orderItemRoute = require('./routes/orderItem');
const authRoute = require('./routes/auth');

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route middlewares
app.use('/api', orderRoute);
app.use('/api', orderItemRoute);
app.use('/api', authRoute);







// --- Users ---
app.get("/api/users", async (req, res) => {
    const dataArray = await User.findAll();
    res.send(dataArray);
});

app.post('/api/user', async (req, res) => {
    const data = req.body;
    data.role = parseInt(data.role);
    if (!data.username || !data.password || !data.role) {
        res.status(400).send({ error: "Invalid data for new user" });
        return;
    }
    try {
        await User.create(data);
        const dataArray = await User.findAll();
        res.send(dataArray);
    } catch (e) {
        console.log("Error: ", e);
    }
});

app.get("/api/user/:id", async (req, res) => {
    try {
        const data = await User.findOne({ where: { id: req.params.id } });
        if (data == null) {
            res.status(400).send({ msg: `There is no user with a specified id = ${req.params.id}` });
            return;
        }
        res.send(data);
    } catch (e) {
        console.log("ERROR: Wrong id for user");
    }
});

app.delete("/api/user/:id", async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.send({ msg: `User with id ${req.params.id} deleted` });
    } catch (e) {
        console.log("ERROR: Wrong id for user");
    }
});

app.put("/api/user/:id", async (req, res) => {
    const id = req.params.id;
    const dataFromReq = req.body;

    const dataFromDb = await User.findOne({ where: { id: req.params.id } });
    if (dataFromDb == null) {
        res.status(400).send({ msg: `There is no user with a specified id = ${req.params.id}` });
        return;
    }

    await User.update({
        name: dataFromReq.name || dataFromDb.name,
        lastName: dataFromReq.lastName || dataFromDb.lastName,
        address: dataFromReq.address || dataFromDb.address,
        username: dataFromReq.username || dataFromDb.username,
        password: dataFromReq.password || dataFromDb.password,
        role: parseInt(dataFromReq.role) || dataFromDb.role
    },
        {
            where: { id: id }
        });
    res.send({ msg: `User with the id = ${id} updated` });
});

// --- Categories ---
app.get("/api/categories", async (req, res) => {
    const dataArray = await Category.findAll();
    res.send(dataArray);
});

app.post('/api/category', async (req, res) => {
    const data = req.body;
    if (!data.name || !data.description) {
        res.status(400).send({ error: "Invalid data for new category" });
        return;
    }
    try {
        await Category.create(data);
        const dataArray = await Category.findAll();
        res.send(dataArray);
    } catch (e) {
        console.log("Error: ", e);
    }
});

app.get("/api/category/:id", async (req, res) => {
    try {
        const data = await Category.findOne({ where: { id: req.params.id } });
        if (data == null) {
            res.status(400).send({ msg: `There is no category with a specified id = ${req.params.id}` });
            return;
        }
        res.send(data);
    } catch (e) {
        console.log("ERROR: Wrong id for category");
    }
});

app.delete("/api/category/:id", async (req, res) => {
    try {
        await Category.destroy({ where: { id: req.params.id } });
        res.send({ msg: `Category with id ${req.params.id} deleted` });
    } catch (e) {
        console.log("ERROR: Wrong id for category");
    }
});

app.put("/api/category/:id", async (req, res) => {
    const id = req.params.id;
    const dataFromReq = req.body;

    const dataFromDb = await Category.findOne({ where: { id: req.params.id } });
    if (dataFromDb == null) {
        res.status(400).send({ msg: `There is no category with a specified id = ${req.params.id}` });
        return;
    }

    await Category.update({
        name: dataFromReq.name || dataFromDb.name,
        description: dataFromReq.description || dataFromDb.description
    },
        {
            where: { id: id }
        });
    res.send({ msg: `Category with the id = ${id} updated` });
});

// --- Products ---
app.get("/api/products", async (req, res) => {
    const dataArray = await Product.findAll();
    res.send(dataArray);
});

app.post('/api/product', async (req, res) => {
    const data = req.body;
    data.price = parseFloat(req.body.price);
    data.categoryId = parseInt(data.categoryId);

    try {
        const category = await Category.findOne({ where: { id: data.categoryId } });
        if (!data.name || !data.description || !data.price || data.price <= 0 || category == null) {
            if (category == null) {
                res.status(400).send({ msg: `Invalid category for new product` });
            } else {
                res.status(400).send({ msg: `Invalid data for new product` });
            }
            return;
        }
        await Product.create(data);
        const dataArray = await Product.findAll();
        res.send(dataArray);
    } catch (e) {
        console.log("Error: ", e);
    }
});

app.get("/api/product/:id", async (req, res) => {
    try {
        const data = await Product.findOne({ where: { id: req.params.id } });
        if (data == null) {
            res.status(400).send({ msg: `There is no product with a specified id = ${req.params.id}` });
            return;
        }
        res.send(data);
    } catch (e) {
        console.log("ERROR: Wrong id for category");
    }
});

app.delete("/api/product/:id", async (req, res) => {
    try {
        await Product.destroy({ where: { id: req.params.id } });
        res.send({ msg: `Product with id ${req.params.id} deleted` });
    } catch (e) {
        console.log("ERROR: Wrong id for product");
    }
});

app.put("/api/product/:id", async (req, res) => {
    // Validation - Prodcut egzists 
    const productDb = await Product.findOne({ where: { id: req.params.id } });
    if (productDb == null) {
        res.status(400).send({ msg: `There is no product with a specified id = ${req.params.id}` });
        return;
    }
    // Category egzists and price ok
    const productReq = req.body;
    const categoryId = parseInt(productReq.categoryId) || productDb.categoryId;
    const categoryDb = await Category.findOne({ where: { id: categoryId } });
    const price = parseFloat(productReq.price) || productDb.price;
    if (categoryDb == null || price <= 0) {
        res.status(400).send({ msg: `Invalid data for product` });
        return;
    }

    await Product.update({
        name: productReq.name || productDb.name,
        description: productReq.description || productDb.description,
        categoryId: categoryId,
        price: price
    },
        {
            where: { id: req.params.id }
        });
    res.send({ msg: `Product with the id = ${req.params.id} updated` });
});

// --- Cupons ---
app.get("/api/coupons", async (req, res) => {
    const dataArray = await Coupon.findAll({ raw: true });
    res.send(dataArray);
});

app.post('/api/coupon', async (req, res) => {
    const data = req.body;
    data.expiryDate = data.expiryDate;
    data.discount = parseFloat(data.discount);
    // Validation
    if (!data.code || !data.expiryDate || !data.discount || data.discount <= 0 || data.discount > 1) {
        res.status(400).send({ msg: `Invalid data for new cupon` });
        return;
    }
    data.used = false;
    await Coupon.create(data);
    const dataArray = await Coupon.findAll({ raw: true });
    res.send(dataArray);
});

app.get("/api/coupon/:id", async (req, res) => {
    try {
        const data = await Coupon.findOne({ where: { id: req.params.id } });
        if (data == null) {
            res.status(400).send({ msg: `There is no coupon with a specified id = ${req.params.id}` });
            return;
        }
        res.send(data);
    } catch (e) {
        console.log("ERROR: Wrong id for coupon");
    }
});

app.delete("/api/coupon/:id", async (req, res) => {
    try {
        await Coupon.destroy({ where: { id: req.params.id } });
        res.send({ msg: `Coupon with id ${req.params.id} deleted` });
    } catch (e) {
        console.log("ERROR: Wrong id for coupon");
    }
});

app.put("/api/coupon/:id", async (req, res) => {
    console.log("Enter cuppoone");

    // Cupon egzists
    const cuponDb = await Coupon.findOne({ where: { id: req.params.id } });
    if (cuponDb == null) {
        res.status(400).send({ msg: `There is no cupon with a specified id = ${req.params.id}` });
        return;
    }
    // User cannot enter invalid values
    const cuponReq = req.body;
    const discountTemp = parseFloat(cuponReq.discount);
    const usedTemp = parseInt(cuponReq.used);

    const code = cuponReq.code || cuponDb.code;
    const expiryDate = getDateFromStringcuponReq.expiryDate || cuponDb.expiryDate;
    const discount = (!isNaN(discountTemp) && discountTemp > 0 && discountTemp <= 1) ? discountTemp : cuponDb.discount;
    const used = (usedTemp === 0 || usedTemp === 1) ? !!usedTemp : cuponDb.used;

    await Coupon.update({
        code: code,
        expiryDate: expiryDate,
        discount: discount,
        used: used
    },
    {
        where: { id: req.params.id }
    });
    res.send({ msg: `Coupon with the id = ${req.params.id} updated` });
});




function getDateFromString(dateString) {
    if (!dateString) {
        return null;
    }
    const d = dateString.split(".");
    const date = new Date(`${d[2]}-${d[1]}-${d[0]}T23:59`);
    if (date instanceof Date && !isNaN(date)) {
        return date;
    }
    return null;
}


app.listen(8080);
console.log("Server started on port 8080");

//Querry example
//Where
//const users = await User.findAll({ where: { id: 1 }});
//const users = await User.findAll({ where: { id: 1, name: "name" }});
//Update
//await User.update({ name: "name" }, { where: { id: 1 }});
