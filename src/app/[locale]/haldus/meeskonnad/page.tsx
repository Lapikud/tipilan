// Fonts
import { vipnagorgialla } from "@/components/Vipnagorgialla";

// Database
import { db } from "@/db/drizzle";

// Types
import type { TeamWithMembers, MemberWithUser } from "@/types/database";

import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

// User interface
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Function to translate roles using i18n
function translateRole(role: string, t: (key: string) => string): string {
  switch (role) {
    case "CAPTAIN":
      return t("admin.roles.captain");
    case "TEAMMATE":
      return t("admin.roles.teammate");
    default:
      return role;
  }
}

export default async function AdminTeams({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
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
    <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
      <div className="flex items-center gap-4">
        <Link href={"/haldus"}>
          <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] translate-y-2.5 hover:-translate-x-2 dark:hover:text-[#EEE5E5] hover:text-[#2A2C3F] transition">
            arrow_left_alt
          </span>
        </Link>
        <h1
          className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
        >
          {t("admin.title")} - {t("admin.teams")}
        </h1>
      </div>
      <div className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5]">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>{t("admin.table.name")}</TableHead>
                <TableHead>{t("admin.table.members")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team: TeamWithMembers) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.id}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {team.members && team.members.length > 0 ? (
                        team.members.map((member: MemberWithUser) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="font-semibold">
                              {member.user.firstName} {member.user.lastName}
                            </span>
                            <span className="text-gray-500">
                              ({translateRole(member.role, t)})
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-500">
                          {t("admin.table.noMembers")}
                        </span>
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
