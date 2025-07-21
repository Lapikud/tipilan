// Fonts
import { vipnagorgialla } from "@/components/Vipnagorgialla";

// Database
import { db } from "@/db/drizzle";

import Link from "next/link";

// User interface
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Later on we can use a i8 solution?
function translateRole(role: string): string {
  switch (role) {
    case "CAPTAIN":
      return "Kapten";
    case "TEAMMATE":
      return "Meeskonnaliige";
    default:
      return role;
  }
}

export default async function AdminTeams() {
  // Fetch teams with their members and member users
  const teams = await db.query.teams.findMany({
    with: {
      members: {
        with: {
          user: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col min-h-[90vh] p-12 pt-18">
      <div className="flex items-center gap-4">
        <Link href={"/haldus"}>
          <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] translate-y-2.5 hover:-translate-x-2 dark:hover:text-[#EEE5E5] hover:text-[#2A2C3F] transition">
            arrow_left_alt
          </span>
        </Link>
        <h1
          className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
        >
          Haldus - Meeskonnad
        </h1>
      </div>
      <div className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5]">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nimi</TableHead>
                <TableHead>Liikmed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team: any) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.id}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {team.members && team.members.length > 0 ? (
                        team.members.map((member: any) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="font-semibold">
                              {member.user.firstName} {member.user.lastName}
                            </span>
                            <span className="text-gray-500">
                              ({translateRole(member.role)})
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-500">Liikmeid puuduvad</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
