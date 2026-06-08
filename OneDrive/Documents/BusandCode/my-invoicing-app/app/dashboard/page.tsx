import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col justify-center text-center gap-6 items-center max-w-5xl w-full h-full mx-auto my-12">
        <div className="w-full flex items-center justify-between">
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p>
                <Button className="inline-flex gap-2" variant="ghost">
                <CirclePlus className="w-4 h-4" />
                    Create Invoice
                </Button>
            </p>
        </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-25 p-4">Date</TableHead>
                <TableHead className="p-4">Customer</TableHead>
                <TableHead className="p-4">Email</TableHead>
                <TableHead className="text-center p-4">Status</TableHead>
                <TableHead className="text-right p-4">Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium text-left p-4">
                    <span className="font-semibold">
                    6/7/2026
                    </span>
                </TableCell>
                <TableCell className="text-left p-4">
                    <span className="font-semibold">
                    Andrew Adetokunbo
                    </span>
                </TableCell>
                <TableCell className="text-left p-4">
                    <span>
                    busandcode@gmail.com
                    </span>
                </TableCell>
                <TableCell className="text-center p-4">
                    <Badge className="rounded-full">Open</Badge>
                </TableCell>
                <TableCell className="text-right p-4">
                    <span className="font-semibold">
                    $250.00
                    </span>
                </TableCell>
                </TableRow>
            </TableBody>
            </Table>
    </main>
  );
}
