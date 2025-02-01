import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
});

const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
});

const materialSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  stock: z.string().optional(),
  unit: z.string().min(1, { message: "Unit is required." }),
  threshold: z.string().optional(),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." }),
});

const vendorSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  contact: z
    .string()
    .regex(/^\+?\d{10,15}$/, { message: "Invalid contact number." }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  materials: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, { message: "Material name must be at least 2 characters." }),
        costPerUnit: z
          .number({ invalid_type_error: "Cost per unit must be a number." })
          .positive(),
      })
    )
    .min(1, { message: "Add at least one material." }),
});

const orderSchema = z.object({
  vendorName: z.string().min(1, { message: "Vendor is required." }),
  materialName: z.string().min(1, { message: "Material is required." }),
  quantity: z
    .number()
    .positive({ message: "Quantity must be a positive number." })
    .min(1, { message: "Quantity must be at least 1." }),
});

const saleSchema = z.object({
  productName: z.string().nonempty("Product Name is required"),
  customerName: z
    .string()
    .min(2, "Customer Name must be at least 2 characters"),
  noOfUnitsSold: z
    .number()
    .positive("Number of units sold must be greater than 0")
    .int("Number of units sold must be an integer"),
});

const productSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  quantity: z.number().min(1, "Quantity is required."),
  pricePerUnit: z.number().min(1, "Price per unit is required."),
  rawMaterials: z
  .array(
    z.object({
      value: z.string().min(1, "Raw material value is required."),
      label: z.string().min(1, "Raw material label is required."),
    })
  )
  .min(1, "At least one raw material must be selected."),

});

const productionSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters"),
  noOfUnitsProduced: z
    .number()
    .min(1, "Number of units produced must be at least 1")
    .max(10000, "Number of units produced cannot exceed 10000"),
  quantityOfRawMaterials: z
    .array(
      z.object({
        value: z.string().min(1, "Raw material name is required"),
        label: z.string().min(1, "Raw material name is required"),
        quantity: z
          .number()
          .min(1, "Quantity of raw material must be at least 1")
          .max(10000, "Quantity of raw material cannot exceed 10000"),
      })
    )
    .min(1, "At least one raw material is required")
    .refine((rawMaterials) => rawMaterials.every((material) => material.quantity > 0), {
      message: "All raw materials must have a positive quantity",
    }),
});


 const createProductionSchema = z.object({
  productName: z
    .string()
    .min(1, "Product Name is required")
    .max(100, "Product Name should not exceed 100 characters"),
  noOfUnitsProduced: z
    .number()
    .min(1, "Number of Units Produced must be greater than 0")
    .max(10000, "Number of Units Produced should not exceed 10,000"),
  quantityOfRawMaterials: z.array(
    z.object({
      rawMaterialName: z
        .string()
        .min(1, "Raw Material Name is required")
        .max(100, "Raw Material Name should not exceed 100 characters"),
      quantity: z
        .number()
        .min(1, "Quantity must be greater than 0")
        .max(10000, "Quantity should not exceed 10,000"),
    })
  ).min(1, "At least one raw material is required"),
});


export {
  vendorSchema,
  materialSchema,
  registerSchema,
  signInSchema,
  orderSchema,
  saleSchema,
  productSchema,
  productionSchema,
  createProductionSchema
};
