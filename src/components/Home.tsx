import { useState, type FormEvent } from 'react'
import { useTodo, type Todo } from '../store/todo.store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

function Home() {
  const { todos, addUser, editUser, deleteUser } = useTodo()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [search,setSearch]=useState("")

  function handleOpenAdd() {
    setName('')
    setAge('')
    setEditId(null)
    setError('')
    setOpen(true)
  }

  function handleEdit(elem: Todo) {
    setName(elem.name)
    setAge(String(elem.age))
    setEditId(elem.id)
    setError('')
    setOpen(true)
  }

  function handleDelete() {
    if (deleteId === null) return

    deleteUser(deleteId)

    if (editId === deleteId) {
      setEditId(null)
      setOpen(false)
    }

    setDeleteId(null)
  }

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const userAge = Number(age)

    if (!name.trim() || !Number.isInteger(userAge) || userAge <= 0) {
      setError('Введи имя и целый возраст больше нуля.')
      return
    }

    if (editId !== null) {
      editUser({
        id: editId,
        name: name.trim(),
        age: userAge,
      })
    } else {
      addUser({
        id: Date.now(),
        name: name.trim(),
        age: userAge,
      })
    }

    setName('')
    setAge('')
    setEditId(null)
    setError('')
    setOpen(false)
  }

  const filteresTodos=todos.filter((e)=>e.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()))

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Total users: {todos.length}
          </p>
        </div>


        <div>
              
              <Input
              type="search"
              placeholder="Поиск по имени..."
              aria-label="Поиск по имени"
              value={search}
              onChange={(e) => setSearch(e.target.value)}

              />
        </div>


        <Button type="button" onClick={handleOpenAdd}>
          + Add user
        </Button>
      </div>

      {todos.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Список пуст. Добавь первого пользователя.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteresTodos.map((elem) => (
          <Card key={elem.id} className="min-w-0">
            <CardHeader>
              <CardTitle className="break-words">{elem.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">Age: {elem.age}</p>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleEdit(elem)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setDeleteId(elem.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editId !== null ? 'Edit user' : 'Add user'}
            </DialogTitle>
            <DialogDescription>
              Введи имя и возраст, затем нажми Save.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Name</Label>
              <Input
                id="user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-age">Age</Label>
              <Input
                id="user-age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                min="1"
                step="1"
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
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(value) => {
          if (!value) setDeleteId(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
            <AlertDialogDescription>
              Пользователь будет удалён из списка.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

export default Home

