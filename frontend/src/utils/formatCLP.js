const formatCLP = (value) =>
    new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(value);

export default formatCLP;
