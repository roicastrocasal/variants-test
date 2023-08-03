const app = require("./app");
const products = require("./data/product.json");
const variantTypes = require("./data/variantTypes.json");
const variantValues = require("./data/variantValues.json");
const {plainByVariantType, addVariantValue} = require("./services/productServices")



app.get("/api/products", (req,res) => {

    res.json(products);

})

app.get("/api/products/:productId", (req,res) => {

    res.json(products.filter(p => p.uuid === req.params.productId)[0]);

})


app.get("/api/variant-types", (req,res) => {

    res.json(variantTypes);

})

app.get("/api/variant-values", (req,res) => {

    res.json(variantValues);

})

app.get("/api/products/:productId/plain-variants/:variantTypeId", (req,res) => {
    const variantTypeId = req.params.variantTypeId;
    const productId = req.params.productId;

    res.json(plainByVariantType(products, productId, variantTypeId))




})

app.post("/api/products/:productId/variant/:variantId/variant-value/:variantValueId", (req,res) => {

    const productId = req.params.productId;
    const variantId = req.params.variantId;
    const variantValuesId = req.params.variantValueId;
    const newValue = req.body;
    
    res.json(addVariantValue({products,variantValues,productId,variantId,variantValuesId, newValue}))



});




app.get('/api/test',(req, res) => {
    res.json({ data: "test" });
})

const server = app.listen(3010, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});