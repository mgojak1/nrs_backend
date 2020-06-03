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
            name: "admin",
            lastName: "adminic",
            email: "email1@gmail.com",
            address: "address1",
            username: "admin1",
            password: "$2b$10$Opn1pnyxtr7XbRpGoyf2GuowuBP0dvYD8eQdJJ./ug8cDYYaCcFcS", //password
            role: 2,
        },
        {
            id: 2,
            name: "employee",
            lastName: "employeeic",
            email: "email2@gmail.com",
            address: "address2",
            username: "employee1",
            password: "$2b$10$Opn1pnyxtr7XbRpGoyf2GuowuBP0dvYD8eQdJJ./ug8cDYYaCcFcS", //password
            role: 2,
            role: 1,
        },
        {
            id: 3,
            name: "client",
            lastName: "clientic",
            email: "email3@gmail.com",
            address: "address3",
            username: "client",
            password: "$2b$10$Opn1pnyxtr7XbRpGoyf2GuowuBP0dvYD8eQdJJ./ug8cDYYaCcFcS",
            role: 0,
        }
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
            discount: 0.1,
            used: false,
        },
        {
            id: 2,
            code: "coupon2",
            expiryDate: Date.now(),
            discount: 0.2,
            used: false,
        },
        {
            id: 3,
            code: "coupon3",
            expiryDate: Date.now(),
            discount: 0.3,
            used: false,
        },
        {
            id: 4,
            code: "coupon4",
            expiryDate: Date.now(),
            discount: 0.4,
            used: false,
        },
        {
            id: 5,
            code: "coupon5",
            expiryDate: Date.now(),
            discount: 0.5,
            used: false,
        },
    ];

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
            completed: false,
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


