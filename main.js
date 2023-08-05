const app = require("./app");
const products = require("./data/product.json");
const valuesClusters = require("./data/valueClusters.json");
const valueTypes = require("./data/valueTypes.json");
const {plainByVariantType, addVariantValue} = require("./services/productServices")



app.get("/api/products", (req,res) => {

    res.json(products);

})

app.get("/api/products/:productId", (req,res) => {

    res.json(products.filter(p => p.uuid === req.params.productId)[0]);

})


app.get("/api/values-clusters", (req,res) => {

    res.json(valuesClusters);

})

app.get("/api/value-types", (req,res) => {

    res.json(valueTypes);

})

app.get("/api/products/:productId/plain-variants/:valueClusterId", (req,res) => {
    const valueClusterId = req.params.valueClusterId;
    const productId = req.params.productId;

    res.json(plainByVariantType(products, productId, valueClusterId))




})

app.post("/api/products/:productId/variant/:variantId/variant-value/:valueTypeId", (req,res) => {

    const productId = req.params.productId;
    const variantId = req.params.variantId;
    const valueTypeId = req.params.valueTypeId;
    const newValue = req.body;
    
    res.json(addVariantValue({products,valueTypes,productId,variantId,valueTypeId, newValue}))



});




app.get('/api/test',(req, res) => {
    res.json({ data: "test" });
})

const server = app.listen(3010, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});