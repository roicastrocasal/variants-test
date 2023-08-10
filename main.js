const app = require("./app");
const products = require("./data/product.json");
const variantTypes = require("./data/variantTypes.json");
const attributeValues = require("./data/attributeValues.json");
const dataTypes = require("./data/dataTypes.json")
const metaInfoTypes = require("./data/metainfoTypes.json");
const optionsValues = require("./data/optionsValues.json")
const {plainByVariantType, addDataToVariant,findProduct, filterByCategories} = require("./services/productServices")



app.get("/api/products", (req,res) => {

    res.json(products);

})

app.get("/api/products/:productId", (req,res) => {

    res.json(findProduct(req.params.productId, products));

})


app.post("/api/variant-types", (req,res) => {

    res.json(filterByCategories(req.body.category,variantTypes));

})

app.post("/api/metainfo-types", (req,res) => {

    res.json(filterByCategories(req.body.category,metaInfoTypes));

})

app.post("/api/option-values", (req,res) => {

    res.json(filterByCategories(req.body.category,optionsValues));

})

app.post("/api/attribute-values", (req,res) => {

    res.json(filterByCategories(req.body.category,attributeValues));

})

app.get("/api/data-types", (req,res) => {

    res.json(dataTypes);

})

app.post("/api/products/:productId/variants", (req,res) => {
    const variantTypeId = req.params.variantTypeId;
    const productId = req.params.productId;

    res.json(plainByVariantType(products, productId, req.body.withMetainfo))




})

app.post("/api/products/:productId/variant/:variantId", (req,res) => {
    const productId = req.params.productId;
    const product = findProduct(productId, products);
    const variantId = req.params.variantId;
    const data = req.body;

    res.json(addDataToVariant(product, variantId, data))




})






app.get('/api/test',(req, res) => {
    res.json({ data: "test" });
})

const server = app.listen(3010, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});