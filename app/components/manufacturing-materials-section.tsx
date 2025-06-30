"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

// Mock data for materials and pricing
const materialCategories = [
  {
    id: "3d-printing",
    name: "3D Printing",
    materials: [
      { name: "PLA", price: "₹800/100g", properties: "Biodegradable, Easy to print, Good for prototypes" },
      { name: "ABS", price: "₹950/100g", properties: "Durable, Heat resistant, Good for functional parts" },
      { name: "PETG", price: "₹1100/100g", properties: "Strong, Chemical resistant, Food safe" },
      { name: "TPU", price: "₹1300/100g", properties: "Flexible, Abrasion resistant, Shock absorbing" },
      { name: "Nylon", price: "₹1500/100g", properties: "Strong, Durable, Good for mechanical parts" },
    ],
  },
  {
    id: "pcb",
    name: "PCB Fabrication",
    materials: [
      { name: "FR-4 (2 layer)", price: "₹1500/100cm²", properties: "Standard PCB material, Good for most projects" },
      { name: "FR-4 (4 layer)", price: "₹2500/100cm²", properties: "For complex circuits, Better signal integrity" },
      { name: "Aluminum PCB", price: "₹3000/100cm²", properties: "Excellent heat dissipation, For power electronics" },
      { name: "Flexible PCB", price: "₹4000/100cm²", properties: "Bendable, For space-constrained applications" },
    ],
  },
  {
    id: "laser-cutting",
    name: "Laser Cutting",
    materials: [
      { name: "Acrylic (3mm)", price: "₹600/100cm²", properties: "Clear or colored, Good for displays and enclosures" },
      { name: "MDF (3mm)", price: "₹400/100cm²", properties: "Economical, Good for prototypes and templates" },
      { name: "Plywood (3mm)", price: "₹500/100cm²", properties: "Strong, Natural look, Good for structural parts" },
      { name: "Cardboard", price: "₹200/100cm²", properties: "Very economical, Quick prototyping, Eco-friendly" },
    ],
  },
  {
    id: "cnc",
    name: "CNC Machining",
    materials: [
      { name: "Aluminum", price: "₹2500/100cm³", properties: "Lightweight, Good strength-to-weight ratio" },
      { name: "Brass", price: "₹3500/100cm³", properties: "Good electrical conductivity, Corrosion resistant" },
      { name: "Mild Steel", price: "₹2000/100cm³", properties: "Strong, Economical, Easy to machine" },
      { name: "Stainless Steel", price: "₹4000/100cm³", properties: "Corrosion resistant, Durable, Food safe" },
    ],
  },
]

const ManufacturingMaterialsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Materials and <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from a wide range of materials to suit your project’s specific requirements and budget.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="3d-printing" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {materialCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {materialCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name} Materials</CardTitle>
                    <CardDescription>
                      Select the right material for your {category.name.toLowerCase()} project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Material</TableHead>
                          <TableHead>Price (Approx.)</TableHead>
                          <TableHead className="hidden md:table-cell">Properties</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {category.materials.map((material, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{material.name}</TableCell>
                            <TableCell>{material.price}</TableCell>
                            <TableCell className="hidden md:table-cell">{material.properties}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                      <InfoIcon className="h-4 w-4" />
                      <p>
                        Prices are approximate and may vary based on design complexity, quantity, and other factors.
                        You’ll receive an exact quote after uploading your design.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Button size="lg">Get a Custom Quote</Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ManufacturingMaterialsSection
