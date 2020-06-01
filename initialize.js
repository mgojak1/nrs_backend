const {
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Coupon,
    connection,
} = require("./db");

connection.sync({ force: true }).then(function () {
    intialize().then(() => {
        console.log("Initalized");
        process.exit();
    });
});

function intialize() {
    const users = [
        {
            id: 1,
            name: "name1",
            lastName: "lastName1",
            email: "email1",
            address: "address1",
            username: "username1",
            password: "password1",
            role: 1,
        },
        {
            id: 2,
            name: "name2",
            lastName: "lastName2",
            email: "email2",
            address: "address2",
            username: "username2",
            password: "password2",
            role: 2,
        },
    ];
    const categories = [
        {
            id: 1,
            name: "category1",
            description: "description1",
        },
        {
            id: 2,
            name: "category2",
            description: "description2",
        },
    ];
    const products = [
        {
            id: 1,
            name: "product1",
            description: "description1",
            categoryId: 1,
            price: 1,
        },
        {
            id: 2,
            name: "product2",
            description: "description2",
            categoryId: 2,
            price: 2,
        },
    ];

    const coupons = [
        {
            id: 1,
            code: "coupon1",
            expiryDate: Date.now(),
            discount: 1,
            used: false,
        },
        {
            id: 2,
            code: "coupon2",
            expiryDate: Date.now(),
            discount: 2,
            used: true,
        },
    ];

    // const orderItems = [
    //     { id: 1, quantity: 1, productId: 1 },
    //     { id: 2, quantity: 2, productId: 2 },
    // ];

    // const orders = [
    //     {
    //         id: 1,
    //         orderDate: Date.now(),
    //         completed: false,
    //         orderItemId: 1,
    //         userId: 1,
    //         couponId: 1,
    //     },
    //     {
    //         id: 2,
    //         orderDate: Date.now(),
    //         completed: true,
    //         orderItemId: 2,
    //         userId: 2,
    //         couponId: 2,
    //     },
    // ];


    const orderItems = [
        { id: 1, quantity: 1, productId: 1, orderId: 1 },
        { id: 2, quantity: 2, productId: 2, orderId: 2 },
        { id: 3, quantity: 2, productId: 2, orderId: 2 },
    ];

    const orders = [
        {
            id: 1,
            orderDate: Date.now(),
            completed: false,
            userId: 1,
            couponId: 1,
        },
        {
            id: 2,
            orderDate: Date.now(),
            completed: true,
            userId: 2,
            couponId: 2,
        },
    ];






    return new Promise((resolve, reject) => {
        User.bulkCreate(users)
            .then(Category.bulkCreate(categories))
            .then(Coupon.bulkCreate(coupons))
            .then(Product.bulkCreate(products))
            .then(Order.bulkCreate(orders))
            .then(OrderItem.bulkCreate(orderItems))
            .catch((reason) => reject(reason));
    });
}


