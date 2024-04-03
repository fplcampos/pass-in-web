import dayjs from "dayjs"
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { attendees } from "../data/attendees"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableCell } from "./table/table-cell"
import { TableHeader } from "./table/table-header"
import { TableRow } from "./table/table-row"

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
    const [search, SearchValue] = useState('')
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(attendees.length / 10)

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        SearchValue(event.target.value)
    }

    function goToNextPage() {
        setPage(page + 1)
    }

    function goToPreviousPage() {
        setPage(page - 1)
    }

    function goToFirstPage() {
        setPage(1)
    }

    function goToLastPage() {
        setPage(totalPages)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInputChanged} placeholder="Buscar participante..." className="flex-1 p-0 text-sm bg-transparent border-0 outline-none focus-within:ring-0" />
                </div>
                {search}
            </div>

            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{ width: 48 }}>
                            <input type="checkbox" className="rounded size-4 bg-black/20 border-white/10" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
                        return (
                            <TableRow key={attendee.id} className="border-b border-white/10 hover:bg-white/5">
                                <TableCell>
                                    <input type="checkbox" className="rounded size-4 bg-black/20 border-white/10" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando 10 de {attendees.length} itens.
                        </TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPages}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}