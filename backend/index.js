import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"ADT_FinalProject"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hey, this is backend!")
})

app.get("/orders", (req,res)=>{
    //console.log("here");
    const q ="select o.order_id , o.order_date , c.customer_id , c.customer_name , c.zip_code , p.product_name , p.category ,  s.shipping_class , s.shipping_date , o.order_status FROM orders o, customers c, shipping s, products p where o.customer_id = c.customer_id and o.product_id = p.product_id and o.order_id = s.order_id;"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        // console.log(data[1]);
        return res.json(data);
    })

})



app.get("/createOrders", (req,res)=>{
    console.log("here on post_get");
    console.log(req.body.product_name);
    const q1= "SELECT MAX(order_id) AS max_order_id FROM orders;"
    db.query(q1,(err,result)=>{
        if (err){
            console.log(err)
        } else{
            let maxOrderIdResult=JSON.parse(JSON.stringify(result))
            console.log("here on post_get2");
            console.log(maxOrderIdResult[0].max_order_id);
            // console.log(result)
            res.json(maxOrderIdResult[0].max_order_id);
            // return(maxOrderIdResult[0].max_order_id);
            // res.send(maxOrderIdResult[0].max_order_id.toString());
        }
    })
}) 

app.post("/createOrders2",async (req,res)=>{
    let productId = 0;
    console.log("secondget2");
    const productName = req.body.product_name;
    const productCategory=req.body.category;
    const subCategory=req.body.sub_category;
    // console.log(req.body.sub_category);
    // console.log(req.body.category);
    // console.log(req.body.product_name);
    console.log(subCategory);
    console.log(productCategory);
    console.log(productName);
    // const q2= `SELECT product_id FROM products WHERE product_name = productName AND category = productCategory AND sub_category = subCategory;`
    const q2= 'SELECT product_id FROM products WHERE product_name=? and category=? and sub_category=?'
    db.query(q2,[ productName, productCategory, subCategory] ,(err,result)=>{
        // console.log("pruuuuu"+result[0].product_id)
        if (err){
            console.log(err);  
        } else if(result.length > 0){

            productId = result[0].product_id;
            console.log("already there"+productId);
            res.json(productId);
        }
        else{
            const query1= `SELECT MAX(product_id) AS max_product_id FROM products;`
            db.query(query1,(err,result)=>{
                if (err){
                    console.log(err) ;  
                } else{   
                    productId = result[0].max_product_id+1;
                    res.json(productId);
                }
            }
        )}
    })
})

app.post("/createOrders3",async (req,res)=>{
    let customerId = 0;
    const customerQuery = 'SELECT customer_id FROM customers WHERE customer_name = ? and city = ? and state = ? and zip_code = ?'

    db.query(customerQuery,[req.body.customer_name, req.body.city, req.body.state, req.body.zip_code],(err,result)=>{
       
        if (err){
            console.log(err);  
        } else if(result.length > 0){

            customerId = result[0].customer_id;
            // const test123 = customerId;
            res.json(customerId);
            console.log("already there"+customerId);
        }
        else{
            const query2= `SELECT MAX(customer_id) AS max_customer_id FROM customers;`
            
            db.query(query2,(err,result)=>{
                if (err){
                    console.log(err) ;  
                } else{
                        
                    customerId = result[0].max_customer_id+1;
                    res.json(customerId);
             
                }         
        })
        }
    }) 

})


 
app.post("/createOrders/:orderData/:productId/:customerId",async (req,res)=>{
//app.post("/createOrders/:orderData",async (req,res)=>{

    console.log("here on post");

    const orderData = req.params.orderData;
    console.log("orderid is"+ orderData)
    
    const productId= req.params.productId;
    console.log("productid is"+ productId)

    const customerId= req.params.customerId;
    console.log("customerid is"+ customerId)

    const orderId=parseInt(orderData)+1
    console.log(orderId)
    const q2 ="INSERT INTO `ADT_FinalProject`.`shipping` (`order_id`,`shipping_date`,`shipping_class`) VALUES (?);"
     const values2 = [
        orderId,
        req.body.shipping_date,
        req.body.shipping_class, 
    ]
    db.query(q2, [values2], (err,data)=>{
    })

    const q3 ="INSERT INTO `ADT_FinalProject`.`products` (`product_id`,`product_name`,`category`,`sub_category`) VALUES (?);"
    const values3 = [
        productId,
        req.body.product_name,
        req.body.category, 
        req.body.sub_category, 
    ]
    console.log(values3);
    console.log("here :"+productId);
    db.query(q3, [values3], (err,data)=>{
    })


    const q4 ="INSERT INTO `ADT_FinalProject`.`customers` (`customer_id`,`customer_name`,`city`,`state`,`country`,`zip_code`) VALUES (?);"
    const values4 = [
        customerId,
        req.body.customer_name,
        req.body.city, 
        req.body.state, 
        req.body.country, 
        req.body.zip_code, 
    ]
    db.query(q4, [values4], (err,data)=>{

        console.log("4");
    })

    const orderquery ="INSERT INTO `ADT_FinalProject`.`orders` (`order_id`,`order_date`,`order_status`,`product_id`,`customer_id`) VALUES (?);"

    const ordervalues = [
        orderId,
        req.body.order_date,
        req.body.order_status,
        parseInt(productId), 
        parseInt(customerId)
    ]

    console.log(ordervalues);
    db.query(orderquery, [ordervalues], (err,data)=>{
        console.log("1");
        res.json("Order has been created successfully")
    })

})


app.delete("/deleteOrder/:orderId/:customerId",async (req,res)=>{
    const orderId = req.params.orderId;
    //const productId= req.params.productId;
    const customerId= req.params.customerId;

    const deleteQuery = 'delete FROM orders WHERE order_id = ? and customer_id = ?'
  
    db.query(deleteQuery, [orderId, customerId], (err,data)=>{
        res.json("Order has been deleted successfully")
    })   

    })


app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

