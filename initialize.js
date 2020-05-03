import {
    sequelize,
    user,
    category,
    order,
    orderItem,
    coupon,
    product,
} from "./db/db";

sequelize.sync({ force: true }).then(function () {
    intialize().then(() => {
        console.log("Initalized");
        process.exit();
    });
});

function intialize() {
    const users = [
        user.create({
            id: 1,
            name: "name1",
            lastName: "lastName1",
            email: "email1",
            address: "address1",
            username: "username1",
            password: "password1",
            role: 1,
        }),
        user.create({
            id: 2,
            name: "name2",
            lastName: "lastName2",
            email: "email2",
            address: "address2",
            username: "username2",
            password: "password2",
            role: 2,
        }),
    ];
    const categories = [
        category.create({
            id: 1,
            name: "category1",
            description: "description1",
        }),
        category.create({
            id: 2,
            name: "category2",
            description: "description2",
        }),
    ];
    const products = [
        product.create({
            id: 1,
            name: "product1",
            description: "description1",
            category: 1,
            price: 1,
        }),
        product.create({
            id: 2,
            name: "product2",
            description: "description2",
            category: 2,
            price: 2,
        }),
    ];

    const coupons = [
        coupon.create({
            id: 1,
            code: "coupon1",
            expiryDate: "01.01.2020",
            discount: 1,
            used: false,
        }),
        coupon.create({
            id: 2,
            code: "coupon2",
            expiryDate: "02.02.2020",
            discount: 2,
            used: true,
        }),
    ];

    const orderItems = [
        orderItem.create({ id: 1, quantity: 1, product: 1 }),
        orderItem.create({ id: 2, quantity: 2, product: 2 }),
    ];

    const orders = [
        order.create({
            id: 1,
            orderDate: "01.01.2020",
            completed: false,
            orderItem: 1,
            user: 1,
            coupon: 1,
        }),
        order.create({
            id: 2,
            orderDate: "02.02.2020",
            completed: true,
            orderItem: 2,
            user: 2,
            coupon: 2,
        }),
    ];

    return new Promise((resolve, reject) => {
        Promise.all(users)
            .then(() => Promise.all(categories).then((all) => resolve(all)))
            .then(() => Promise.all(coupons).then((all) => resolve(all)))
            .then(() => Promise.all(products).then((all) => resolve(all)))
            .then(() => Promise.all(orderItems).then((all) => resolve(all)))
            .then(() => Promise.all(orders).then((all) => resolve(all)))
            .catch((reason) => reject(reason));
    });
}
