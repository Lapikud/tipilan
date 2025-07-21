"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  KeyIcon,
  Mails,
  Ticket,
  IdCardLanyard,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the user type based on the database schema
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  steamId: string | null;
  ticketId: string | null;
  ticketType: string | null;
  members: {
    team: {
      name: string;
    } | null;
  }[];
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 h-auto p-0"
      >
        <KeyIcon className="h-4 w-4" />
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0"
      >
        Eesnimi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0"
      >
        Perenimi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 h-auto p-0"
      >
        <Mails className="h-4 w-4" />
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "steamId",
    header: "Steam ID",
    cell: ({ row }) => {
      const steamId = row.getValue("steamId") as string | null;
      return <div>{steamId || "-"}</div>;
    },
  },
  {
    accessorKey: "ticketId",
    header: () => (
      <div className="flex items-center gap-2">
        <Ticket className="h-4 w-4" />
        Pileti ID
      </div>
    ),
    cell: ({ row }) => {
      const ticketId = row.getValue("ticketId") as string | null;
      return <div>{ticketId || "-"}</div>;
    },
  },
  {
    accessorKey: "ticketType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0"
      >
        Pileti tüüp
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const ticketType = row.getValue("ticketType") as string | null;
      return <div>{ticketType || "-"}</div>;
    },
  },
  {
    id: "team",
    accessorFn: (user) =>
      user.members && user.members.length > 0 && user.members[0].team
        ? user.members[0].team.name
        : "",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 h-auto p-0"
      >
        <IdCardLanyard className="h-4 w-4" />
        Meeskond
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const teamName = row.getValue("team") as string;
      return <div>{teamName || "-"}</div>;
    },
  },
];
