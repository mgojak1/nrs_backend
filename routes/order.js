const router = require('express').Router();
const {
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Coupon,
  connection,
} = require("./../db");


router.get('/orders', async (req, res) => {
  const ordersDB = await Order.findAll({
    attributes: {
      exclude: ['userId', 'couponId']
    },
    include: [
      { model: User },
      { model: Coupon },
    ]
  });
  const orders = ordersDB.map(o => o.dataValues)
  for (let i = 0; i < orders.length; i++) {
    const orderItemDB = await OrderItem.findAll({ where: { orderId: orders[i].id } });
    orders[i] = { ...orders[i], orderItems: orderItemDB };
  }
  res.send(orders);
});

router.get('/order/:id', async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['userId', 'couponId']
    },
    include: [
      { model: User },
      { model: Coupon },
    ]
  });
  if (order != null) {
    order.dataValues.orderItems = await OrderItem.findAll({ where: { orderId: order.id } });
  }
  res.send(order);
});

router.post('/order', async (req, res) => {
  let {orderDate, completed, userId, cuponId, orderItems} = req.body;
  
  // When creating a new order atribute completed is always false;
  completed = false;

  // Check if there are order items
  if (!orderItems || orderItems.length == 0 || !userId) {
    res.status(400).send({ msg: `Bada data: Data missing` });
  }

  // Create new order
  let orderDb;
  let order;
  try {
   orderDb = await Order.create({orderDate:getDateFromString(orderDate), completed:completed, userId:userId, couponId:cuponId});  
  } catch (e) {
    res.status(400).send({ msg: `DataBase Error: Something went wrong with database` });
  }
  
  order = orderDb.dataValues;
  order.orderItems = [];

  console.log("ORDER CREATED");
  console.log("Order id: ", order.id);
  
  // Create orderItems
  var promises = [];
  for(i=0;i<orderItems.length;i++){
    orderItems[i].orderId = order.id;
    promises.push(OrderItem.create(orderItems[i])); 
  }

Promise.all(promises)
    .then( data => {
        for(i=0;i<orderItems.length;i++){
          order.orderItems.push((data[i]).dataValues)
        }
        res.send(order);
    })
    .catch((e) => {
      res.status(400).send({ msg: `Bada data: Cannot create order items` });
    });
});

router.delete("/order/:id", async (req, res) => {
  try {
      await Order.destroy({ where: { id: req.params.id } });
      res.send({ msg: `Order with id ${req.params.id} deleted` });
  } catch (e) {
      console.log("ERROR: Wrong id for Order");
  }
});

router.put("/order/:id", async (req, res) => {
  let {orderDate, completed, userId, couponId, orderItems} = req.body;
  
  
  if (!req.params.id) {
    res.status(400).send({ msg: `Id not specified` });
  }
  const orderDb = await Order.findOne({ where: { id: req.params.id } });
  if (orderDb == null) {
      res.status(400).send({ msg: `There is no order with a specified id = ${req.params.id}` });
      return;
  }


    // No validation - it will be added via middleware
  orderDate = getDateFromString(orderDate) || orderDb.orderDate;
  userId = parseInt(userId) || orderDb.userId;
  couponId = parseInt(couponId) || orderDb.couponId;
  completed = (completed == null) ? orderDb.completed : completed; 

  await Order.update({
      orderDate : orderDate,
      userId : userId,
      couponId : couponId,
  },
      {
          where: { id: req.params.id }
      });
  
    // Update order items
    if (orderItems == null) {res.send({ msg: `Order with the id = ${req.params.id} updated` });}
    await OrderItem.destroy({ where: { orderId: req.params.id } });
    
      // Create orderItems
  var promises = [];
  for(i=0;i<orderItems.length;i++){
    orderItems[i].orderId =  req.params.id
    promises.push(OrderItem.create(orderItems[i])); 
  }

Promise.all(promises)
    .then( data => {
      res.send({ msg: `Order with the id = ${req.params.id} updated` });
    })
    .catch((e) => {
      res.status(400).send({ msg: `Bada data: Cannot create order items` });
    });
});



//{ id: 1, quantity: 1, productId: 1, orderId: 1 },

// id: 1,
// orderDate: Date.now(),
// completed: false,
// userId: 1,
// couponId: 1,



// app.put("/api/coupon/:id", async (req, res) => {
//   console.log("Enter cuppoone");

//   // Cupon egzists
//   const cuponDb = await Coupon.findOne({ where: { id: req.params.id } });
//   if (cuponDb == null) {
//       res.status(400).send({ msg: `There is no cupon with a specified id = ${req.params.id}` });
//       return;
//   }
//   // User cannot enter invalid values
//   const cuponReq = req.body;
//   const discountTemp = parseFloat(cuponReq.discount);
//   const usedTemp = parseInt(cuponReq.used);

//   const code = cuponReq.code || cuponDb.code;
//   const expiryDate = getDateFromString(cuponReq.expiryDate) || cuponDb.expiryDate;
//   const discount = (!isNaN(discountTemp) && discountTemp > 0 && discountTemp <= 1) ? discountTemp : cuponDb.discount;
//   const used = (usedTemp === 0 || usedTemp === 1) ? !!usedTemp : cuponDb.used;

//   await Coupon.update({
//       code: code,
//       expiryDate: expiryDate,
//       discount: discount,
//       used: used
//   },
//   {
//       where: { id: req.params.id }
//   });
//   res.send({ msg: `Coupon with the id = ${req.params.id} updated` });
// });









module.exports = router;

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

















