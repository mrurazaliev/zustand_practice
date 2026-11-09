import { useEffect, useState, type FormEvent } from "react";
import { useTodo, type Todo } from "../store/todo.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function Home() {
  const { todo, getData, addUser, editUser, deleteUser } = useTodo();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    getData()
  },[])

  function handleOpenAdd() {
    setName("");
    setDescription("");
    setEditId(null);
    setError("");
    setOpen(true);
  }

  function handleEdit(item: Todo) {
    setName(item.name);
    setDescription(item.description);
    setEditId(item.id);
    setError("");
    setOpen(true);
  }

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

  

    setSaving(true);
    setError("");

    try {
      const newTodo = {
        name: name.trim(),
        description: description.trim(),
      };

      if (editId !== null) {
        await editUser(editId, newTodo);
      } else {
        await addUser(newTodo);
      }

      setName("");
      setDescription("");
      setEditId(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
      setError("Не удалось сохранить данные");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (deleteId === null) return;

    setDeleting(true);

    try {
      await deleteUser(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error(error)
    } finally {
      setDeleting(false);
    }
  }

  const filteredTodos = todo.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-8 p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Todo Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Total todos: {todo.length}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Input
            type="search"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />

          <Button onClick={handleOpenAdd}>+ Add Todo</Button>
        </div>
      </div>

      {loading && (
        <p className="text-center text-muted-foreground">
          Loading...
        </p>
      )}

      {!loading && todo.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No todos found. Add your first todo.
          </CardContent>
        </Card>
      )}

      {!loading &&
        todo.length > 0 &&
        filteredTodos.length === 0 && (
          <p className="text-center text-muted-foreground">
            No matching todos found.
          </p>
        )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTodos.map((item) => (
          <Card key={item.id} className="min-w-0">
            <CardHeader>
              <CardTitle className="break-words">
                {item.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="break-words text-muted-foreground">
                {item.description}
              </p>

              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  item.isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.isCompleted ? "Completed" : "Pending"}
              </span>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={() => setDeleteId(item.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!saving) setOpen(value);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editId !== null ? "Edit Todo" : "Add Todo"}
            </DialogTitle>

            <DialogDescription>
              Enter todo details and click Save.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="todo-name">Name</Label>

              <Input
                id="todo-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter todo name"
                disabled={saving}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="todo-description">
                Description
              </Label>

              <Input
                id="todo-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                disabled={saving}
                required
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(value) => {
          if (!value && !deleting) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Todo?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete this todo?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault();
                void handleDelete();
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

export default Home;