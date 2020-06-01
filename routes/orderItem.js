const router = require("express").Router();
const {
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Coupon,
    connection,
} = require("./../db");

router.get("/orderitems", async (req, res) => {
    const ordersItemsDB = await OrderItem.findAll({
        attributes: {
            exclude: ["productId"],
        },
        include: [{ model: Product }],
    });
    res.send(ordersItemsDB);
});

router.delete("/orderitem/:id", async (req, res) => {
    try {
        await OrderItem.destroy({ where: { id: req.params.id } });
        res.send({ msg: `OrderItem with id ${req.params.id} deleted` });
    } catch (e) {
        console.log("ERROR: Wrong id for OrderItem");
    }
});

router.get("/orderitems/:id", async (req, res) => {
    const ordersItemsDB = await OrderItem.findAll({
        where: {
            orderId: req.params.id,
        },
        attributes: {
            exclude: ["productId"],
        },
        include: [{ model: Product }],
    });
    res.send(ordersItemsDB);
});

module.exports = router;
