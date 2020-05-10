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

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Users ---
app.get("/user", async (req, res) => {
    const dataArray = await User.findAll();
    res.send(dataArray);
});

app.post('/user', async (req, res) => {
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

app.get("/user/:id", async (req, res) => {
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

app.delete("/user/:id", async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.send({ msg: `User with id ${req.params.id} deleted` });
    } catch (e) {
        console.log("ERROR: Wrong id for user");
    }
});

app.put("/user/:id", async (req, res) => {
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
app.get("/category", async (req, res) => {
    const dataArray = await Category.findAll();
    res.send(dataArray);
});

app.post('/category', async (req, res) => {
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

app.get("/category/:id", async (req, res) => {
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

app.delete("/category/:id", async (req, res) => {
    try {
        await Category.destroy({ where: { id: req.params.id } });
        res.send({ msg: `Category with id ${req.params.id} deleted` });
    } catch (e) {
        console.log("ERROR: Wrong id for category");
    }
});

app.put("/category/:id", async (req, res) => {
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
app.get("/product", async (req, res) => {
    const dataArray = await Product.findAll();
    res.send(dataArray);
});

app.post('/product', async (req, res) => {
    const data = req.body;
    data.price = parseFloat(req.body.price);
    data.categoryId = parseInt(data.categoryId);

    try {
        const category = await Category.findOne({ where: { id: data.categoryId } });
        if (!data.name || !data.description || !data.price || data.price <= 0 || category == null) {
            if (category == null) {
                res.status(400).send({ msg: `Invalid categoriy for new product` });
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

app.get("/product/:id", async (req, res) => {
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

app.delete("/product/:id", async (req, res) => {
    try {
        await Product.destroy({ where: { id: req.params.id } });
        res.send({ msg: `Product with id ${req.params.id} deleted` });
    } catch (e) {
        console.log("ERROR: Wrong id for product");
    }
});

app.put("/product/:id", async (req, res) => {
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

app.listen(8080);
console.log("Server started on port 8080");

//Querry example
//Where
//const users = await User.findAll({ where: { id: 1 }});
//const users = await User.findAll({ where: { id: 1, name: "name" }});
//Update
//await User.update({ name: "name" }, { where: { id: 1 }});
