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
            name: "ADMIN1",
            lastName: "admin1",
            email: "admin1@gmail.com",
            address: "address1",
            username: "admin1",
            password: "$2b$10$Opn1pnyxtr7XbRpGoyf2GuowuBP0dvYD8eQdJJ./ug8cDYYaCcFcS", //password
            role: 1,
        },

        {
            id: 2,
            name: "ADMIN2",
            lastName: "admini2",
            email: "admin2@gmail.com",
            address: "address2",
            username: "admin2",
            password: "$2b$10$Opn1pnyxtr7XbRpGoyf2GuowuBP0dvYD8eQdJJ./ug8cDYYaCcFcS", //password
            role: 1,
        },


        {
            id: 3,
            name: "employee1",
            lastName: "employee1",
            email: "employee1@gmail.com",
            address: "address2",
            username: "employee1",
            password: "$2b$10$Opn1pnyxtr7XbRpGoyf2GuowuBP0dvYD8eQdJJ./ug8cDYYaCcFcS", //password
            role: 2,
        },

        {
            id: 4,
            name: "client1",
            lastName: "client1",
            email: "client1@gmail.com",
            address: "address3",
            username: "client",
            password: "$2b$10$Opn1pnyxtr7XbRpGoyf2GuowuBP0dvYD8eQdJJ./ug8cDYYaCcFcS",
            role: 3,
        }
    ];
    const categories = [
        {
            id: 1,
            name: "Slana jela",
            description: "Slana jela, jela sa rostilja ...",
        },
        {
            id: 2,
            name: "Slatka jela",
            description: "Deserti, kolači ...",
        },
        {
            id: 3,
            name: "Predjela",
            description: "Supe, hladne plate, omleti ...",
        },
        {
            id: 4,
            name: "Bezalkoholna pića",
            description: "Razne vrste sokova i drugih bezalkoholnih pića ...",
        },
        {
            id: 5,
            name: "Alkoholna pića",
            description: "Razne vrste sokova i drugih bezalkoholnih pića ...",
        },

    ];
    const products = [
        {
            id: 1,
            name: "Ćevapi - Mala porcija",
            description: "5 ćevapa u pola lepine",
            categoryId: 1,
            price: 3,
        },
        {
            id: 2,
            name: "Ćevapi - Velika porcija",
            description: "10 ćevapa u cijelu lepinu",
            categoryId: 1,
            price: 6,
        },
        {
            id: 3,
            name: "Voćna salata",
            description: "Voćna salata, ima bruku voća, ekstra zdrava",
            categoryId: 2,
            price: 3,
        },
        {
            id: 4,
            name: "Palačinci",
            description: "2 palačinka po želji eurokrem/džem/pašteta",
            categoryId: 2,
            price: 4,
        },
        {
            id: 5,
            name: "Suho meso sa sirom",
            description: "Suho meso sa sirom",
            categoryId: 3,
            price: 6,
        },
        {
            id: 6,
            name: "Omlet",
            description: "Dobar omlet pravo a nije skup",
            categoryId: 3,
            price: 1,
        },
        {
            id: 7,
            name: "Kafa - mala",
            description: "Mala kafa uz dodatak mlijeka po izboru",
            categoryId: 4,
            price: 1.5,
        },
        {
            id: 8,
            name: "Coca - cola",
            description: "A šta se ima govorit o koli",
            categoryId: 4,
            price: 2,
        },
        {
            id: 9,
            name: "Sarajevsko pivo",
            description: "Domaće pibo klasika",
            categoryId: 5,
            price: 2,
        },
        {
            id: 10,
            name: "Viski",
            description: "Viski mjera 0.03",
            categoryId: 5,
            price: 3,
        },


    ];

    const coupons = [
        {
            id: 1,
            code: "111111",
            expiryDate: Date.now(),
            discount: 0.1,
            used: false,
        },
        {
            id: 2,
            code: "222222",
            expiryDate: Date.now(),
            discount: 0.2,
            used: false,
        },
        {
            id: 3,
            code: "333333",
            expiryDate: Date.now(),
            discount: 0.3,
            used: false,
        },
        {
            id: 4,
            code: "444444",
            expiryDate: Date.now(),
            discount: 0.4,
            used: false,
        },
        {
            id: 5,
            code: "555555",
            expiryDate: Date.now(),
            discount: 0.5,
            used: false,
        },
    ];

    const orderItems = [
        { id: 1, quantity: 2, productId: 2, orderId: 1 },
        { id: 2, quantity: 2, productId: 8, orderId: 1 },
        { id: 3, quantity: 1, productId: 4, orderId: 2 },
        { id: 4, quantity: 1, productId: 9, orderId: 2 },
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
            userId: 3,
            couponId: 3,
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


