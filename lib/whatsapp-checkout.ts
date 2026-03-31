interface OrderItem {
  name: string;
  quantity: number;
  selectedVariant: {
    size: string;
    color: string;
  };
  price: number;
}

interface CheckoutData {
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
  };
}

export const generateWhatsAppMessage = (data: CheckoutData): string => {
  const itemsList = data.items
    .map(
      (item) =>
        `- ${item.name} x${item.quantity} (Talle: ${item.selectedVariant.size}, Color: ${item.selectedVariant.color})`,
    )
    .join("\n");

  const message = `Hola, quiero comprar:\n${itemsList}\n\nTotal: $${data.total.toFixed(2)}`;
  return message;
};

export const redirectToWhatsApp = (
  phoneNumber: string,
  message: string,
): void => {
  // Remove all non-digit characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

export const sendOrderAndRedirectWhatsApp = async (orderData: {
  items: (OrderItem & { productId: string })[];
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  notes?: string;
}): Promise<void> => {
  try {
    // Calculate total
    const total = orderData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Send order to API
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: orderData.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant,
        })),
        customer: {
          name: orderData.customerName,
          phone: orderData.phone,
          address: orderData.address,
          postalCode: orderData.postalCode,
          notes: orderData.notes || "",
        },
        total,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create order");
    }

    // Generate and send WhatsApp message
    const checkoutData = {
      items: orderData.items,
      total,
      customer: {
        name: orderData.customerName,
        phone: orderData.phone,
      },
    };

    const message = generateWhatsAppMessage(checkoutData);
    redirectToWhatsApp(orderData.phone, message);
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};
