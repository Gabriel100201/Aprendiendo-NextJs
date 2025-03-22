/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { menu_categoria as Categoria } from "@prisma/client"
import { getCategorias } from "@/actions/categorias/getCategorias"
import { addCategoria } from "@/actions/categorias/addCategoria"
import { updateCategoria } from "@/actions/categorias/updateCategoria"
import { deleteCategoria } from "@/actions/categorias/deleteCategoria"

type CategoriaBasicInfo = Omit<Categoria, "id_categoria"> & Partial<Pick<Categoria, "id_categoria">>

export function CategoriasManager() {
  const [categorias, setCategorias] = useState<CategoriaBasicInfo[]>([])
  const [editingCategory, setEditingCategory] = useState<CategoriaBasicInfo | null>(null)
  const [newCategory, setNewCategory] = useState<Partial<Categoria>>({ tag: "", descripcion: "" })
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategorias = async () => {
    try {
      const categorias = await getCategorias()
      setCategorias(categorias)
    } catch (error) {
      toast.error("No se pudieron cargar las categorías", {
        description: "Ocurrió un error al intentar obtener las categorías",
      })
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  const handleAddCategory = async () => {
    if (newCategory.tag && newCategory.descripcion) {
      setIsLoading(true)
      try {
        const result = await addCategoria({
          tag: newCategory.tag,
          descripcion: newCategory.descripcion,
        })

        if (Array.isArray(result)) {
          toast.error("Error al crear categoría", {
            description: "No se pudo crear la categoría",
          })
        } else {
          toast.success("Categoría creada", {
            description: "La categoría se ha creado correctamente",
          })
          setNewCategory({ tag: "", descripcion: "" })
          fetchCategorias()
        }
      } catch (error) {
        toast.error("Error al crear categoría", {
          description: "Ocurrió un error al crear la categoría",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleEditCategory = (category: CategoriaBasicInfo) => {
    setEditingCategory(category)
    setNewCategory({ tag: category.tag, descripcion: category.descripcion })
  }

  const handleUpdateCategory = async () => {
    if (editingCategory?.id_categoria && newCategory.tag && newCategory.descripcion) {
      setIsLoading(true)
      try {
        const result = await updateCategoria(editingCategory.id_categoria, {
          tag: newCategory.tag,
          descripcion: newCategory.descripcion,
        })

        if (Array.isArray(result)) {
          toast.error("Error al actualizar categoría", {
            description: "No se pudo actualizar la categoría",
          })
        } else {
          toast.success("Categoría actualizada", {
            description: "La categoría se ha actualizado correctamente",
          })
          setEditingCategory(null)
          setNewCategory({ tag: "", descripcion: "" })
          fetchCategorias()
        }
      } catch (error) {
        toast.error("Error al actualizar categoría", {
          description: "Ocurrió un error al actualizar la categoría",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDeleteCategory = async (id: number) => {
    setIsLoading(true)
    try {
      const result = await deleteCategoria(id)

      if (Array.isArray(result)) {
        toast.error("Error al eliminar categoría", {
          description: "No se pudo eliminar la categoría",
        })
      } else {
        toast.success("Categoría eliminada", {
          description: "La categoría se ha eliminado correctamente",
        })
        fetchCategorias()
      }
    } catch (error) {
      toast.error("Error al eliminar categoría", {
        description: "Ocurrió un error al eliminar la categoría",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingCategory(null)
    setNewCategory({ tag: "", descripcion: "" })
  }

  return (
    <Card className="shadow-sm w-full">
      <CardHeader className="bg-white border-b">
        <CardTitle className="font-semibold text-xl">Gestión de Categorías</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Listado de categorías</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="flex items-center gap-1">
                <Plus className="w-4 h-4" />
                <span>Agregar categoría</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Agregar nueva categoría</DialogTitle>
              </DialogHeader>
              <div className="gap-4 grid py-4">
                <div className="gap-2 grid">
                  <label htmlFor="tag" className="font-medium text-sm">
                    TAG
                  </label>
                  <Input
                    id="tag"
                    value={newCategory.tag!}
                    onChange={(e) => setNewCategory({ ...newCategory, tag: e.target.value })}
                    placeholder="Ingrese el tag de la categoría"
                    disabled={isLoading}
                  />
                </div>
                <div className="gap-2 grid">
                  <label htmlFor="description" className="font-medium text-sm">
                    DESCRIPCIÓN
                  </label>
                  <Input
                    id="description"
                    value={newCategory.descripcion!}
                    onChange={(e) => setNewCategory({ ...newCategory, descripcion: e.target.value })}
                    placeholder="Ingrese la descripción de la categoría"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="sm" disabled={isLoading}>
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  size="sm"
                  onClick={handleAddCategory}
                  disabled={!newCategory.tag || !newCategory.descripcion || isLoading}
                >
                  {isLoading ? "Guardando..." : "Guardar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">TAG</TableHead>
              <TableHead>DESCRIPCIÓN</TableHead>
              <TableHead className="w-[120px] text-right">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorias.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-6 text-muted-foreground text-center">
                  No hay categorías disponibles
                </TableCell>
              </TableRow>
            ) : (
              categorias.map((category) => (
                <TableRow key={category.id_categoria}>
                  <TableCell className="font-medium">{category.tag}</TableCell>
                  <TableCell>{category.descripcion}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCategory(category)}
                            disabled={isLoading}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Editar categoría</DialogTitle>
                          </DialogHeader>
                          <div className="gap-4 grid py-4">
                            <div className="gap-2 grid">
                              <label htmlFor="edit-tag" className="font-medium text-sm">
                                TAG
                              </label>
                              <Input
                                id="edit-tag"
                                value={newCategory.tag!}
                                onChange={(e) => setNewCategory({ ...newCategory, tag: e.target.value })}
                                disabled={isLoading}
                              />
                            </div>
                            <div className="gap-2 grid">
                              <label htmlFor="edit-description" className="font-medium text-sm">
                                DESCRIPCIÓN
                              </label>
                              <Input
                                id="edit-description"
                                value={newCategory.descripcion!}
                                onChange={(e) => setNewCategory({ ...newCategory, descripcion: e.target.value })}
                                disabled={isLoading}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" size="sm" onClick={handleCancelEdit} disabled={isLoading}>
                                Cancelar
                              </Button>
                            </DialogClose>
                            <Button
                              type="submit"
                              size="sm"
                              onClick={handleUpdateCategory}
                              disabled={!newCategory.tag || !newCategory.descripcion || isLoading}
                            >
                              {isLoading ? "Actualizando..." : "Actualizar"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={isLoading}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción eliminará la categoría &apos;{category.tag}&apos; y no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCategory(category.id_categoria!)}
                              className="bg-red-500 hover:bg-red-600"
                              disabled={isLoading}
                            >
                              {isLoading ? "Eliminando..." : "Eliminar"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

