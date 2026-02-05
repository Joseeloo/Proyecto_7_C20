const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/response");
const { isValidObjectId } = require("../utils/validators");

const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.getAll = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return ok(res, { data: { products } });
});

exports.getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return fail(res, { status: 400, message: "ID inválido" });

    const product = await Product.findById(id);
    if (!product) return fail(res, { status: 404, message: "Producto no encontrado" });

    return ok(res, { data: { product } });
});

exports.getBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (!product) return fail(res, { status: 404, message: "Producto no encontrado" });
    return ok(res, { data: { product } });
});

exports.create = asyncHandler(async (req, res) => {
    const { name, price, description, img, currency = "clp", slug, stock = 0, category = "" } = req.body;

    if (!name || price == null || !img || !slug) {
        return fail(res, { status: 400, message: "Faltan campos obligatorios (name, price, img, slug)" });
    }

    const stripeProduct = await stripe.products.create({
        name,
        description: description || "",
        images: [img],
        metadata: { slug },
    });

    const stripePrice = await stripe.prices.create({
        unit_amount: Number(price),
        currency,
        product: stripeProduct.id,
    });

    const product = await Product.create({
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
        currency,
        name,
        price: Number(price),
        description: description || "",
        img,
        slug,
        stock: Number(stock) || 0,
        category,
    });

    return ok(res, { status: 201, message: "Producto creado", data: { product } });
});

exports.updateById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return fail(res, { status: 400, message: "ID inválido" });

    const { name, price, description, img, slug, stock, category } = req.body;

    const update = {};
    if (name !== undefined) update.name = name;
    if (price !== undefined) update.price = Number(price);
    if (description !== undefined) update.description = description;
    if (img !== undefined) update.img = img;
    if (slug !== undefined) update.slug = slug;
    if (stock !== undefined) update.stock = Number(stock);
    if (category !== undefined) update.category = category;

    const product = await Product.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!product) return fail(res, { status: 404, message: "Producto no encontrado" });

    return ok(res, { message: "Producto actualizado", data: { product } });
});

exports.deleteById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return fail(res, { status: 400, message: "ID inválido" });

    const product = await Product.findByIdAndDelete(id);
    if (!product) return fail(res, { status: 404, message: "Producto no encontrado" });

    return ok(res, { message: "Producto eliminado" });
});
