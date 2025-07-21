// Fonts
import { vipnagorgialla } from "@/components/Vipnagorgialla";

// Database
import { db } from "@/db/drizzle";
import { syncFientaEvent } from "@/lib/fienta";

// Enviornment variables
import("dotenv");

// User interface
import {
  Users,
  IdCardLanyard,
  DatabaseBackup,
  CheckCircle2Icon,
  X,
} from "lucide-react";

import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { DataTable } from "@/components/haldus/data-table";
import { columns } from "@/components/haldus/columns";

async function syncAction() {
  "use server";
  await syncFientaEvent(process.env.EVENT_ID!, process.env.FIENTA_API_KEY!);

  // Revalidate due to data change
  revalidatePath("/haldus");
  redirect("/haldus?success=true");
}

async function dismissAlert() {
  "use server";
  redirect("/haldus", RedirectType.replace);
}

const SuccessAlertDB = () => {
  return (
    <Alert className="flex items-start mt-8">
      <CheckCircle2Icon className="mt-0.5" />
      <div className="flex-1">
        <AlertTitle>Toiming oli edukas!</AlertTitle>
        <AlertDescription>Andmebaasi andmed on uuendatud.</AlertDescription>
      </div>
      <form action={dismissAlert} className="ml-2">
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="cursor-pointer"
        >
          <X className="" />
        </Button>
      </form>
    </Alert>
  );
};

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const alarmStatus = await searchParams;
  const showSuccess = alarmStatus.success === "true";

  // Fetch users
  const usersData = await db.query.users.findMany({
    with: {
      members: {
        with: {
          team: true,
        },
      },
    },
  });
  const teamsData = await db.query.teams.findMany();

  return (
    <div className="flex flex-col min-h-[90vh] p-12 pt-18">
      {showSuccess && <SuccessAlertDB />}
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] translate-y-2.5 hover:-translate-x-2 dark:hover:text-[#EEE5E5] hover:text-[#2A2C3F] transition">
            arrow_left_alt
          </span>
        </Link>
        <h1
          className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
        >
          Haldus
        </h1>
      </div>
      <div className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5]">
        <div className="pl-2 flex gap-8 pb-4">
          <div className="flex text-lg md:text-2xl flex-row items-center">
            <Users className="mr-2" />
            Kasutajaid: {usersData.length}
          </div>
          <Link href="/haldus/meeskonnad" className="flex items-center">
            <div className="flex text-lg md:text-2xl flex-row items-center">
              <IdCardLanyard className="mr-2" />
              Meeskondasid: {teamsData.length}
            </div>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-12 cursor-pointer"
                >
                  <DatabaseBackup className="scale-150" />
                </Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>
                Kas soovite värskendada andmebaasi?
              </AlertDialogTitle>
              <AlertDialogDescription>
                See tõmbab Fientast praegused andmed ning asendab{" "}
                <span className="text-red-600 font-semibold">KÕIK</span>{" "}
                olemasolevad andmed andmebaasis!
                <br />
                <br />
                Kui sa ei ole kindel, vajuta &quot;Tühista&quot;.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Tühista
                </AlertDialogCancel>
                <form action={syncAction}>
                  <AlertDialogAction type="submit" className="cursor-pointer">
                    Värskenda
                  </AlertDialogAction>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div>
          <DataTable columns={columns} data={usersData} />
        </div>
      </div>
    </div>
  );
}
