function currencyFn(value) {
    if (!value) return "";
    const formattedValue = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(value);
    return formattedValue;
}
function capitalizeFn(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
}
function addressFn(value) {
    return `${value.state}, ${value.city}. ${value.street} #${value.extNumber} ${value.intNumber ? "int. " + value.intNumber : ""}`;
}
function paymentStatusToTextFn(value) {
    switch (value) {
        case "pending":
            return "Pendiente";
        case "paid":
            return "Pagado";
        case "cancelled":
            return "Cancelado";
        default:
            return "Desconocido";
    }
}
function deliveryStatusToTextFn(value) {
    switch (value) {
        case "pending":
            return "Pendiente";
        case "elaborating":
            return "En elaboración";
        case "sent":
            return "Enviado";
        case "delivered":
            return "Entregado";
        case "cancelled":
            return "Cancelado";
        default:
            return "Desconocido";
    }
}
function deliveryStatusToMessageFn(value) {
    switch (value) {
        case "pending":
            return "El pedido ha sido recibido y está en espera de ser procesado.";
        case "elaborating":
            return "El pedido ha sido recibido y está siendo elaborado.";
        case "sent":
            return "El pedido ha sido enviado y está en camino. Si tienes alguna duda, por favor contáctanos.";
        case "delivered":
            return "El pedido ha sido entregado. Gracias por tu compra.";
        case "cancelled":
            return "El pedido ha sido cancelado. Si tienes alguna duda, por favor contáctanos.";
        default:
            return "El estado del pedido es desconocido. Por favor contáctanos.";
    }
}
function graduationTypeToTextFn(value) {
    switch (value) {
        case "neutros":
            return "Graduación neutra (sin aumento)";
        case "monofocales":
            return "Graduación monofocal";
        case "bifocales":
            return "Graduación bifocal";
        case "progresivos":
            return "Graduación progresiva";
        default:
            return "Desconocido";
    }
}
function formatDateFn(date, style) {
    if (!date) return "-";
    if (!(date instanceof Date) && typeof date !== "string")
        throw new Error("Invalid date.");
    if (!["text", "numeric"].includes(style)) throw new Error("Invalid style.");
    let params =
        style === "text"
            ? { day: "2-digit", month: "long", year: "numeric" }
            : { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("es-MX", params);
}

const paymentTypeToTextFn = (value) => {
    switch (value) {
        case "card":
            return "Tarjeta de crédito o débito";
        case "cash":
            return "Efectivo";
        default:
            return "Desconocido";
    }
};

export default {
    filters: {
        currency(value) {
            return currencyFn(value);
        },
        capitalize(value) {
            return capitalizeFn(value);
        },
        address(value) {
            return addressFn(value);
        },
        paymentStatusToText(value) {
            return paymentStatusToTextFn(value);
        },
        deliveryStatusToText(value) {
            return deliveryStatusToTextFn(value);
        },
        deliveryStatusToMessage(value) {
            return deliveryStatusToMessageFn(value);
        },
        graduationTypeToText(value) {
            return graduationTypeToTextFn(value);
        },
        formatDate(value, style = "text") {
            return formatDateFn(value, style);
        },
        paymentTypeToText(value) {
            return paymentTypeToTextFn(value);
        },
    },
    methods: {
        currencyFn,
        capitalizeFn,
        addressFn,
        paymentStatusToTextFn,
        deliveryStatusToTextFn,
        deliveryStatusToMessageFn,
        graduationTypeToTextFn,
        formatDateFn,
        paymentTypeToTextFn,
    },
};
